import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

const ORIGIN = 'https://runtime-test.invalid';
const PROVIDER_URL = 'https://formsubmit.co/ajax/3537213006@qq.com';
let workerScript;

before(async () => {
  // Bundle the real default Worker handler, preserving its runtime fetch options.
  // A Node-only injected fetch would miss workerd rejecting redirect: "error".
  const result = await build({
    entryPoints: [fileURLToPath(new URL('../worker.mjs', import.meta.url))],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'browser',
  });
  workerScript = result.outputFiles[0].text;
});

async function runtime(t, provider, rateLimit = 5) {
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
    // Intercept EVERY outbound fetch. There is deliberately no network fallback:
    // these tests must never reach FormSubmit or send an email.
    outboundService: async (request) => {
      const call = {
        url: request.url,
        method: request.method,
        payload: null,
      };
      calls.push(call);
      const text = await request.text();
      if (text) call.payload = JSON.parse(text);
      return provider(call, calls.length);
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

test('real workerd handler accepts a mocked provider response', async (t) => {
  const { mf, calls } = await runtime(t, () => Response.json({ success: true }));
  const response = await submit(mf);
  const body = await response.json();
  assert.equal(response.status, 202);
  assert.equal(body.status, 'accepted');
  assert.equal(body.ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, PROVIDER_URL);
  assert.equal(calls[0].method, 'POST');
  assert.equal(calls[0].payload.Reference, body.reference);
});

test('real workerd handler rejects a provider redirect without following it', async (t) => {
  const { mf, calls } = await runtime(t, (_call, count) => count === 1
    ? new Response(null, {
      status: 302,
      headers: { Location: 'https://must-not-be-followed.invalid/' },
    })
    : Response.json({ success: true }));
  const response = await submit(mf);
  assert.equal(response.status, 502);
  assert.equal((await response.json()).code, 'delivery_unconfirmed');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, PROVIDER_URL);
});

test('real runtime rate limiter stops a second attempt before the provider', async (t) => {
  const { mf, calls } = await runtime(t, () => Response.json({ success: true }), 1);
  const first = await submit(mf);
  assert.equal(first.status, 202);
  await first.text();
  const second = await submit(mf);
  assert.equal(second.status, 429);
  assert.equal(second.headers.get('Retry-After'), '60');
  assert.equal((await second.json()).code, 'rate_limited');
  assert.equal(calls.length, 1);
});
