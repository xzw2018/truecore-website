# chenglian website

English-language enterprise hardware catalog for servers, network switches, enterprise drives and components. Built with static HTML, CSS and JavaScript, and deployed to the existing Cloudflare Worker `truecore-website`.

## Local development

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Wrangler runs the build automatically. The build compiles the four product datasets, validates source assets, and recreates `dist/` from an explicit file list.

## Cloudflare deployment

Connect `xzw2018/truecore-website`, production branch `main`, to the Worker `truecore-website`.

- Root directory: repository root
- Build command: leave empty; the Wrangler custom build runs `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command, if enabled: `npx wrangler versions upload`
- Static output: `dist/`, configured in `wrangler.jsonc`

```sh
npm run check:deploy
npm run deploy
```

The dashboard may also use `npm run build` as an explicit build command; Wrangler will safely rebuild. Keep the Worker name unchanged to retain existing domains and routing. Never commit API tokens or local credentials.

## Content and assets

- Eight pages and 41 product models: 10 servers, 14 switches, 8 drives and 9 components.
- Maintain product content in the four source files under `research/` and run `npm run build`.
- `research/web-images.json` maps original manufacturer photos to the checked-in optimized WebP files. Image optimization is not required during deployment.
- IBM Plex Sans and IBM Plex Mono are hosted locally. The font license is included in `assets/fonts/OFL.txt`.
- Lucide is bundled locally; its ISC license is included in `assets/LUCIDE-LICENSE.txt`.
- See `assets/ASSET-NOTES.md` and `research/catalog-sources.json` for image and product provenance.

## Enquiry email delivery

The contact form posts to the same-origin `/api/enquiry` Worker endpoint. It forwards validated enquiries to **3537213006@qq.com** using FormSubmit. The recipient must click the initial **Activate Form** message in that inbox before delivery works. No mailbox password or API token is stored in this repository.

- The server fixes the destination, source URL and email subject; submitted data cannot add recipients or webhooks.
- Requests require the configured origin, JSON content type and consent. Fields, products and the 16 KB body limit are checked on the server.
- A honeypot and a Cloudflare rate limit of five attempts per minute per IP and Cloudflare location reduce automated submissions. Users sharing a network share that allowance.
- A successful response means the email service accepted the enquiry; it does not prove delivery to the inbox. There are no automatic retries or customer auto-replies.
- On failure, activation pending or an uncertain result, the form preserves a copy for download and direct email.
- FormSubmit handles email delivery and retains submissions for 30 days under its [published policy](https://formsubmit.co/documentation). Avoid including passwords or other secrets in enquiries.

Run `npm test` for endpoint and actual workerd runtime tests; all provider calls in tests are intercepted so no emails are sent. Run `npm run check:deploy` to validate the Worker bundle. When adding a custom domain, update `PUBLIC_SITE_ORIGIN` in `wrangler.jsonc`, then test the enquiry flow on that domain.
