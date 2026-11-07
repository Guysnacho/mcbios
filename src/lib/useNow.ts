"use client";

import { useEffect, useState } from "react";

/** Current time in ms, ticking every second. `null` until mounted (keeps SSR/hydration stable). */
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return now;
}
