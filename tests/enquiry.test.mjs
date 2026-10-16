import test from 'node:test';
import assert from 'node:assert/strict';
import { handleEnquiry, validateEnquiry } from '../worker.mjs';

const ORIGIN = 'https://truecore-website.3537213006.workers.dev';
const RECIPIENT_URL = 'https://formsubmit.co/ajax/3537213006@qq.com';
const PRODUCT = 'dell-poweredge-r350';
const activationMessage = "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!";

function enquiry(overrides = {}) {
  return {
    type: 'general', product: '', name: 'Ada Buyer',
    contact: 'ada@example.com', organization: '', usage: '',
    quantity: '', timeline: '', message: 'Please quote two rack servers.',
    website: '', consent: true, ...overrides,
  };
}

function request(input = enquiry(), options = {}) {
  const { url = `${ORIGIN}/api/enquiry`, headers = {}, method = 'POST', rawBody, ...rest } = options;
  return new Request(url, {
    method,
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.12', ...headers },
    ...(method === 'GET' || method === 'HEAD' ? {} : { body: rawBody ?? JSON.stringify(input) }),
    ...rest,
  });
}

function harness(provider = () => Response.json({ success: true })) {
  const sends = [];
  const rateCalls = [];
  const env = {
    PUBLIC_SITE_ORIGIN: ORIGIN,
    ENQUIRY_RATE_LIMIT: { async limit(input) { rateCalls.push(input); return { success: true }; } },
  };
  const fetchEmail = async (url, options) => {
    sends.push({ url, options, payload: JSON.parse(options.body) });
    return provider(url, options);
  };
  return { sends, rateCalls, env, fetchEmail };
}

async function run(input = enquiry(), provider, options) {
  const h = harness(provider);
  const response = await handleEnquiry(request(input, options), h.env, h.fetchEmail);
  return { ...h, response, body: await response.json() };
}

for (const success of [true, 'true']) {
  test(`provider success ${JSON.stringify(success)} means accepted, not delivered`, async () => {
    const { response, body, sends, rateCalls } = await run(enquiry(), () => Response.json({ success }));
    assert.equal(response.status, 202);
    assert.deepEqual(Object.keys(body).sort(), ['ok', 'reference', 'status']);
    assert.equal(body.ok, true);
    assert.equal(body.status, 'accepted');
    assert.match(body.reference, /^CL-[0-9A-F]{8}$/);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(sends.length, 1);
    assert.equal(sends[0].payload.Reference, body.reference);
    assert.equal(sends[0].url, RECIPIENT_URL);
    assert.equal(sends[0].options.method, 'POST');
    assert.equal(sends[0].options.redirect, 'manual');
    assert.ok(sends[0].options.signal instanceof AbortSignal);
    assert.deepEqual(rateCalls, [{ key: 'truecore-website:enquiry:192.0.2.12' }]);
  });
}

for (const success of [false, 'false']) {
  test(`HTTP 200 with success=${JSON.stringify(success)} never reports acceptance`, async () => {
    const { response, body } = await run(enquiry(), () => Response.json({ success, message: 'Request processed.' }));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.code, 'delivery_failed');
    assert.equal(body.reference, undefined);
  });
}

for (const receipt of [{ success: 0 }, { success: 1 }, { success: 'TRUE' }, {}, null, []]) {
  test(`unrecognized acknowledgement ${JSON.stringify(receipt)} is unconfirmed`, async () => {
    const { response, body, sends } = await run(enquiry(), () => Response.json(receipt));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.code, 'delivery_unconfirmed');
    assert.equal(sends.length, 1);
  });
}

test('observed activation response is pending activation, never accepted', async () => {
  const { response, body } = await run(enquiry(), () => Response.json({ success: 'false', message: activationMessage }));
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.equal(body.code, 'activation_required');
  assert.match(body.message, /awaiting activation/i);
  assert.match(body.message, /3537213006@qq\.com/);
});

test('activation message takes precedence over a truthy provider success', async () => {
  const { response, body } = await run(enquiry(), () => Response.json({ success: true, message: activationMessage }));
  assert.equal(response.status, 503);
  assert.equal(body.code, 'activation_required');
  assert.equal(body.ok, false);
});

