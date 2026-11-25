"use client";

import { Tabs } from "@ark-ui/react/tabs";
import { CalendarPlus, Printer, Search } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import { publicFeedUrl, webcalUrl } from "../core/schedule/api";
import { dayHeading, filterSessions, lookups, NO_FILTERS, scheduleDays, sessionsOnDay } from "../core/schedule/logic";
import { themeVars } from "../core/schedule/theme";
import { formatDay, viewerZone, zoneName } from "../core/schedule/time";
import type { Filters, Schedule } from "../core/schedule/types";
import type { SuiteConfig } from "../core/types";
import { useAuth } from "../react/AuthProvider";
import { useAgenda } from "../react/useAgenda";
import { useMediaQuery } from "../react/useMediaQuery";
import { useSchedule } from "../react/useSchedule";
import { SessionDialog } from "./SessionDialog";
import { AgendaView, GridView } from "./ScheduleViews";
import { sch } from "./scheduleClasses";

function Notice({ title, children, tone = "info" }: { title: string; children?: React.ReactNode; tone?: "info" | "error" }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className="alert bg-base-200 text-base-content border border-info text-sm">
      <div>
        <p className="font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
}

/**
 * The public schedule: day tabs, a rooms-by-time grid on wide screens and an agenda list on
 * narrow ones, filters and search, a session dialog, a bookmarked "My schedule" that syncs when
 * you're signed in, calendar feeds, and a clean print layout. Everything comes from the suite
 * (`GET /api/schedule`); the org's theme arrives as --cs-* variables.
 */
export function SchedulePage({ config }: { config: SuiteConfig }) {
  const { load, retry } = useSchedule(config);
  if (load.status === "loading") {
    return (
      <p role="status" aria-live="polite" className="text-center">
        <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />
        Loading the schedule…
      </p>
    );
  }
  if (load.status === "error") {
    return load.code === "plan_inactive" ? (
      <Notice title="The schedule isn't available right now">Please check back soon.</Notice>
    ) : (
      <Notice tone="error" title="We couldn't load the schedule">
        <p>{load.message}</p>
        <button type="button" className="btn btn-sm mt-2" onClick={retry}>
          Try again
        </button>
      </Notice>
    );
  }
  if (load.schedule.sessions.length === 0) {
    return (
      <Notice title="The program hasn't been published yet">
        <p>Check back soon. Once sessions are published they will appear here.</p>
      </Notice>
    );
  }
  return <Loaded config={config} schedule={load.schedule} />;
}

