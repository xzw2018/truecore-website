import servers from './research/servers.json' with { type: 'json' };
import switches from './research/switches.json' with { type: 'json' };
import storage from './research/storage-accessories.json' with { type: 'json' };
import accessories from './research/network-accessories.json' with { type: 'json' };

const RECIPIENT = '3537213006@qq.com';
const DELIVERY_URL = `https://formsubmit.co/ajax/${RECIPIENT}`;
const MAX_BODY_BYTES = 16000;
const products = new Map([...servers, ...switches, ...storage, ...accessories].map(p => [p.id, p.name]));
const topics = { general: 'General enquiry', product: 'Product advice', business: 'Procurement', technical: 'Compatibility check', support: 'After-sales support' };
const limits = { type: 20, product: 100, name: 80, contact: 160, organization: 160, usage: 240, quantity: 10, timeline: 100, message: 3000, website: 200 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body, status = 200, extra = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra } });
}
function failure(code, message, status, extra = {}) {
  return json({ ok: false, code, message }, status, extra);
}

async function readLimitedBody(request) {
  if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES) throw new RangeError('body size');
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('empty body');
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError('body size');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

export function validateEnquiry(input) {
  const errors = {};
  const data = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { form: 'Invalid enquiry.' } };
  for (const [key, max] of Object.entries(limits)) {
    const value = input[key] ?? '';
    if (typeof value !== 'string') { errors[key] = 'Enter a valid value.'; continue; }
    if (value.length > max) { errors[key] = `Use no more than ${max} characters.`; continue; }
    const controls = key === 'message' ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/ : /[\x00-\x1f\x7f]/;
    if (controls.test(value)) { errors[key] = 'Remove unsupported characters.'; continue; }
    data[key] = value.trim();
  }
  if (!Object.hasOwn(topics, data.type || '')) errors.type = 'Select an enquiry type.';
  if (data.product && !products.has(data.product)) errors.product = 'Select a product from the catalog.';
  if (!data.name) errors.name = 'Enter your name.';
  const phone = /^\+?[0-9\s().-]+$/.test(data.contact || '') && /^\d{7,15}$/.test((data.contact || '').replace(/[+\s().-]/g, ''));
  if (!emailPattern.test(data.contact || '') && !phone) errors.contact = 'Enter a valid email address or phone number.';
  if (!data.message || data.message.length < 10) errors.message = 'Describe your requirements in at least 10 characters.';
  if (input.consent !== true) errors.consent = 'Please consent to sending your enquiry.';
  if (data.type === 'business') {
    if (!data.organization) errors.organization = 'Enter your company or organization name.';
    if (!data.usage) errors.usage = 'Describe your deployment.';
    if (!/^\d+$/.test(data.quantity || '') || Number(data.quantity) < 1 || Number(data.quantity) > 1000000) errors.quantity = 'Enter a whole number between 1 and 1,000,000.';
  }
  return { data, errors };
}

export async function handleEnquiry(request, env) {
  if (request.method !== 'POST') return failure('method_not_allowed', 'Use POST to submit an enquiry.', 405, { Allow: 'POST' });
  const expectedOrigin = env.PUBLIC_SITE_ORIGIN;
  if (!expectedOrigin || new URL(request.url).origin !== expectedOrigin || request.headers.get('Origin') !== expectedOrigin) {
    return failure('origin_not_allowed', 'Submit the form from the chenglian website.', 403);
  }
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('Content-Type') || '')) {
    return failure('unsupported_content_type', 'Send the enquiry as JSON.', 415);
  }
  if (!env.ENQUIRY_RATE_LIMIT?.limit) return failure('service_unavailable', 'Email submission is temporarily unavailable.', 503);
  try {
    const key = `truecore-website:enquiry:${request.headers.get('CF-Connecting-IP') || 'unknown'}`;
    const rate = await env.ENQUIRY_RATE_LIMIT.limit({ key });
    if (!rate.success) return failure('rate_limited', 'Too many attempts. Please wait a minute before trying again.', 429, { 'Retry-After': '60' });
  } catch {
    return failure('service_unavailable', 'Email submission is temporarily unavailable.', 503);
  }
  let input;
  try { input = await readLimitedBody(request); }
  catch (error) {
    return failure(error instanceof RangeError ? 'payload_too_large' : 'invalid_json', 'The enquiry could not be read. Please check your entries.', error instanceof RangeError ? 413 : 400);
  }
  const { data, errors } = validateEnquiry(input);
  if (Object.keys(errors).length) return json({ ok: false, code: 'validation_error', errors }, 422);
  if (data.website) return failure('invalid_submission', 'The enquiry could not be submitted.', 400);

  const reference = `CL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  // Construct an allowlisted payload; clients cannot set recipients, CC, webhooks or headers.
  const payload = {
    name: data.name,
    'Email or phone': data.contact,
    'Enquiry type': topics[data.type],
    'Reference': reference,
    'Submitted (UTC)': new Date().toISOString(),
    message: data.message,
    _subject: `chenglian ${topics[data.type]} | ${reference}`,
    _template: 'table',
    _url: `${expectedOrigin}/contact`,
  };
  if (emailPattern.test(data.contact)) payload.email = data.contact;
  if (data.product) payload.Product = `${products.get(data.product)} (${data.product})`;
  if (data.organization) payload.Organization = data.organization;
  if (data.usage) payload.Deployment = data.usage;
  if (data.type === 'business') {
    payload.Quantity = data.quantity;
    if (data.timeline) payload['Target delivery'] = data.timeline;
  }
  // FormSubmit's public AJAX API is sent from the visitor's browser. Forwarding
  // all enquiries through a shared Cloudflare egress IP hits provider rate limits.
  // Preparation alone never sends mail and must never be presented as acceptance.
  return json({ ok: true, status: 'ready', reference, delivery: { url: DELIVERY_URL, payload } });
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/enquiry') return handleEnquiry(request, env);
    if (path.startsWith('/api/')) return failure('not_found', 'Not found.', 404);
    return env.ASSETS.fetch(request);
  },
};
