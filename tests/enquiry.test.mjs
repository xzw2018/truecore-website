import test, { beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { handleEnquiry, validateEnquiry } from '../worker.mjs';

const ORIGIN = 'https://truecore-website.3537213006.workers.dev';
const RECIPIENT_URL = 'https://formsubmit.co/ajax/3537213006@qq.com';
const PRODUCT = 'dell-poweredge-r350';
let network;

// Every endpoint test forbids real network traffic and proves preparation stays local.
beforeEach(() => {
  network = mock.method(globalThis, 'fetch', async () => {
    throw new Error('The enquiry preparation endpoint must not perform outbound requests.');
  });
});
afterEach(() => {
  try { assert.equal(network.mock.callCount(), 0, 'server must make zero outbound requests'); }
  finally { mock.restoreAll(); }
});

function enquiry(overrides = {}) {
  return {
    type: 'general', product: '', name: 'Ada Buyer',
    contact: 'ada@example.com', organization: '', usage: '',
    quantity: '', timeline: '', message: 'Please quote two rack servers.',
    website: '', consent: true, ...overrides,
  };
}

function request(input = enquiry(), options = {}) {
  const { url = ORIGIN + '/api/enquiry', headers = {}, method = 'POST', rawBody, ...rest } = options;
  return new Request(url, {
    method,
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.12', ...headers },
    ...(method === 'GET' || method === 'HEAD' ? {} : { body: rawBody ?? JSON.stringify(input) }),
    ...rest,
  });
}

function harness() {
  const rateCalls = [];
  const env = {
    PUBLIC_SITE_ORIGIN: ORIGIN,
    ENQUIRY_RATE_LIMIT: { async limit(input) { rateCalls.push(input); return { success: true }; } },
  };
  return { rateCalls, env };
}

async function run(input = enquiry(), options) {
  const h = harness();
  const response = await handleEnquiry(request(input, options), h.env);
  const body = await response.json();
  if (!response.ok) assert.equal(body.delivery, undefined, 'rejected requests cannot carry a delivery payload');
  return { ...h, response, body };
}

test('validated request is ready for browser delivery, without claiming it was sent', async () => {
  const { response, body, rateCalls } = await run();
  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(body).sort(), ['delivery', 'ok', 'reference', 'status']);
  assert.equal(body.ok, true);
  assert.equal(body.status, 'ready');
  assert.match(body.reference, /^CL-[0-9A-F]{8}$/);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.deepEqual(Object.keys(body.delivery).sort(), ['payload', 'url']);
  assert.equal(body.delivery.url, RECIPIENT_URL);
  assert.equal(body.delivery.payload.Reference, body.reference);
  assert.equal(body.delivery.payload.name, 'Ada Buyer');
  assert.equal(body.delivery.payload.message, 'Please quote two rack servers.');
  assert.equal(body.delivery.payload['Enquiry type'], 'General enquiry');
  assert.ok(Number.isFinite(Date.parse(body.delivery.payload['Submitted (UTC)'])));
  assert.deepEqual(rateCalls, [{ key: 'truecore-website:enquiry:192.0.2.12' }]);
});

test('client recipient, headers, CC, callback and source injection cannot alter prepared payload', async () => {
  const { body, response } = await run(enquiry({
    type: 'product', product: PRODUCT,
    recipient: 'attacker@example.org', to: 'attacker@example.org',
    email: 'attacker@example.org', _replyto: 'attacker@example.org',
    _cc: 'attacker@example.org', _bcc: 'attacker@example.org',
    _url: 'https://attacker.example/', _webhook: 'https://attacker.example/collect',
    _subject: 'Forged subject', _next: 'https://attacker.example/',
    _template: 'box', headers: { From: 'attacker@example.org' },
    delivery: { url: 'https://attacker.example/collect' },
  }));
  assert.equal(response.status, 200);
  const { url, payload } = body.delivery;
  assert.equal(url, RECIPIENT_URL);
  assert.equal(payload.email, 'ada@example.com');
  assert.equal(payload._url, ORIGIN + '/contact');
  assert.equal(payload._template, 'table');
  assert.match(payload._subject, /^chenglian Product advice \| CL-[0-9A-F]{8}$/);
  assert.equal(payload.Product, 'Dell PowerEdge R350 (dell-poweredge-r350)');
  for (const key of ['recipient', 'to', '_cc', '_bcc', '_replyto', '_webhook', '_next', 'headers', 'delivery']) {
    assert.equal(Object.hasOwn(payload, key), false, key + ' must not be forwarded');
  }
  assert.deepEqual(Object.keys(payload).sort(), [
    'Email or phone', 'Enquiry type', 'Product', 'Reference', 'Submitted (UTC)',
    '_subject', '_template', '_url', 'email', 'message', 'name',
  ].sort());
});

