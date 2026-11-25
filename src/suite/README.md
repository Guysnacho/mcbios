# src/suite/: the Conference Suite SDK (pre-extraction)

Built here first, then moved into a package (see `../../CLAUDE.md` and
`conf_suite/suite/docs/sdk-roadmap.md`). Keep it extractable:

- `config.ts` is the only file that reads `process.env`.
- `core/`: plain TypeScript, no React. Auth, registration, schedule, cookie-domain, API client.
- `react/`: hooks over `core/`.
- `ui/`: Tailwind + Ark UI components over the hooks. Theme via `--cs-*` CSS variables.
- Nothing in here imports from the rest of the app. Dependencies point one way: `core` <- `react` <- `ui`.

## What is here

- `core/auth`, `core/cookie-domain`: sign-in and the shared session cookie (M1).
- `core/registration`: registration form, prices, draft, member prefill, typed guard errors (M2).
- `core/schedule`: public schedule fetch (ETag), filters and search, agenda conflicts, local-first agenda with 3-way merge, time zones, theme variables (M3c).
- `react/`: `AuthProvider`, `useRegistration`, `useSchedule`, `useAgenda`, `useStableConfig`, `useMediaQuery`.
- `ui/`: `SuiteAuth`/`AuthDialog`, `RegistrationForm`/`PaymentStatus`/`CheckoutMount`, `SchedulePage` (grid, agenda, dialog, print), small badges and CTAs that read the suite's state.
