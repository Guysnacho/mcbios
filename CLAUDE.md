# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server (localhost:3000)
yarn build        # Production build (uses --webpack flag)
yarn start        # Start production server
yarn lint         # Run ESLint
yarn generate     # Regenerate Supabase TypeScript types from live schema
```

No test suite is configured.

## Architecture Overview

This is the **MCBIOS** (MidSouth Computational Biology and Bioinformatics Society) conference registration and membership platform. It is a **Next.js App Router** application backed by **Supabase** (Postgres + Auth) and **Stripe** (payments).

### Key Data Flow

Registration → AuthModal (optional login) → ConferenceRegistration → Stripe embedded checkout → Webhook → Supabase DB → Confirmation page

### Core Subsystems

**Authentication** — Supabase Auth (email/password). Middleware (`lib/supabase/middleware.ts`) protects `/dashboard`. Auth state is persisted client-side via Zustand (`lib/store/userStore.ts`). `AuthModal.tsx` handles login, sign-up, and password reset in a single modal.

**Registration** — `components/ConferenceRegistration.tsx` handles the main flow. Supports both authenticated members (with member pricing) and unauthenticated guests. Pricing tiers are configured via environment variables (early bird vs. final pricing × role).

**Payments** — Stripe embedded checkout. API routes under `app/checkout/` create and update sessions. `app/admin/route.ts` handles promo code management (GET/POST/DELETE). Payment webhooks update member records in Supabase.

**State** — Zustand store in `lib/store/` persists user ID and role. Zod validates user data shape. SWR is used for server data fetching in components.

**Supabase clients** — Three clients for different contexts:
- `lib/supabase/client.ts` — browser
- `lib/supabase/server.ts` — server components/actions
- `lib/supabase/service.ts` — service-level (bypasses RLS, for webhooks/admin)

**Types** — `lib/supabase/types.ts` is auto-generated from the schema via `yarn generate`. Do not edit by hand.

### Styling

Chakra UI v3 is the primary component library. Tailwind CSS is also available for utility classes. Dark mode is supported via `next-themes`.

### Deployment

Deployed to **Netlify** (not Vercel). Environment variables are defined in `.env.template` — copy to `.env.local` for local development. Required vars include Supabase credentials, Stripe keys, and Stripe price IDs for each membership tier × pricing period combination.
