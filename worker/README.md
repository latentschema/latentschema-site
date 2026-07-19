# Whitepaper Gate — email confirmation worker

A small, standalone Cloudflare Worker that replaces the instant-unlock
whitepaper gate with a real email-confirmation step:

1. Visitor submits the form on the site → `POST /request-access`
2. Worker emails them a signed, expiring link (via Resend) → they never see
   the whitepaper URL directly
3. They click the link → `GET /verify` checks the signature + expiry, then
   redirects to the actual whitepaper file on latentschema.com

No database — the token is a signed, self-contained JSON payload
(`{email, resource, exp}`), verified with HMAC-SHA256. It expires in 30
minutes and there's nothing to clean up or provision.

This runs entirely separately from the main site's GitHub Pages deploy — it
does not require moving latentschema.com's DNS or hosting.

## One-time setup

### 1. Cloudflare account + Wrangler

```bash
cd worker
npm install
npx wrangler login   # opens a browser to authorize your Cloudflare account
```

If you don't have a Cloudflare account yet, `wrangler login` will prompt you
to create one — it's free for this use case (Workers free tier: 100,000
requests/day).

### 2. Resend account + domain verification

1. Create a free account at https://resend.com (free tier: 3,000 emails/month).
2. Add `latentschema.com` as a sending domain (Resend dashboard → Domains →
   Add Domain), then add the DNS records it gives you (a few TXT/CNAME
   records for SPF/DKIM) at your domain registrar. This is required to send
   as `whitepapers@latentschema.com` — without it Resend can only send from
   its own test domain.
3. Once the domain shows "Verified," create an API key (Dashboard → API
   Keys) and copy it.

### 3. Set secrets

```bash
cd worker
npx wrangler secret put RESEND_API_KEY
# paste the key from Resend when prompted

npx wrangler secret put TOKEN_SECRET
# paste any long random string, e.g. generate one with:
#   openssl rand -base64 32
```

### 4. Deploy

```bash
npm run deploy
```

Wrangler will print the worker's URL, something like:

```
https://latentschema-whitepaper-gate.<your-subdomain>.workers.dev
```

That's the base URL to put in the main site's `.env` as
`VITE_WHITEPAPER_API_URL` (see the repo root `.env.example`).

### 5. (Optional) Custom domain

To serve this from `api.latentschema.com` instead of the `workers.dev` URL,
add a `[routes]` block to `wrangler.toml` and follow Cloudflare's "custom
domains for Workers" docs — this requires adding a CNAME for that subdomain
pointing at Cloudflare, but does **not** require moving the root domain off
GitHub Pages.

## Local development

```bash
npm run dev
```

Runs the worker locally (default `http://localhost:8787`). Point
`VITE_WHITEPAPER_API_URL` at that during local frontend dev, and set
`ALLOWED_ORIGIN` in `wrangler.toml` to include `http://localhost:5173` (or
whichever port Vite picks) temporarily, or just test the JSON API directly
with `curl`.

## Notes

- Both whitepapers (`latentschema-whitepaper`, `fnbpulse-whitepaper`) are
  defined in `src/index.ts`'s `RESOURCES` map. Add new ones there if more
  gated resources are added to the site.
- The internal lead-notification email (to `contact@latentschema.com`) is
  sent best-effort — if it fails, the visitor's confirmation email still
  goes out; the failure is only logged.
- This is honest about what it does and doesn't guarantee: it confirms the
  visitor typed a real, reachable email address before they get the link. A
  determined person could still forward that link. It replaces "anyone who
  fills in any string can unlock this instantly" with "a live inbox has to
  receive and click a link" — which is the actual ask.
