"use client";

import { Bookmark, BookmarkCheck, TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";
import { agendaConflicts, groupByStart, type Lookup, neighbour, sortSessions } from "../core/schedule/logic";
import { formatTime, minutesBetween, zonedParts } from "../core/schedule/time";
import { safeColor } from "../core/schedule/theme";
import type { ScheduleRoom, ScheduleSession } from "../core/schedule/types";
import { sch } from "./scheduleClasses";

const KIND_LABEL: Record<string, string> = { talk: "Talk", keynote: "Keynote", workshop: "Workshop", panel: "Panel", poster: "Poster", break: "Break", social: "Social", other: "Other" };

export type ViewProps = {
  day: string;
  sessions: ScheduleSession[];
  rooms: ScheduleRoom[];
  lookup: Lookup;
  tz: string;
  agenda: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
};

const speakers = (s: ScheduleSession) => s.speakers.map((p) => p.name).filter(Boolean).join(", ");

/** The bookmark button: a toggle that says what it will do and what it's for. */
export function BookmarkButton({ session, on, onToggle, compact }: { session: ScheduleSession; on: boolean; onToggle: (id: string) => void; compact?: boolean }) {
  const Icon = on ? BookmarkCheck : Bookmark;
  return (
    <button
      type="button"
      aria-pressed={on}
      // One constant name; aria-pressed carries the state (a name that flips with it would be announced twice)
      aria-label={`Add to my schedule: ${session.title}`}
      onClick={() => onToggle(session.id)}
      className={`${sch.ghostBtn} ${on ? sch.toggleOn : ""} ${compact ? "px-2 py-1" : ""}`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {!compact && <span>Add to my schedule</span>}
    </button>
  );
}

// ─── Agenda (the list; the phone layout, and the print layout) ────────────────

/** A day as a list grouped by start time. One heading per time, one card per session. */
export function AgendaView({ day, sessions, lookup, tz, agenda, onToggle, onOpen, allSessions }: ViewProps & { allSessions: ScheduleSession[] }) {
  const conflicts = agendaConflicts(allSessions, agenda);
  const groups = groupByStart(sessions);
  if (groups.length === 0) return <p className={sch.muted}>Nothing matches on this day.</p>;
  return (
    <div className="flex flex-col gap-5">
      {groups.map((g) => (
        <section key={g.at} aria-labelledby={`t-${day}-${g.at}`}>
          <h3 id={`t-${day}-${g.at}`} className="mb-2 text-lg font-bold">
            {formatTime(g.at, tz)}
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {g.sessions.map((s) => {
              const track = s.track_id ? lookup.tracks.get(s.track_id) : undefined;
              const room = s.room_id ? lookup.rooms.get(s.room_id) : undefined;
              const clash = conflicts.get(s.id);
              return (
                <li key={s.id} className={`${sch.surface} rounded-box p-3`} style={{ borderLeft: `6px solid ${safeColor(track?.color)}` }}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <button type="button" onClick={() => onOpen(s.id)} className={`min-w-0 flex-1 rounded text-left ${sch.focus}`}>
                      <span className="block text-base font-semibold">{s.title}</span>
                      <span className={`block text-sm ${sch.muted}`}>
                        {formatTime(s.starts_at, tz)} to {formatTime(s.ends_at, tz)} ({minutesBetween(s.starts_at, s.ends_at)} min)
                        {room ? ` · ${room}` : ""}
                        {track ? ` · ${track.name}` : ""}
                        {s.kind !== "talk" ? ` · ${KIND_LABEL[s.kind]}` : ""}
                      </span>
                      {speakers(s) && <span className="block text-sm">{speakers(s)}</span>}
                    </button>
                    <BookmarkButton session={s} on={agenda.has(s.id)} onToggle={onToggle} compact />
                  </div>
                  {clash && (
                    <p className="mt-2 flex items-start gap-2 text-sm" role="note">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>Overlaps with {clash.map((c) => `“${c.title}”`).join(" and ")} in your schedule.</span>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

// ─── Grid (rooms across, time down; the desktop layout) ───────────────────────

const PX_PER_MIN = 1.5;

/**
 * Rooms as columns, time down the side. Each room is a labelled list of sessions, so a screen
 * reader reads it room by room in time order. The sessions are a single tab stop (roving
 * tabindex): the arrow keys move between them (up/down in the room, left/right across rooms),
 * Enter opens one, and B bookmarks it.
 */
export function GridView({ day, sessions, rooms, lookup, tz, agenda, onToggle, onOpen, allSessions }: ViewProps & { allSessions: ScheduleSession[] }) {
  const conflicts = agendaConflicts(allSessions, agenda);
  const wrap = useRef<HTMLDivElement>(null);
  const ordered = sortSessions(sessions);
  const [active, setActive] = useState<string | null>(null);
  const activeId = ordered.some((s) => s.id === active) ? active : (ordered[0]?.id ?? null);

  if (ordered.length === 0) return <p className={sch.muted}>Nothing matches on this day.</p>;

  let lo = 8 * 60;
  let hi = 18 * 60;
  for (const s of ordered) {
    const a = zonedParts(s.starts_at, tz).minutes;
    lo = Math.min(lo, Math.floor(a / 60) * 60);
    hi = Math.max(hi, Math.ceil((a + minutesBetween(s.starts_at, s.ends_at)) / 60) * 60);
  }
  hi = Math.min(hi, 24 * 60);
  const height = (hi - lo) * PX_PER_MIN;
  const hours: number[] = [];
  for (let m = lo; m < hi; m += 60) hours.push(m);

  const cols: { id: string | null; name: string }[] = [
    ...rooms.filter((r) => ordered.some((s) => s.room_id === r.id)).map((r) => ({ id: r.id as string | null, name: r.name })),
    ...(ordered.some((s) => !s.room_id) ? [{ id: null, name: "No room" }] : []),
  ];
  const roomOrder = cols.map((c) => c.id);

  function go(to: string | null) {
    if (!to) return;
    setActive(to);
    wrap.current?.querySelector<HTMLElement>(`[data-session="${to}"]`)?.focus();
  }
  function onKey(e: React.KeyboardEvent, s: ScheduleSession) {
    const dir = ({ ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" } as const)[e.key as "ArrowUp"];
    if (dir) {
      e.preventDefault();
      return go(neighbour(ordered, roomOrder, s.id, dir));
    }
    if (e.key === "b" || e.key === "B") {
      e.preventDefault();
      onToggle(s.id);
    }
  }

  return (
    <div ref={wrap} className={`${sch.surface} overflow-x-auto rounded-box`}>
      <p id={`hint-${day}`} className="sr-only">
        Use the arrow keys to move between sessions, Enter to open one, and B to add or remove it from your schedule.
      </p>
      <div className="min-w-fit">
        <div className={`sticky top-0 z-20 flex border-b font-semibold ${sch.surface}`} aria-hidden="true">
          <div className="w-16 shrink-0" />
          {cols.map((c) => (
            <div key={c.name} className="min-w-52 flex-1 border-l border-current/20 px-3 py-2">
              {c.name}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="relative w-16 shrink-0" style={{ height }} aria-hidden="true">
            {hours.map((m, i) => (
              <span key={m} className={`absolute right-2 whitespace-nowrap text-xs ${sch.muted}`} style={{ top: (m - lo) * PX_PER_MIN, transform: i === 0 ? undefined : "translateY(-50%)" }}>
                {formatTime(`2000-01-01T${String(Math.floor(m / 60)).padStart(2, "0")}:00:00Z`, "UTC")}
              </span>
            ))}
          </div>
          {cols.map((c) => (
            <ul
              key={c.name}
              aria-label={`${c.name}, ${ordered.filter((s) => s.room_id === c.id).length} sessions`}
              className="relative m-0 min-w-52 flex-1 list-none border-l border-current/20 p-0"
              style={{ height, backgroundImage: "linear-gradient(to bottom, color-mix(in oklab, currentColor 14%, transparent) 1px, transparent 1px)", backgroundSize: `100% ${60 * PX_PER_MIN}px` }}
            >
              {ordered
                .filter((s) => s.room_id === c.id)
                .map((s) => {
                  const a = zonedParts(s.starts_at, tz).minutes;
                  const dur = minutesBetween(s.starts_at, s.ends_at);
                  const track = s.track_id ? lookup.tracks.get(s.track_id) : undefined;
                  const on = agenda.has(s.id);
                  const clash = conflicts.get(s.id);
                  const h = Math.max(dur * PX_PER_MIN, 30);
                  return (
                    <li key={s.id} className="absolute inset-x-1" style={{ top: (a - lo) * PX_PER_MIN, height: h }}>
                      <button
                        type="button"
                        data-session={s.id}
                        tabIndex={s.id === activeId ? 0 : -1}
                        aria-describedby={`hint-${day}`}
                        onFocus={() => setActive(s.id)}
                        onClick={() => onOpen(s.id)}
                        onKeyDown={(e) => onKey(e, s)}
                        className={`${sch.surface} ${sch.focus} h-full w-full overflow-hidden rounded-md px-2 py-1 text-left text-sm ${on ? "ring-2 ring-[var(--cs-accent,var(--color-primary))]" : ""}`}
                        style={{ borderLeft: `6px solid ${safeColor(track?.color)}` }}
                      >
                        <span className="flex items-start gap-1">
                          {on && <BookmarkCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />}
                          {clash && <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />}
                          <span className="line-clamp-2 font-semibold leading-tight">{s.title}</span>
                        </span>
                        {/* The name is the content: what is hidden for lack of height is still read out */}
                        <span className={`${h > 48 ? "block" : "sr-only"} text-xs ${sch.muted}`}>
                          {formatTime(s.starts_at, tz)}–{formatTime(s.ends_at, tz)}
                        </span>
                        {speakers(s) && <span className={`${h > 70 ? "block truncate" : "sr-only"} text-xs ${sch.muted}`}>{speakers(s)}</span>}
                        {track && <span className="sr-only">Track: {track.name}.</span>}
                        {on && <span className="sr-only">In your schedule.</span>}
                        {clash && <span className="sr-only">Overlaps with {clash.map((x) => x.title).join(" and ")} in your schedule.</span>}
                      </button>
                    </li>
                  );
                })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