function Loaded({ config, schedule }: { config: SuiteConfig; schedule: Schedule }) {
  const auth = useAuth();
  const agenda = useAgenda(config, schedule);
  const uid = useId();
  const wide = useMediaQuery("(min-width: 1024px)");
  const eventZone = schedule.timezone;
  const mine = viewerZone();
  const canLocal = !!mine && mine !== eventZone;
  const [local, setLocal] = useState(false);
  const tz = local && mine ? mine : eventZone;

  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [announce, setAnnounce] = useState("");

  const lookup = useMemo(() => lookups(schedule), [schedule]);
  const themed = useMemo(() => themeVars(schedule.theme), [schedule.theme]);
  const filtered = useMemo(() => filterSessions(schedule.sessions, filters, agenda.ids), [schedule.sessions, filters, agenda.ids]);
  const allDays = useMemo(() => scheduleDays(schedule.sessions, tz), [schedule.sessions, tz]);
  const [pickedDay, setDay] = useState<string>(allDays[0]);
  const day = allDays.includes(pickedDay) ? pickedDay : allDays[0];
  const open = schedule.sessions.find((s) => s.id === openId) ?? null;

  const toggle = (id: string) => {
    const s = schedule.sessions.find((x) => x.id === id);
    const on = agenda.ids.has(id);
    agenda.toggle(id);
    if (s) setAnnounce(on ? `Removed “${s.title}” from your schedule.` : `Added “${s.title}” to your schedule.`);
  };
  const openSession = (id: string) => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpenId(id);
  };

  const feed = publicFeedUrl(config);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters((f) => ({ ...f, [k]: v }));
  const hasFilters = !!(filters.track || filters.room || filters.text.trim());
  const showing = filtered.length;

  const common = { rooms: schedule.rooms, lookup, tz, agenda: agenda.ids, onToggle: toggle, onOpen: openSession, allSessions: schedule.sessions };

  return (
    <div className={`${sch.root} flex flex-col gap-4 p-4 print:p-0`} style={themed}>
      <div role="status" aria-live="polite" className="sr-only">
        {announce}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Which sessions to show" className="flex gap-2">
            <button type="button" aria-pressed={!filters.mine} onClick={() => set("mine", false)} className={`${sch.ghostBtn} ${!filters.mine ? sch.toggleOn : ""}`}>
              Full schedule
            </button>
            <button type="button" aria-pressed={filters.mine} onClick={() => set("mine", true)} className={`${sch.ghostBtn} ${filters.mine ? sch.toggleOn : ""}`}>
              My schedule ({agenda.ids.size})
            </button>
          </div>
          <button type="button" className={`${sch.ghostBtn} ml-auto`} onClick={() => window.print()}>
            <Printer className="size-4" aria-hidden="true" /> Print
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
          <div>
            <label htmlFor={`${uid}-q`} className="sr-only">
              Search sessions, speakers and topics
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" />
              <input id={`${uid}-q`} type="search" className={`${sch.field} pl-9`} placeholder="Search sessions, speakers, topics" value={filters.text} onChange={(e) => set("text", e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor={`${uid}-track`} className="sr-only">
              Track
            </label>
            <select id={`${uid}-track`} className={sch.field} value={filters.track ?? ""} onChange={(e) => set("track", e.target.value || null)}>
              <option value="">All tracks</option>
              {schedule.tracks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-room`} className="sr-only">
              Room
            </label>
            <select id={`${uid}-room`} className={sch.field} value={filters.room ?? ""} onChange={(e) => set("room", e.target.value || null)}>
              <option value="">All rooms</option>
              {schedule.rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className={`m-0 ${sch.muted}`}>
            Times are in {zoneName(tz, new Date(schedule.sessions[0].starts_at), "long")} ({tz}).
            {canLocal && (
              <label className="ml-3 inline-flex items-center gap-2">
                <input type="checkbox" checked={local} onChange={(e) => setLocal(e.target.checked)} />
                Show in my time zone ({mine})
              </label>
            )}
          </p>
          <p role="status" className={`m-0 ${sch.muted}`}>
            {hasFilters || filters.mine ? `${showing} session${showing === 1 ? "" : "s"} match.` : `${schedule.sessions.length} sessions.`}
            {hasFilters && (
              <button type="button" className={`ml-2 ${sch.link}`} onClick={() => setFilters((f) => ({ ...NO_FILTERS, mine: f.mine }))}>
                Clear filters
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Days */}
      <div className="print:hidden">
        <Tabs.Root value={day} onValueChange={(e) => setDay(e.value)} lazyMount unmountOnExit>
          <Tabs.List className="flex flex-wrap gap-1 border-b border-current/25" aria-label="Conference days">
            {allDays.map((d) => (
              <Tabs.Trigger key={d} value={d} className={`px-4 py-2 text-sm font-semibold data-[selected]:border-b-4 data-[selected]:border-[var(--cs-accent,var(--color-primary))] ${sch.focus}`}>
                {formatDay(d)}
                <span className="sr-only"> ({sessionsOnDay(filtered, d, tz).length} sessions)</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {allDays.map((d) => {
            const list = sessionsOnDay(filtered, d, tz);
            return (
              <Tabs.Content key={d} value={d} className="pt-4">
                <h2 className="mb-3 text-xl font-bold">{dayHeading(d, list.length)}</h2>
                {filters.mine && list.length === 0 ? (
                  <p className={sch.muted}>You haven&apos;t added anything on this day. Use “Add to my schedule” on a session to build your agenda.</p>
                ) : wide ? (
                  <GridView day={d} sessions={list} {...common} />
                ) : (
                  <AgendaView day={d} sessions={list} {...common} />
                )}
              </Tabs.Content>
            );
          })}
        </Tabs.Root>
      </div>

      {/* Agenda sync and calendar links */}
      <section aria-labelledby={`${uid}-cal`} className={`${sch.surface} flex flex-col gap-2 rounded-box p-4 print:hidden`}>
        <h2 id={`${uid}-cal`} className="m-0 flex items-center gap-2 text-lg font-bold">
          <CalendarPlus className="size-5" aria-hidden="true" /> Take it with you
        </h2>
        <p className="m-0 text-sm" role="status">
          {agenda.signedIn
            ? agenda.sync === "failed"
              ? "Your schedule is saved on this device, but we couldn't sync it to your account."
              : agenda.sync === "syncing"
                ? "Saving your schedule to your account…"
                : "Your schedule is saved to your account and follows you across devices."
            : "Your schedule is saved on this device."}
          {!agenda.signedIn && (
            <>
              {" "}
              <button type="button" className={sch.link} onClick={() => auth.open("signin")}>
                Sign in to keep it across devices
              </button>
              .
            </>
          )}
          {agenda.sync === "failed" && (
            <>
              {" "}
              <button type="button" className={sch.link} onClick={() => void agenda.retrySync()}>
                Try again
              </button>
            </>
          )}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-sm">
          <li>
            <a className={sch.link} href={webcalUrl(feed)}>
              Subscribe to the full schedule in your calendar
            </a>
          </li>
          {agenda.feedUrl && (
            <li>
              <a className={sch.link} href={webcalUrl(agenda.feedUrl)}>
                Subscribe to my schedule in your calendar
              </a>
            </li>
          )}
          <li>
            <a className={sch.link} href={feed}>
              Download the full schedule (.ics)
            </a>
          </li>
        </ul>
      </section>

      {/* Print: every day, as plain lists, nothing interactive */}
      <div className="hidden print:block" aria-hidden="true">
        <PrintAll schedule={schedule} sessions={filtered} lookup={lookup} tz={tz} />
      </div>

      <SessionDialog session={open} allSessions={schedule.sessions} lookup={lookup} tz={tz} agenda={agenda.ids} onToggle={toggle} onClose={() => setOpenId(null)} returnFocus={() => (opener.current?.isConnected ? opener.current : null)} themed={themed} />
    </div>
  );
}

function PrintAll({ schedule, sessions, lookup, tz }: { schedule: Schedule; sessions: Schedule["sessions"]; lookup: ReturnType<typeof lookups>; tz: string }) {
  const days = scheduleDays(sessions, tz);
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold">Schedule</h1>
      {days.map((d) => (
        <section key={d} className="mt-4 break-inside-avoid-page">
          <h2 className="border-b border-black text-lg font-bold">{formatDay(d, "long")}</h2>
          <ul className="m-0 list-none p-0">
            {sessionsOnDay(sessions, d, tz).map((s) => (
              <li key={s.id} className="break-inside-avoid border-b border-black/20 py-1 text-sm">
                <strong>
                  {new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(new Date(s.starts_at))}
                </strong>{" "}
                {s.title}
                {s.room_id ? ` · ${lookup.rooms.get(s.room_id)}` : ""}
                {s.speakers.length ? ` · ${s.speakers.map((p) => p.name).join(", ")}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-4 text-xs">Times in {tz}. {schedule.sessions.length} sessions.</p>
    </div>
  );
}
