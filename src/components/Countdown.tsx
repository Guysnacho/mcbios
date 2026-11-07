"use client";

import { PROPOSAL_DEADLINE, PROPOSAL_DEADLINE_LABEL } from "@/lib/site";
import { useNow } from "@/lib/useNow";
import { Clock } from "lucide-react";

const DEADLINE_MS = new Date(PROPOSAL_DEADLINE).getTime();

/** True once the proposal deadline has passed (false until mounted). */
export function useDeadlinePassed() {
  const now = useNow();
  return now !== null && now > DEADLINE_MS;
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const v = value ?? 0;
  return (
    <div className="flex flex-col items-center">
      <span className="countdown font-mono text-4xl">
        <span
          style={{ "--value": v } as React.CSSProperties}
          aria-live="polite"
          aria-label={String(v)}
        >
          {v}
        </span>
      </span>
      {label}
    </div>
  );
}

export function Countdown() {
  const now = useNow();
  const diff = now === null ? null : Math.max(0, DEADLINE_MS - now);
  const passed = now !== null && now > DEADLINE_MS;

  if (passed) {
    return (
      <div role="alert" className="alert alert-error">
        Session proposals are closed.
      </div>
    );
  }

  return (
    <div className="card bg-base-200/80 backdrop-blur-md card-border">
      <div className="card-body items-center text-center">
        <div className="flex items-center gap-2 opacity-80">
          <Clock className="size-4 text-primary" />
          Session proposals due {PROPOSAL_DEADLINE_LABEL}
        </div>
        <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
          <Unit
            value={diff === null ? null : Math.floor(diff / 86400000)}
            label="days"
          />
          <Unit
            value={
              diff === null ? null : Math.floor((diff % 86400000) / 3600000)
            }
            label="hours"
          />
          <Unit
            value={diff === null ? null : Math.floor((diff % 3600000) / 60000)}
            label="min"
          />
          <Unit
            value={diff === null ? null : Math.floor((diff % 60000) / 1000)}
            label="sec"
          />
        </div>
      </div>
    </div>
  );
}
