import { formatDay, zonedParts } from "./time";
import type { Filters, Schedule, ScheduleSession } from "./types";

export const NO_FILTERS: Filters = { track: null, room: null, text: "", mine: false };

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Sessions in order: by start, then end, then title. */
export const sortSessions = (list: ScheduleSession[]) =>
  [...list].sort((a, b) => a.starts_at.localeCompare(b.starts_at) || a.ends_at.localeCompare(b.ends_at) || a.title.localeCompare(b.title));

/** The days (YYYY-MM-DD in `tz`) that have sessions, in order. */
export function scheduleDays(sessions: ScheduleSession[], tz: string): string[] {
  return [...new Set(sessions.map((s) => zonedParts(s.starts_at, tz).date))].sort();
}

export const sessionsOnDay = (sessions: ScheduleSession[], day: string, tz: string) =>
  sortSessions(sessions.filter((s) => zonedParts(s.starts_at, tz).date === day));

/** Apply the filters. `agenda` is the set of session ids in "my schedule". Search is accent- and case-insensitive. */
export function filterSessions(sessions: ScheduleSession[], f: Filters, agenda: ReadonlySet<string>): ScheduleSession[] {
  const terms = norm(f.text).split(/\s+/).filter(Boolean);
  return sessions.filter((s) => {
    if (f.mine && !agenda.has(s.id)) return false;
    if (f.track && s.track_id !== f.track) return false;
    if (f.room && s.room_id !== f.room) return false;
    if (terms.length === 0) return true;
    const hay = norm([s.title, s.description, ...s.speakers.flatMap((p) => [p.name, p.affiliation ?? "", p.talk ?? ""])].join(" "));
    return terms.every((t) => hay.includes(t));
  });
}

/** Do two sessions overlap in time? Back-to-back (one ends as the next starts) does not. */
export const overlaps = (a: ScheduleSession, b: ScheduleSession) => a.starts_at < b.ends_at && b.starts_at < a.ends_at;

/**
 * For my agenda: each session that overlaps another one I chose, mapped to those others.
 * (Sessions I haven't picked don't matter: browsing the full schedule isn't a clash.)
 */
export function agendaConflicts(sessions: ScheduleSession[], agenda: ReadonlySet<string>): Map<string, ScheduleSession[]> {
  const mine = sortSessions(sessions.filter((s) => agenda.has(s.id)));
  const out = new Map<string, ScheduleSession[]>();
  for (let i = 0; i < mine.length; i++) {
    for (let j = i + 1; j < mine.length && mine[j].starts_at < mine[i].ends_at; j++) {
      if (!overlaps(mine[i], mine[j])) continue;
      out.set(mine[i].id, [...(out.get(mine[i].id) ?? []), mine[j]]);
      out.set(mine[j].id, [...(out.get(mine[j].id) ?? []), mine[i]]);
    }
  }
  return out;
}

/** Group a day's sessions by start time for the agenda list: [{ at: ISO, sessions }]. */
export function groupByStart(sessions: ScheduleSession[]): { at: string; sessions: ScheduleSession[] }[] {
  const groups: { at: string; sessions: ScheduleSession[] }[] = [];
  for (const s of sortSessions(sessions)) {
    const last = groups[groups.length - 1];
    if (last && last.at === s.starts_at) last.sessions.push(s);
    else groups.push({ at: s.starts_at, sessions: [s] });
  }
  return groups;
}

export type Lookup = { rooms: Map<string, string>; tracks: Map<string, { name: string; color: string }> };
export const lookups = (s: Schedule): Lookup => ({
  rooms: new Map(s.rooms.map((r) => [r.id, r.name])),
  tracks: new Map(s.tracks.map((t) => [t.id, { name: t.name, color: t.color }])),
});

/** "Wednesday, March 17: 12 sessions" for a day heading */
export const dayHeading = (day: string, count: number) => `${formatDay(day, "long")}: ${count} session${count === 1 ? "" : "s"}`;

/**
 * Keyboard navigation across the room columns of the day grid. From `current`:
 *   up/down   the previous/next session in the same room
 *   left/right the session in the neighbouring room that overlaps it, else the closest start
 * Returns the id to focus, or null when there is nowhere to go.
 */
export function neighbour(
  sessions: ScheduleSession[],
  roomOrder: (string | null)[],
  current: string,
  dir: "up" | "down" | "left" | "right",
): string | null {
  const cur = sessions.find((s) => s.id === current);
  if (!cur) return null;
  if (dir === "up" || dir === "down") {
    const col = sortSessions(sessions.filter((s) => s.room_id === cur.room_id));
    const i = col.findIndex((s) => s.id === current);
    return col[dir === "up" ? i - 1 : i + 1]?.id ?? null;
  }
  const i = roomOrder.indexOf(cur.room_id);
  const step = dir === "left" ? -1 : 1;
  for (let c = i + step; c >= 0 && c < roomOrder.length; c += step) {
    const col = sortSessions(sessions.filter((s) => s.room_id === roomOrder[c]));
    if (col.length === 0) continue;
    const overlapping = col.find((s) => overlaps(s, cur));
    if (overlapping) return overlapping.id;
    const t = new Date(cur.starts_at).getTime();
    return col.reduce((best, s) => (Math.abs(new Date(s.starts_at).getTime() - t) < Math.abs(new Date(best.starts_at).getTime() - t) ? s : best)).id;
  }
  return null;
}