for (const status of [301, 302, 303, 307, 308, 400, 403, 429, 500, 503]) {
  test(`provider HTTP ${status} is unconfirmed even with a success-looking body`, async () => {
    const { response, body, sends } = await run(enquiry(), () => Response.json({ success: true }, { status, headers: { Location: 'https://example.com/redirect' } }));
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.code, 'delivery_unconfirmed');
    assert.equal(sends.length, 1);
  });
}

test('HTML challenge or invalid JSON from provider is unconfirmed', async () => {
  const { response, body } = await run(enquiry(), () => new Response('<html>Challenge</html>', { headers: { 'Content-Type': 'text/html' } }));
  assert.equal(response.status, 502);
  assert.equal(body.code, 'delivery_unconfirmed');
  assert.equal(body.ok, false);
});

for (const error of [new TypeError('Network failed'), new DOMException('Timed out', 'TimeoutError')]) {
  test(`${error.name} does not claim delivery or automatically retry`, async () => {
    const { response, body, sends } = await run(enquiry(), () => { throw error; });
    assert.equal(response.status, 504);
    assert.equal(body.code, 'delivery_unconfirmed');
    assert.equal(body.ok, false);
    assert.equal(sends.length, 1);
  });
}

test('client recipient, headers, CC, callback and source injection cannot alter provider payload', async () => {
  const { sends, response } = await run(enquiry({
    type: 'product', product: PRODUCT,
    recipient: 'attacker@example.org', to: 'attacker@example.org',
    email: 'attacker@example.org', _replyto: 'attacker@example.org',
    _cc: 'attacker@example.org', _bcc: 'attacker@example.org',
    _url: 'https://attacker.example/', _webhook: 'https://attacker.example/collect',
    _subject: 'Forged subject', _next: 'https://attacker.example/',
    _template: 'box', headers: { From: 'attacker@example.org' },
  }));
  assert.equal(response.status, 202);
  const { url, payload, options } = sends[0];
  assert.equal(url, RECIPIENT_URL);
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload._url, `${ORIGIN}/contact`);
  assert.equal(payload._template, 'table');
  assert.match(payload._subject, /^chenglian Product advice \| CL-[0-9A-F]{8}$/);
  assert.equal(payload.Product, 'Dell PowerEdge R350 (dell-poweredge-r350)');
  assert.equal(options.headers.Origin, ORIGIN);
  assert.equal(options.headers.Referer, `${ORIGIN}/contact`);
  for (const key of ['recipient', 'to', '_cc', '_bcc', '_replyto', '_webhook', '_next', 'headers']) {
    assert.equal(Object.hasOwn(payload, key), false, `${key} must not be forwarded`);
  }
  assert.deepEqual(Object.keys(payload).sort(), [
    'Email or phone', 'Enquiry type', 'Product', 'Reference', 'Submitted (UTC)',
    '_subject', '_template', '_url', 'email', 'message', 'name',
  ].sort());
});

test('phone enquiries do not turn phone numbers into Reply-To addresses', async () => {
  const { response, sends } = await run(enquiry({ contact: '+44 (20) 7946-0123' }));
  assert.equal(response.status, 202);
  assert.equal(sends[0].payload['Email or phone'], '+44 (20) 7946-0123');
  assert.equal(Object.hasOwn(sends[0].payload, 'email'), false);
});

test('business enquiry includes validated procurement details', async () => {
  const { response, sends } = await run(enquiry({
    type: 'business', organization: '  Example Ltd  ', usage: '  Data center refresh  ',
    quantity: '12', timeline: 'Q1 2027', product: PRODUCT,
  }));
  assert.equal(response.status, 202);
  const payload = sends[0].payload;
  assert.equal(payload.Organization, 'Example Ltd');
  assert.equal(payload.Deployment, 'Data center refresh');
  assert.equal(payload.Quantity, '12');
  assert.equal(payload['Target delivery'], 'Q1 2027');
});

test('honeypot stops provider delivery', async () => {
  const { response, body, sends } = await run(enquiry({ website: 'https://bot.example/' }));
  assert.equal(response.status, 400);
  assert.equal(body.code, 'invalid_submission');
  assert.equal(sends.length, 0);
});

