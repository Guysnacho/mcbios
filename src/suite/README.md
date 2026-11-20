# src/suite/: the Conference Suite SDK (pre-extraction)

Built here first, then moved into a package (see `../../CLAUDE.md` and
`conf_suite/suite/docs/sdk-roadmap.md`). Keep it extractable:

- `config.ts` is the only file that reads `process.env`.
- `core/`: plain TypeScript, no React. Auth, registration, schedule, cookie-domain, API client.
- `react/`: hooks over `core/`.
- `ui/`: Tailwind + Ark UI components over the hooks. Theme via `--cs-*` CSS variables.
- Nothing in here imports from the rest of the app. Dependencies point one way: `core` <- `react` <- `ui`.
