/**
 * Wall-clock math in a named time zone (Intl only). A session's "day" is its calendar
 * date in the schedule's zone, so a 9 pm session never lands on tomorrow's tab.
 * Mirrors the suite's `src/lib/schedule-time.ts`; both are tested against the same fixtures.
 */

type Parts = { date: string; minutes: number; offsetMin: number };

const cache = new Map<string, Intl.DateTimeFormat>();
function formatter(tz: string) {
  let f = cache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    cache.set(tz, f);
  }
  return f;
}

/** The wall-clock date (YYYY-MM-DD), minutes since local midnight and UTC offset (minutes) of an instant in `tz`. */
export function zonedParts(instant: string | Date, tz: string): Parts {
  const d = new Date(instant);
  const p: Record<string, string> = {};
  for (const part of formatter(tz).formatToParts(d)) p[part.type] = part.value;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  const t = Math.floor(d.getTime() / 1000) * 1000;
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: +p.hour * 60 + +p.minute, offsetMin: Math.round((asUtc - t) / 60000) };
}

/** "9:30 AM" */
export const formatTime = (instant: string | Date, tz: string): string =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(instant));

/** "Wed, Mar 17" (short) or "Wednesday, March 17" (long), for a YYYY-MM-DD */
export function formatDay(date: string, style: "short" | "long" = "short"): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: style === "long" ? "long" : "short",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "Central Daylight Time" / "CDT" for a zone at an instant */
export function zoneName(tz: string, at: Date = new Date(), style: "short" | "long" = "short"): string {
  const part = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: style }).formatToParts(at).find((p) => p.type === "timeZoneName");
  return part?.value ?? tz;
}

/** The viewer's own zone, or null when the browser won't say. */
export function viewerZone(): string | null {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

/** Minutes between two instants. */
export const minutesBetween = (a: string | Date, b: string | Date) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60000);