test('rate limiter rejects before reading malformed body or contacting provider', async () => {
  const h = harness();
  h.env.ENQUIRY_RATE_LIMIT.limit = async () => ({ success: false });
  const response = await handleEnquiry(request(null, { rawBody: '{invalid' }), h.env, h.fetchEmail);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
  assert.equal((await response.json()).code, 'rate_limited');
  assert.equal(h.sends.length, 0);
});

for (const mode of ['missing', 'throws']) {
  test(`rate limiter ${mode} fails closed without a provider call`, async () => {
    const h = harness();
    if (mode === 'missing') delete h.env.ENQUIRY_RATE_LIMIT;
    else h.env.ENQUIRY_RATE_LIMIT.limit = async () => { throw new Error('binding unavailable'); };
    const response = await handleEnquiry(request(), h.env, h.fetchEmail);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'service_unavailable');
    assert.equal(h.sends.length, 0);
  });
}

for (const method of ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS']) {
  test(`${method} cannot send email`, async () => {
    const { response, body, sends, rateCalls } = await run(enquiry(), undefined, { method });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('Allow'), 'POST');
    assert.equal(body.code, 'method_not_allowed');
    assert.equal(sends.length, 0);
    assert.equal(rateCalls.length, 0);
  });
}

for (const origin of ['https://attacker.example', 'null', '', `${ORIGIN}.attacker.example`]) {
  test(`Origin ${JSON.stringify(origin)} cannot send email`, async () => {
    const { response, body, sends, rateCalls } = await run(enquiry(), undefined, { headers: { Origin: origin } });
    assert.equal(response.status, 403);
    assert.equal(body.code, 'origin_not_allowed');
    assert.equal(sends.length, 0);
    assert.equal(rateCalls.length, 0);
  });
}

test('omitted Origin and incorrect request host are rejected', async () => {
  for (const altered of ['missing-origin', 'wrong-host', 'missing-config']) {
    const h = harness();
    const req = request(enquiry(), altered === 'wrong-host' ? { url: 'https://preview.example/api/enquiry' } : {});
    if (altered === 'missing-origin') req.headers.delete('Origin');
    if (altered === 'missing-config') delete h.env.PUBLIC_SITE_ORIGIN;
    const response = await handleEnquiry(req, h.env, h.fetchEmail);
    assert.equal(response.status, 403, altered);
    assert.equal(h.sends.length, 0);
    assert.equal(h.rateCalls.length, 0);
  }
});

for (const contentType of ['', 'text/plain', 'application/x-www-form-urlencoded', 'application/jsonp']) {
  test(`Content-Type ${JSON.stringify(contentType)} cannot send email`, async () => {
    const { response, body, sends, rateCalls } = await run(enquiry(), undefined, { headers: { 'Content-Type': contentType } });
    assert.equal(response.status, 415);
    assert.equal(body.code, 'unsupported_content_type');
    assert.equal(sends.length, 0);
    assert.equal(rateCalls.length, 0);
  });
}

test('application/json with a charset is accepted', async () => {
  const { response } = await run(enquiry(), undefined, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  assert.equal(response.status, 202);
});

test('malformed, empty and invalid UTF-8 input never reaches email provider', async () => {
  for (const rawBody of ['{bad json', ' ', new Uint8Array([0xc3, 0x28])]) {
    const { response, body, sends } = await run(null, undefined, { rawBody });
    assert.equal(response.status, 400);
    assert.equal(body.code, 'invalid_json');
    assert.equal(sends.length, 0);
  }
});

for (const contentLength of [undefined, '1']) {
  test(`actual streamed bytes are limited with Content-Length ${contentLength ?? 'absent'}`, async () => {
    const h = harness();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"message":"'));
        controller.enqueue(new TextEncoder().encode('x'.repeat(9000)));
        controller.enqueue(new TextEncoder().encode('x'.repeat(9000)));
        controller.enqueue(new TextEncoder().encode('"}'));
        controller.close();
      },
    });
    const req = request(null, {
      rawBody: stream, duplex: 'half',
      headers: contentLength === undefined ? {} : { 'Content-Length': contentLength },
    });
    if (contentLength === undefined) assert.equal(req.headers.has('Content-Length'), false);
    const response = await handleEnquiry(req, h.env, h.fetchEmail);
    assert.equal(response.status, 413);
    assert.equal((await response.json()).code, 'payload_too_large');
    assert.equal(h.sends.length, 0);
  });
}

