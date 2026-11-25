"use client";

import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import { agendaConflicts, type Lookup } from "../core/schedule/logic";
import { safeColor } from "../core/schedule/theme";
import { formatDay, formatTime, minutesBetween, zonedParts } from "../core/schedule/time";
import type { ScheduleSession } from "../core/schedule/types";
import { BookmarkButton } from "./ScheduleViews";
import { ui } from "./classes";
import { sch } from "./scheduleClasses";

/** The full details of one session. Ark's Dialog traps focus, closes on Escape and returns focus to where it was opened. */
export function SessionDialog({
  session,
  allSessions,
  lookup,
  tz,
  agenda,
  onToggle,
  onClose,
  returnFocus,
  themed,
}: {
  session: ScheduleSession | null;
  allSessions: ScheduleSession[];
  lookup: Lookup;
  tz: string;
  agenda: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onClose: () => void;
  /** The element that opened the dialog, so focus goes back to it */
  returnFocus: () => HTMLElement | null;
  /** Inline CSS variables of the org theme: the dialog renders in a portal, outside the themed wrapper */
  themed: Record<string, string>;
}) {
  const s = session;
  const clash = s ? agendaConflicts(allSessions, agenda).get(s.id) : undefined;
  const track = s?.track_id ? lookup.tracks.get(s.track_id) : undefined;
  const room = s?.room_id ? lookup.rooms.get(s.room_id) : undefined;

  return (
    <Dialog.Root open={!!s} onOpenChange={(e) => !e.open && onClose()} lazyMount unmountOnExit finalFocusEl={returnFocus}>
      <Portal>
        <Dialog.Backdrop className={ui.backdrop} />
        <Dialog.Positioner className={ui.positioner}>
          <Dialog.Content className={`${ui.panel} relative max-w-2xl`} style={{ ...themed, ...(themed["--cs-surface"] ? { background: themed["--cs-surface"], color: themed["--cs-fg"] } : {}) }}>
            {s && (
              <>
                <Dialog.CloseTrigger className={ui.closeButton} aria-label="Close">
                  <X className="size-5" aria-hidden="true" />
                </Dialog.CloseTrigger>
                <p className="m-0 text-sm font-semibold uppercase tracking-wide">
                  {track ? (
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="inline-block size-3 rounded-full" style={{ background: safeColor(track.color) }} />
                      {track.name}
                    </span>
                  ) : (
                    s.kind
                  )}
                </p>
                <Dialog.Title className="mt-1 text-2xl font-bold">{s.title}</Dialog.Title>
                <Dialog.Description className={`mt-1 ${sch.muted}`}>
                  {formatDay(zonedParts(s.starts_at, tz).date, "long")}, {formatTime(s.starts_at, tz)} to {formatTime(s.ends_at, tz)} ({minutesBetween(s.starts_at, s.ends_at)} minutes)
                  {room ? `, ${room}` : ""}
                </Dialog.Description>

                {s.description && <p className="mt-4 whitespace-pre-line">{s.description}</p>}

                {s.speakers.length > 0 && (
                  <section className="mt-4" aria-labelledby={`sp-${s.id}`}>
                    <h3 id={`sp-${s.id}`} className="mb-2 text-lg font-bold">
                      {s.speakers.length === 1 ? "Speaker" : "Speakers"}
                    </h3>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {s.speakers.map((p, i) => (
                        <li key={i}>
                          <span className="block font-semibold">{p.name}</span>
                          <span className={`block text-sm ${sch.muted}`}>{[p.title, p.department, p.affiliation].filter(Boolean).join(", ")}</span>
                          {p.talk && <span className="block text-sm">Talk: {p.talk}</span>}
                          {p.urls && p.urls.length > 0 && (
                            <span className="block text-sm">
                              {p.urls
                                .filter((u) => /^https?:\/\//i.test(u))
                                .map((u) => (
                                  <a key={u} href={u} target="_blank" rel="noopener noreferrer" className={`mr-3 ${sch.link}`}>
                                    {u.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "")}
                                    <span className="sr-only"> (opens in a new tab)</span>
                                  </a>
                                ))}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {clash && (
                  <p role="note" className="mt-4 rounded-box border border-current/30 p-3 text-sm">
                    This overlaps with {clash.map((c) => `“${c.title}” (${formatTime(c.starts_at, tz)})`).join(" and ")} in your schedule.
                  </p>
                )}

                <div className="mt-5">
                  <BookmarkButton session={s} on={agenda.has(s.id)} onToggle={onToggle} />
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
