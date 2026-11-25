"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSchedule } from "../core/schedule/api";
import type { Schedule } from "../core/schedule/types";
import { SuiteError } from "../core/errors";
import type { SuiteConfig } from "../core/types";
import { useStableConfig } from "./useStableConfig";

export type ScheduleLoad =
  | { status: "loading" }
  | { status: "error"; message: string; code?: string }
  | { status: "ready"; schedule: Schedule };

const POLL_MS = 60_000;

/**
 * The public schedule, kept fresh: loads once, then re-checks every minute while the tab is
 * visible, using the ETag so an unchanged schedule costs a 304. A failed re-check never replaces
 * a schedule you are already reading with an error.
 */
export function useSchedule(rawConfig: SuiteConfig, pollMs: number = POLL_MS) {
  const config = useStableConfig(rawConfig);
  const [load, setLoad] = useState<ScheduleLoad>({ status: "loading" });
  const etag = useRef<string | null>(null);
  const have = useRef(false);
  const [attempt, setAttempt] = useState(0);

  const fetchOnce = useCallback(
    async (initial: boolean) => {
      try {
        const r = await getSchedule(config, { etag: etag.current });
        if (r.kind === "fresh") {
          etag.current = r.etag;
          have.current = true;
          setLoad({ status: "ready", schedule: r.schedule });
        }
      } catch (e) {
        if (initial || !have.current) {
          const err = e instanceof SuiteError ? e : null;
          setLoad({ status: "error", message: err?.message ?? "Something went wrong. Try again.", code: err?.code });
        }
      }
    },
    [config],
  );

  useEffect(() => {
    etag.current = null;
    have.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a retry shows the spinner again
    setLoad({ status: "loading" });
    void fetchOnce(true);
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void fetchOnce(false);
    }, pollMs);
    return () => window.clearInterval(id);
  }, [fetchOnce, attempt, pollMs]);

  return { load, retry: useCallback(() => setAttempt((n) => n + 1), []) };
}
