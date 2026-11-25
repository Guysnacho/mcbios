"use client";

import { useMemo } from "react";
import type { SuiteConfig } from "../core/types";

/**
 * A config prop from a server component arrives as a new object whenever the server
 * re-renders (Fast Refresh, router refresh), though its values never change. Keying
 * effects on that identity would reload data and remount forms mid-use, so hand out
 * one object per set of values.
 */
export function useStableConfig(config: SuiteConfig): SuiteConfig {
  const key = JSON.stringify(config);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- the key is the config's values
  return useMemo(() => config, [key]);
}
