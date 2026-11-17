# MCBIOS Main Conference Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4477398-f378-49cb-99ec-b2b506e0c1dd/deploy-status)](https://app.netlify.com/sites/mcbios/deploys)

The MCBIOS society site: events, membership, forms, member dashboard and conference registration. Built with Next.js (App Router) and Chakra UI v3. Palette by [Realtime Colors](https://www.realtimecolors.com/?colors=100217-f4f2f1-ae2a0f-bfd9d0-764091&fonts=Poppins-DM%20Sans).

This site is a client of the [Conference Suite](https://www.conferencesuite.net). It holds **no** Stripe secret key and **no** Supabase service-role key: it talks to Supabase with the anon key + the signed-in user's JWT (RLS applies), and everything that needs server power goes through suite endpoints.

## Getting started

```bash
cp .env.template .env.local   # fill in the values below
yarn dev                      # http://localhost:3000
yarn build                    # production build (webpack)
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUB_KEY` | Supabase project (anon key) |
| `NEXT_PUBLIC_ORG_ID` | This conference's org id in the suite |
| `NEXT_PUBLIC_APP_URL` | This site's origin (must match the org's `base_url` in the suite) |
| `NEXT_PUBLIC_SUITE_URL` | Optional suite override (default `https://www.conferencesuite.net`, `http://localhost:3001` in dev) |
| `NEXT_PUBLIC_ANALYTICS_KEY` | Aptabase |

Locally, run the suite on port 3001 and use an org whose `base_url` covers `http://localhost:3000`, or CORS will block the calls.

## How registration works

- **Open/closed, prices and levels come from the suite**, not from code: `GET /api/stripe/registration-product?org_id=` returns the org's Stripe products plus its registration window. Registration is open only between the org's *registration start date* and *conference date* (set in suite Settings), with an active subscription and at least one product tagged `metadata.role`.
- **Checkout:** `components/dashboard/PaymentHandler.tsx` creates an embedded checkout via the suite (`/api/stripe/registration-checkout`); the suite's webhook marks the member paid. `/payment/[id]` reads the session status from the suite.
- **Paid state:** the dashboard counts a member as registered only if `fees_paid_at` falls inside the window (`lib/paid.ts`, same rule as the suite).
- **Admin tools:** registrations list, member confirmation and "re-apply payment" (suite `/api/stripe/reconcile`); promo codes are managed in the suite's Promotions page.
- **Auth:** email-first sign-in/up through the suite (`/api/auth`), cross-org accounts are synced on login.

## Deploy

Netlify, on merge to `main`. Deploy order when the suite schema changes: apply the migration, deploy the suite, then this site.