test('phone enquiries do not turn phone numbers into Reply-To addresses', async () => {
  const { response, body } = await run(enquiry({ contact: '+44 (20) 7946-0123' }));
  assert.equal(response.status, 200);
  assert.equal(body.delivery.payload['Email or phone'], '+44 (20) 7946-0123');
  assert.equal(Object.hasOwn(body.delivery.payload, 'email'), false);
});

test('business enquiry prepares validated procurement details', async () => {
  const { response, body } = await run(enquiry({
    type: 'business', organization: '  Example Ltd  ', usage: '  Data center refresh  ',
    quantity: '12', timeline: 'Q1 2027', product: PRODUCT,
  }));
  assert.equal(response.status, 200);
  const payload = body.delivery.payload;
  assert.equal(payload.Organization, 'Example Ltd');
  assert.equal(payload.Deployment, 'Data center refresh');
  assert.equal(payload.Quantity, '12');
  assert.equal(payload['Target delivery'], 'Q1 2027');
});

test('honeypot prevents preparation of a delivery payload', async () => {
  const { response, body } = await run(enquiry({ website: 'https://bot.example/' }));
  assert.equal(response.status, 400);
  assert.equal(body.code, 'invalid_submission');
});

test('rate limiter rejects before reading malformed body or preparing delivery', async () => {
  const h = harness();
  h.env.ENQUIRY_RATE_LIMIT.limit = async () => ({ success: false });
  const response = await handleEnquiry(request(null, { rawBody: '{invalid' }), h.env);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
  assert.equal((await response.json()).code, 'rate_limited');
});

for (const mode of ['missing', 'throws']) {
  test(`rate limiter ${mode} fails closed without a delivery payload`, async () => {
    const h = harness();
    if (mode === 'missing') delete h.env.ENQUIRY_RATE_LIMIT;
    else h.env.ENQUIRY_RATE_LIMIT.limit = async () => { throw new Error('binding unavailable'); };
    const response = await handleEnquiry(request(), h.env);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'service_unavailable');
  });
}

for (const method of ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS']) {
  test(`${method} cannot prepare an enquiry`, async () => {
    const { response, body, rateCalls } = await run(enquiry(), { method });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('Allow'), 'POST');
    assert.equal(body.code, 'method_not_allowed');
    assert.equal(rateCalls.length, 0);
  });
}

for (const origin of ['https://attacker.example', 'null', '', `${ORIGIN}.attacker.example`]) {
  test(`Origin ${JSON.stringify(origin)} cannot send email`, async () => {
    const { response, body, rateCalls } = await run(enquiry(), { headers: { Origin: origin } });
    assert.equal(response.status, 403);
    assert.equal(body.code, 'origin_not_allowed');
    assert.equal(rateCalls.length, 0);
  });
}

test('omitted Origin and incorrect request host are rejected', async () => {
  for (const altered of ['missing-origin', 'wrong-host', 'missing-config']) {
    const h = harness();
    const req = request(enquiry(), altered === 'wrong-host' ? { url: 'https://preview.example/api/enquiry' } : {});
    if (altered === 'missing-origin') req.headers.delete('Origin');
    if (altered === 'missing-config') delete h.env.PUBLIC_SITE_ORIGIN;
    const response = await handleEnquiry(req, h.env);
    assert.equal(response.status, 403, altered);
    assert.equal(h.rateCalls.length, 0);
  }
});

for (const contentType of ['', 'text/plain', 'application/x-www-form-urlencoded', 'application/jsonp']) {
  test(`Content-Type ${JSON.stringify(contentType)} cannot send email`, async () => {
    const { response, body, rateCalls } = await run(enquiry(), { headers: { 'Content-Type': contentType } });
    assert.equal(response.status, 415);
    assert.equal(body.code, 'unsupported_content_type');
    assert.equal(rateCalls.length, 0);
  });
}

test('application/json with a charset can prepare an enquiry', async () => {
  const { response } = await run(enquiry(), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  assert.equal(response.status, 200);
});

test('malformed, empty and invalid UTF-8 input cannot prepare delivery', async () => {
  for (const rawBody of ['{bad json', ' ', new Uint8Array([0xc3, 0x28])]) {
    const { response, body } = await run(null, { rawBody });
    assert.equal(response.status, 400);
    assert.equal(body.code, 'invalid_json');
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
    const response = await handleEnquiry(req, h.env);
    assert.equal(response.status, 413);
    assert.equal((await response.json()).code, 'payload_too_large');
  });
}

test('oversized declared Content-Length is rejected', async () => {
  const { response, body } = await run(enquiry(), { headers: { 'Content-Length': '16001' } });
  assert.equal(response.status, 413);
  assert.equal(body.code, 'payload_too_large');
});

test('invalid enquiry schema produces validation errors without preparing delivery', async () => {
  for (const input of [null, [], 'text', 42, {}]) {
    const { response, body } = await run(input);
    assert.equal(response.status, 422);
    assert.equal(body.code, 'validation_error');
    assert.ok(Object.keys(body.errors).length > 0);
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
  for (const consent of [false, 'true', 1, null]) {
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
