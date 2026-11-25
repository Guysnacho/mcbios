@AGENTS.md

# CLAUDE.md

Guidance for Claude Code in this repository.

## Project

MCBIOS 2027 conference site (`2027.mcbios.com`): Next.js App Router, daisyUI + Tailwind v4, Yarn 4. Same org as the main MCBIOS site (`522ab88a-5093-43ae-bea9-313d630233d5`); backed by the Conference Suite (`../conf_suite/suite`, canonical host `https://www.conferencesuite.net`). Sibling: the main site `../mcbios`. **No server secrets here**: anon key + user JWT only.

## Commands

`yarn dev` (webpack: Turbopack's dev CSS pipeline fails on daisyUI's `@scope` output with a 500, `next build` is fine), `yarn build`, `yarn lint`, `yarn test` (vitest, `src/**`), `yarn test:e2e` (Playwright + axe in `e2e/`, Chromium; first run: `npx playwright install chromium`).

## Where things stand / where to pick up

**Canonical plan: `../conf_suite/suite/docs/sdk-roadmap.md`.** Find the first unchecked milestone, do it, tick the checkbox and note the commit. This repo hosts the first build of the SDK in `src/suite/` (auth M1, registration M2, schedule attendee view M3c: all built), which is later extracted into a package.

Rules for `src/suite/` (so extraction is a folder move):
1. No imports from the rest of the app; only `src/suite/config.ts` reads `process.env`.
2. Layers with one-way dependency: `core/` (plain TS, no React) ← `react/` (hooks) ← `ui/` (Tailwind + Ark UI components).
3. Sessions use `@supabase/ssr`'s framework-neutral `createBrowserClient` with explicit cookie handlers (`core/auth/cookies.ts`), pinned to the same `@supabase/ssr` and `@supabase/supabase-js` versions as the main site (0.7.0 / 2.78.0) so both sites write and read the same cookie format. Never use its server helpers in `src/suite/`. Bump the versions together with `../mcbios`.
4. Normalize API errors to `{message, code?}`; add every endpoint you rely on to the suite's OpenAPI spec.
5. Database-first: the suite keeps rules (registration guards, limits, paid state, invariants) in Postgres functions and triggers. `core/` calls the endpoint or RPC and maps its `{message, code}`; it does not re-implement the rule (so no new copy of `isPaidThisCycle`/window math: read `windowOpen` and `my_membership`). See `../conf_suite/suite/docs/db-offload-review.md`.
6. Accessibility ratchet: a component ships only with axe + keyboard tests passing. `e2e/a11y.spec.ts` scans every page in light and dark (dark is the default theme; light is the navbar toggle) for WCAG 2.x A/AA violations. Add new pages to its `PAGES` list. Theme colors in `globals.css` are contrast-checked (text on both base colors >= 4.5:1), so check a new color before adding it.

## Schedule (M3c)

`/schedule` is `src/suite/ui/SchedulePage.tsx` over `core/schedule/` (fetch with ETag, filters, agenda sync, time zones, theme) and `react/{useSchedule,useAgenda}`. Everything comes from the suite's `GET /api/schedule` (published sessions only, speakers without emails, plus the org's `timezone` and `theme`); admins build it in the suite dashboard. Things to keep true:
- **A day is a date in the schedule's zone** (`core/schedule/time.ts`, mirrors the suite's `schedule-time.ts`; same fixtures in both test suites). Never group by the UTC date.
- **"My schedule" is local-first** (`cs:agenda:<org>` in localStorage) and, signed in, synced through `GET/PUT /api/schedule/me` with a 3-way merge (`mergeAgenda`), so removals and adds on either side both survive. Overlaps are flagged only among the sessions you picked.
- **Theme** arrives as `--cs-*` CSS variables on the schedule wrapper (`themeVars`, which accepts only `#rrggbb`); `ui/scheduleClasses.ts` falls back to the site's daisyUI tokens, so no theme means the schedule follows the site. Colors from the network are never put in a style unless they pass `safeColor`/`themeVars`.
- **Layout:** day-by-room grid at `lg` and up, agenda list below (`useMediaQuery`), print layout (`print:` classes, `window.print()`), `prefers-reduced-motion` honored in `globals.css`. The grid is rooms as labelled lists with a roving tabindex (arrows between sessions, Enter opens, B bookmarks); buttons get their accessible name from their visible content (axe `label-content-name-mismatch`).
- e2e: `e2e/schedule.spec.ts` mocks the suite (axe on grid, agenda, dialog, themes; keyboard; signed-in sync; print; other time zone). `yarn test:e2e` can't start its server while a `yarn dev` of this repo is running (Next locks `.next`): stop it, or run from a copy. `/sessions` in `a11y.spec.ts` never reaches network idle while a dev suite is running on the `NEXT_PUBLIC_SUITE_URL` host (its HMR stream keeps the iframe busy).

## Conventions

- Proposal form: embedded suite form via `NEXT_PUBLIC_PROPOSAL_FORM_ID` (`src/components/SuiteFormEmbed.tsx`, iframe resized by the suite's `cs:resize` message, origin-checked). Cookies are blocked in the iframe, so the embedded form is always guest; editing a submission links out to `suiteFormUrl`.
- Sign-in is shared with the main site through a cookie on the org's base domain (`NEXT_PUBLIC_COOKIE_DOMAIN`, or derived from the org's `base_url`); it only applies on hosts inside that domain.
- The suite's CORS allows an org's `base_url` and any subdomain (https only; `http://localhost` in dev).
