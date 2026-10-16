import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

const ORIGIN = 'https://runtime-test.invalid';
const PROVIDER_URL = 'https://formsubmit.co/ajax/3537213006@qq.com';
let workerScript;

before(async () => {
  // Exercise the actual default Worker and bindings in workerd, not a Node mock.
  const result = await build({
    entryPoints: [fileURLToPath(new URL('../worker.mjs', import.meta.url))],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
  });
  workerScript = result.outputFiles[0].text;
});

async function runtime(t, rateLimit = 5) {
  const calls = [];
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true,
    script: workerScript,
    compatibilityDate: '2026-10-16',
    cf: false,
    telemetry: { enabled: false },
    bindings: { PUBLIC_SITE_ORIGIN: ORIGIN },
    ratelimits: {
      ENQUIRY_RATE_LIMIT: {
        namespace_id: '2026101601',
        simple: { limit: rateLimit, period: 60 },
      },
    },
    // Preparation must not contact the provider. Intercept and reject EVERY
    // outbound fetch, with no network fallback and no possibility of email.
    outboundService: async (request) => {
      calls.push({ url: request.url, method: request.method });
      throw new Error('Unexpected outbound request during enquiry preparation');
    },
  }));
  t.after(() => mf.dispose());
  return { mf, calls };
}

function submit(mf) {
  return mf.dispatchFetch(`${ORIGIN}/api/enquiry`, {
    method: 'POST',
    headers: {
      Origin: ORIGIN,
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '192.0.2.12',
    },
    body: JSON.stringify({
      type: 'general', name: 'Local Runtime Test',
      contact: 'runtime-test@example.invalid',
      message: 'MOCK ONLY: Verify local runtime; never send an email.',
      consent: true,
    }),
  });
}

test('real workerd handler prepares browser delivery without contacting a provider', async (t) => {
  const { mf, calls } = await runtime(t);
  const response = await submit(mf);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, 'ready');
  assert.equal(body.ok, true);
  assert.match(body.reference, /^CL-[0-9A-F]{8}$/);
  assert.equal(body.delivery.url, PROVIDER_URL);
  assert.equal(body.delivery.payload.Reference, body.reference);
  assert.equal(body.delivery.payload.name, 'Local Runtime Test');
  assert.equal(body.delivery.payload.email, 'runtime-test@example.invalid');
  assert.equal(body.delivery.payload._url, `${ORIGIN}/contact`);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(calls.length, 0);
});

test('real runtime rate limiter rejects a second preparation with no outbound requests', async (t) => {
  const { mf, calls } = await runtime(t, 1);
  const first = await submit(mf);
  assert.equal(first.status, 200);
  await first.text();
  const second = await submit(mf);
  assert.equal(second.status, 429);
  assert.equal(second.headers.get('Retry-After'), '60');
  assert.equal((await second.json()).code, 'rate_limited');
  assert.equal(calls.length, 0);
});
