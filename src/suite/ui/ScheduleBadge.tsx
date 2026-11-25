"use client";

import { useEffect, useState } from "react";
import { getSchedule } from "../core/schedule/api";
import type { SuiteConfig } from "../core/types";
import { useStableConfig } from "../react/useStableConfig";

/** A short badge for the schedule card: "Published" once the suite has published sessions, else "Coming soon". */
export function ScheduleBadge({ config: raw }: { config: SuiteConfig }) {
  const config = useStableConfig(raw);
  const [published, setPublished] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    getSchedule(config)
      .then((r) => alive && setPublished(r.kind === "fresh" && r.schedule.sessions.length > 0))
      .catch(() => alive && setPublished(false));
    return () => {
      alive = false;
    };
  }, [config]);
  return <>{published ? "Published" : "Coming soon"}</>;
}
