# CLAUDE.md

Guidance for Claude Code in this repository.

## Project

MCBIOS main conference site: Next.js (App Router, `--webpack`), Chakra UI v3 + Tailwind, Supabase (`@supabase/ssr`), Zustand + SWR, Aptabase. Yarn 4 (no npm). Deployed on Netlify. Sibling repos: the Conference Suite (`../conf_suite/suite`) and the Soapbox test-bench (`../conf_suite/soapbox`, same architecture), and the new `../2027` site.

## Commands

`yarn dev` (3000), `yarn build`, `yarn lint`, `yarn generate` (Supabase types; or copy the suite's `src/types/database.types.ts` to `lib/supabase/types.ts`).

## Architecture rules

- **No server secrets here.** Anon key + user JWT only; no service-role client, no Stripe secret key. Anything needing server power goes through the suite (`getBaseServiceURL()` in `lib/common.ts`, canonical host `https://www.conferencesuite.net`: browsers won't follow redirects on CORS preflights).
- **Database-first.** Rules and rails (registration guards, plan/quota limits, paid state, member invariants) live in the suite's Postgres functions, triggers and RLS, not in this site's code. Don't add new client-side copies of such logic: read the answer (suite endpoints or RLS-readable views/RPCs such as `my_membership`) and render it. `lib/paid.ts` and the window logic in `lib/registration.ts` are legacy copies that go away as the SQL functions land (see `../conf_suite/suite/docs/db-offload-review.md`).
- **Registration is driven by the suite**, never hardcoded: `lib/registration.ts` (`useRegistrationProducts`, `registrationOptions`, `registrationPrices`, `isRegistrationOpen`, `useRegistrationStatus`) reads `GET /api/stripe/registration-product`. Don't add price IDs, "coming soon" flags or env toggles.
- **Payments:** `components/dashboard/PaymentHandler.tsx` → suite `/api/stripe/registration-checkout` (Bearer token when signed in); the suite webhook applies the payment. `@stripe/*` browser packages only; the `stripe` server package is gone.
- **Paid state:** `lib/paid.ts` `isPaidThisCycle(fees_paid_at, {registrationStart, conferenceDate})` mirrors the suite (window from `organization.registration_start_date`/`conference_date`, read by members through RLS in `authFetcher`). Recordings (`videos`) stay available to anyone with a `fees_paid_at`.
- **Auth:** `components/AuthModal.tsx` uses the suite's `GET /api/auth/[org_id]?email=` (200 `{authed}`, 404, 406 other org) and `PUT /api/auth` for cross-org sync.
- **Shared sign-in:** `NEXT_PUBLIC_COOKIE_DOMAIN` (e.g. `mcbios.com`) makes the Supabase session cookie cover subdomains (`lib/supabase/cookie-domain.ts`, used by the browser, server and proxy clients). It only applies on hosts inside that domain, and the browser client clears old host-only auth cookies once (members sign in again one time). Same rule as the suite's CORS: an org's `base_url` covers its subdomains.
- Keep `lib/supabase/types.ts` identical to the suite's generated types.
- `NEXT_PUBLIC_ORG_ID` is the org in the suite (new MCBIOS org `522ab88a-5093-43ae-bea9-313d630233d5`); `NEXT_PUBLIC_APP_URL` must match that org's `base_url` or CORS fails.
- Server components can't import `lib/common.ts` (it pulls a client hook); inline the suite URL as `app/payment/[id]/page.tsx` does.

## Conventions

Chakra dark mode via `_dark` props, e.g. `color={{ base: "gray.800", _dark: "gray.100" }}`; brand red `#800000`/`red.700`. Page-view analytics via `PageViewTracker` + `Events` in `lib/constants.ts`. Videos/content upload still writes directly via the anon client under RLS.

## Roadmap: SDK extraction

Auth, registration and paid-state logic here is the source being ported into a shared SDK (first built in `../2027/src/suite/`, then extracted to a package, with this site as the second consumer). **Canonical plan: `../conf_suite/suite/docs/sdk-roadmap.md`** (milestones M0-M5; tick the checkbox when you finish one). Until M4, keep the logic here working and don't restructure it; when porting, fix the a11y gaps listed in M1 rather than copying them (links without `href`, unlabeled icon buttons, no Enter on the email step, toast-only status). Chakra is being phased out in favour of Tailwind + Ark UI, page by page, only behind passing axe/keyboard tests.