test('oversized declared Content-Length is rejected', async () => {
  const { response, body, sends } = await run(enquiry(), undefined, { headers: { 'Content-Length': '16001' } });
  assert.equal(response.status, 413);
  assert.equal(body.code, 'payload_too_large');
  assert.equal(sends.length, 0);
});

test('invalid enquiry schema produces validation errors, not a provider request', async () => {
  for (const input of [null, [], 'text', 42, {}]) {
    const { response, body, sends } = await run(input);
    assert.equal(response.status, 422);
    assert.equal(body.code, 'validation_error');
    assert.ok(Object.keys(body.errors).length > 0);
    assert.equal(sends.length, 0);
  }
});

test('all text fields enforce their individual length limits', () => {
  const limits = { type: 20, product: 100, name: 80, contact: 160, organization: 160, usage: 240, quantity: 10, timeline: 100, message: 3000, website: 200 };
  for (const [key, max] of Object.entries(limits)) {
    const { errors } = validateEnquiry(enquiry({ [key]: 'x'.repeat(max + 1) }));
    assert.ok(errors[key], `${key} above ${max} characters must fail`);
  }
  assert.deepEqual(validateEnquiry(enquiry({ name: 'x'.repeat(80), message: 'x'.repeat(3000) })).errors, {});
});

test('non-string form fields and unsafe controls are rejected', () => {
  for (const key of ['type', 'product', 'name', 'contact', 'organization', 'usage', 'quantity', 'timeline', 'message', 'website']) {
    assert.ok(validateEnquiry(enquiry({ [key]: ['injected'] })).errors[key], `${key} array`);
    assert.ok(validateEnquiry(enquiry({ [key]: 'valid\u0000value' })).errors[key], `${key} NUL`);
    assert.ok(validateEnquiry(enquiry({ [key]: 'valid\u007fvalue' })).errors[key], `${key} DEL`);
  }
});

test('line breaks cannot be injected into header-like fields, but multiline messages work', () => {
  for (const key of ['name', 'contact', 'organization', 'usage', 'quantity', 'timeline', 'website']) {
    assert.ok(validateEnquiry(enquiry({ [key]: 'valid\r\nBcc: victim@example.com' })).errors[key], key);
  }
  const multiline = 'First requirement.\r\nSecond requirement.\n\tIndented detail.';
  const result = validateEnquiry(enquiry({ message: multiline }));
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.message, multiline);
});

test('explicit boolean consent, a known topic and catalog product are enforced', () => {
  for (const consent of [false, 'true', 1, undefined, null]) {
    assert.ok(validateEnquiry(enquiry({ consent })).errors.consent);
  }
  for (const type of ['unknown', '__proto__', 'constructor', '']) {
    assert.ok(validateEnquiry(enquiry({ type })).errors.type);
  }
  for (const product of ['not-a-product', '__proto__', '<script>alert(1)</script>']) {
    assert.ok(validateEnquiry(enquiry({ product })).errors.product);
  }
  for (const type of ['general', 'product', 'technical', 'support']) {
    assert.deepEqual(validateEnquiry(enquiry({ type, product: PRODUCT })).errors, {});
  }
});

test('required name, contact and useful message are validated', () => {
  for (const [key, value] of [['name', '   '], ['contact', 'not-an-address'], ['contact', '123'], ['message', 'short'], ['message', '          ']]) {
    assert.ok(validateEnquiry(enquiry({ [key]: value })).errors[key], `${key}: ${value}`);
  }
});

test('business fields are required and quantity must be a bounded whole number', () => {
  const missing = validateEnquiry(enquiry({ type: 'business' })).errors;
  assert.ok(missing.organization);
  assert.ok(missing.usage);
  assert.ok(missing.quantity);
  for (const quantity of ['', '0', '-1', '1.5', '1e3', '1000001', 'many']) {
    const result = validateEnquiry(enquiry({ type: 'business', organization: 'Example', usage: 'Office', quantity }));
    assert.ok(result.errors.quantity, quantity);
  }
  for (const quantity of ['1', '1000000']) {
    assert.deepEqual(validateEnquiry(enquiry({ type: 'business', organization: 'Example', usage: 'Office', quantity })).errors, {});
  }
});
