import type { ScheduleTheme } from "./types";

const HEX = /^#[0-9a-fA-F]{6}$/;

/**
 * The org's theme as CSS variables for the schedule's wrapper, or `{}` when it has none.
 * The suite only stores a theme that meets WCAG AA, but a value from the network is still
 * checked here so a bad one can never inject anything into a style.
 */
export function themeVars(theme: ScheduleTheme | undefined): Record<string, string> {
  if (!theme) return {};
  const keys = ["bg", "fg", "surface", "accent", "accent_fg"] as const;
  if (!keys.every((k) => typeof theme[k] === "string" && HEX.test(theme[k]!))) return {};
  return {
    "--cs-bg": theme.bg!,
    "--cs-fg": theme.fg!,
    "--cs-surface": theme.surface!,
    "--cs-accent": theme.accent!,
    "--cs-accent-fg": theme.accent_fg!,
  };
}

/** Only a #rrggbb is ever used as a colour (the track colour comes from the network too). */
export const safeColor = (c: string | undefined, fallback = "#047857") => (c && HEX.test(c) ? c : fallback);
