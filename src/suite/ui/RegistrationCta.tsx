"use client";

import Link from "next/link";
import { formatDay } from "../core/registration/options";
import type { SuiteConfig } from "../core/types";
import { useRegistrationState } from "../react/useRegistration";

/** The registration button: its wording and link come from the suite's window, never a hardcoded date. */
export function RegistrationCta({ config, className = "btn btn-lg" }: { config: SuiteConfig; className?: string }) {
  const state = useRegistrationState(config);
  if (state?.kind === "open") {
    return (
      <Link href="/register" className={`${className} btn-secondary`}>
        Register now
      </Link>
    );
  }
  const label =
    state === null
      ? "Registration"
      : state.kind === "opens_soon"
        ? state.startDate
          ? `Registration opens ${formatDay(state.startDate)}`
          : "Registration opens soon"
        : state.kind === "closed"
          ? "Registration closed"
          : "Registration";
  return (
    <button type="button" className={className} disabled>
      {label}
    </button>
  );
}

/** The day registration opens, from the suite ("TBD" until it is set). */
export function RegistrationDate({ config, fallback = "TBD" }: { config: SuiteConfig; fallback?: string }) {
  const state = useRegistrationState(config);
  if (state?.kind === "opens_soon" && state.startDate) return <>{formatDay(state.startDate)}</>;
  if (state?.kind === "open") return <>Open now</>;
  return <>{fallback}</>;
}

/** A short badge for the registration card: opens date, open now, or closed. */
export function RegistrationBadge({ config }: { config: SuiteConfig }) {
  const state = useRegistrationState(config);
  if (state?.kind === "open") return <>Open now</>;
  if (state?.kind === "opens_soon") return <>{state.startDate ? `Opens ${formatDay(state.startDate)}` : "Opens soon"}</>;
  if (state?.kind === "closed") return <>Closed</>;
  return <>Registration</>;
}
