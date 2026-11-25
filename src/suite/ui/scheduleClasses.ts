/**
 * Schedule styling. The org's admin-chosen theme arrives as --cs-* CSS variables on the
 * schedule's wrapper; each class falls back to the site's daisyUI tokens, so with no theme
 * the schedule simply follows the site (light/dark included).
 */
export const sch = {
  root: "text-[var(--cs-fg,var(--color-base-content))] bg-[var(--cs-bg,transparent)] rounded-box",
  surface: "bg-[var(--cs-surface,var(--color-base-100))] text-[var(--cs-fg,var(--color-base-content))] border border-[color-mix(in_oklab,var(--cs-fg,var(--color-base-content))_25%,transparent)]",
  muted: "text-[color-mix(in_oklab,var(--cs-fg,var(--color-base-content))_78%,transparent)]",
  accentBtn:
    "inline-flex items-center justify-center gap-2 rounded-field px-3 py-2 text-sm font-semibold bg-[var(--cs-accent,var(--color-primary))] text-[var(--cs-accent-fg,var(--color-primary-content))] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent,var(--color-primary))]",
  ghostBtn:
    "inline-flex items-center justify-center gap-2 rounded-field px-3 py-2 text-sm font-medium border border-[color-mix(in_oklab,var(--cs-fg,var(--color-base-content))_35%,transparent)] hover:bg-[color-mix(in_oklab,var(--cs-fg,var(--color-base-content))_8%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent,var(--color-primary))]",
  // Important so the ghost button's hover tint can never replace the accent (that put accent text on a tint: 1.2:1)
  toggleOn: "bg-[var(--cs-accent,var(--color-primary))]! hover:bg-[var(--cs-accent,var(--color-primary))]! text-[var(--cs-accent-fg,var(--color-primary-content))]! border-transparent",
  field:
    "w-full rounded-field border border-[color-mix(in_oklab,var(--cs-fg,var(--color-base-content))_40%,transparent)] bg-[var(--cs-surface,var(--color-base-100))] text-[var(--cs-fg,var(--color-base-content))] px-3 py-2 text-sm",
  focus: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cs-accent,var(--color-primary))]",
  link: "underline underline-offset-2 text-[var(--cs-accent,var(--color-primary))] hover:opacity-80",
} as const;
