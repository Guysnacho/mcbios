import { describe, expect, it, vi } from "vitest";
import { SuiteError } from "../../errors";
import { createAgendaStore, mergeAgenda, pruneAgenda } from "../agenda";
import { getMyAgenda, getSchedule, publicFeedUrl, putMyAgenda, webcalUrl } from "../api";
import { agendaConflicts, filterSessions, groupByStart, neighbour, NO_FILTERS, overlaps, scheduleDays, sessionsOnDay } from "../logic";
import { safeColor, themeVars } from "../theme";
import { formatDay, formatTime, viewerZone, zoneName, zonedParts } from "../time";
import type { Schedule, ScheduleSession } from "../types";

const CHI = "America/Chicago";
const config = { orgId: "org-1", suiteUrl: "https://suite.test", supabaseUrl: "", supabaseKey: "" };

const s = (id: string, start: string, end: string, over: Partial<ScheduleSession> = {}): ScheduleSession => ({
  id, title: id, description: "", kind: "talk", starts_at: `2027-03-17T${start}:00Z`, ends_at: `2027-03-17T${end}:00Z`, room_id: "r1", track_id: null, speakers: [], ...over,
});

describe("time (same fixtures as the suite's schedule-time tests)", () => {
  it("reads wall-clock parts in the schedule's zone, CDT after the clocks change", () => {
    expect(zonedParts("2027-03-17T14:00:00Z", CHI)).toEqual({ date: "2027-03-17", minutes: 540, offsetMin: -300 });
    expect(zonedParts("2027-03-13T15:00:00Z", CHI)).toMatchObject({ date: "2027-03-13", minutes: 540, offsetMin: -360 });
  });
  it("a 9 pm session stays on its own day", () => {
    expect(zonedParts("2027-03-18T02:00:00Z", CHI).date).toBe("2027-03-17");
  });
  it("formats times and days", () => {
    expect(formatTime("2027-03-17T14:30:00Z", CHI)).toBe("9:30 AM");
    expect(formatTime("2027-03-17T14:30:00Z", "Asia/Kolkata")).toBe("8:00 PM");
    expect(formatDay("2027-03-17")).toBe("Wed, Mar 17");
    expect(formatDay("2027-03-17", "long")).toBe("Wednesday, March 17");
    expect(zoneName(CHI, new Date("2027-03-17T14:00:00Z"))).toBe("CDT");
    expect(zoneName(CHI, new Date("2027-03-17T14:00:00Z"), "long")).toBe("Central Daylight Time");
    expect(typeof viewerZone()).toBe("string");
  });
});

describe("logic", () => {
  const a = s("a", "14:00", "15:00");
  const b = s("b", "15:00", "16:00"); // back to back with a
  const c = s("c", "14:30", "15:30", { room_id: "r2" });
  const nextDay = { ...s("d", "14:00", "15:00"), starts_at: "2027-03-18T14:00:00Z", ends_at: "2027-03-18T15:00:00Z" };

  it("lists the days with sessions and a day's sessions in order", () => {
    expect(scheduleDays([nextDay, b, a], CHI)).toEqual(["2027-03-17", "2027-03-18"]);
    expect(sessionsOnDay([nextDay, b, a, c], "2027-03-17", CHI).map((x) => x.id)).toEqual(["a", "c", "b"]);
  });

  it("overlap is strict: back-to-back is not a clash", () => {
    expect(overlaps(a, b)).toBe(false);
    expect(overlaps(a, c)).toBe(true);
    expect(overlaps(c, b)).toBe(true);
  });

  it("only the sessions I picked can conflict", () => {
    expect([...agendaConflicts([a, b, c], new Set(["a", "b"])).keys()]).toEqual([]);
    const both = agendaConflicts([a, b, c], new Set(["a", "b", "c"]));
    expect(both.get("c")!.map((x) => x.id).sort()).toEqual(["a", "b"]);
    expect(both.get("a")!.map((x) => x.id)).toEqual(["c"]);
    expect(both.has("nope")).toBe(false);
  });

  it("filters by track, room, my agenda and search (accents and case ignored, every word must match)", () => {
    const x = s("x", "14:00", "15:00", { title: "Réseaux de gènes", track_id: "t1", speakers: [{ name: "Ada Lovelace", affiliation: "Analytical Engines" }] });
    const y = s("y", "15:00", "16:00", { title: "Proteins", room_id: "r2", description: "Folding and design" });
    const all = [x, y];
    expect(filterSessions(all, { ...NO_FILTERS, track: "t1" }, new Set()).map((i) => i.id)).toEqual(["x"]);
    expect(filterSessions(all, { ...NO_FILTERS, room: "r2" }, new Set()).map((i) => i.id)).toEqual(["y"]);
    expect(filterSessions(all, { ...NO_FILTERS, mine: true }, new Set(["y"])).map((i) => i.id)).toEqual(["y"]);
    expect(filterSessions(all, { ...NO_FILTERS, text: "reseaux GENES" }, new Set()).map((i) => i.id)).toEqual(["x"]);
    expect(filterSessions(all, { ...NO_FILTERS, text: "lovelace engines" }, new Set()).map((i) => i.id)).toEqual(["x"]);
    expect(filterSessions(all, { ...NO_FILTERS, text: "folding" }, new Set()).map((i) => i.id)).toEqual(["y"]);
    expect(filterSessions(all, { ...NO_FILTERS, text: "folding lovelace" }, new Set())).toEqual([]);
    expect(filterSessions(all, NO_FILTERS, new Set())).toHaveLength(2);
  });

  it("groups by start time for the agenda list", () => {
    expect(groupByStart([b, c, a, s("e", "14:00", "14:30", { room_id: "r3" })]).map((g) => [g.at.slice(11, 16), g.sessions.map((i) => i.id)])).toEqual([
      ["14:00", ["e", "a"]], // shorter first
      ["14:30", ["c"]],
      ["15:00", ["b"]],
    ]);
  });

  it("arrow keys: up/down within a room, left/right to the overlapping session in the next room", () => {
    const list = [a, b, c, s("f", "17:00", "18:00", { room_id: "r3" })];
    const rooms = ["r1", "r2", "r3"];
    expect(neighbour(list, rooms, "a", "down")).toBe("b");
    expect(neighbour(list, rooms, "a", "up")).toBeNull();
    expect(neighbour(list, rooms, "b", "up")).toBe("a");
    expect(neighbour(list, rooms, "a", "right")).toBe("c"); // overlaps
    expect(neighbour(list, rooms, "c", "left")).toBe("a");
    expect(neighbour(list, rooms, "c", "right")).toBe("f"); // nothing overlaps: nearest start
    expect(neighbour(list, rooms, "a", "left")).toBeNull();
    expect(neighbour(list, rooms, "zzz", "down")).toBeNull();
  });
});

describe("agenda merge (3-way, so removals and adds both survive)", () => {
  it("keeps adds made elsewhere and adds made here", () => {
    expect(mergeAgenda(["a", "n"], ["a", "r"], ["a"]).sort()).toEqual(["a", "n", "r"]);
  });
  it("a removal made here isn't undone by the server's older copy", () => {
    expect(mergeAgenda([], ["a", "b"], ["a", "b"])).toEqual([]);
    expect(mergeAgenda(["b"], ["a", "b"], ["a", "b"])).toEqual(["b"]);
  });
  it("a removal made elsewhere stays removed", () => {
    expect(mergeAgenda(["a", "b"], ["b"], ["a", "b"])).toEqual(["b"]);
  });
  it("first sign-in (no base): local picks join the server's", () => {
    expect(mergeAgenda(["x"], ["y"], []).sort()).toEqual(["x", "y"]);
  });
  it("prunes sessions that are no longer published", () => {
    expect(pruneAgenda(["a", "gone"], new Set(["a"]))).toEqual(["a"]);
  });

  const mem = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) };
  };
  it("persists per org and survives missing, broken or throwing storage", () => {
    const store = mem();
    createAgendaStore("o1", store).save({ ids: ["a"], base: ["b"] });
    expect(createAgendaStore("o1", store).load()).toEqual({ ids: ["a"], base: ["b"] });
    expect(createAgendaStore("o2", store).load()).toEqual({ ids: [], base: [] });
    store.setItem("cs:agenda:o1", "{not json");
    expect(createAgendaStore("o1", store).load()).toEqual({ ids: [], base: [] });
    store.setItem("cs:agenda:o1", JSON.stringify({ ids: ["a", 7, null], base: "x" }));
    expect(createAgendaStore("o1", store).load()).toEqual({ ids: ["a"], base: [] });
    expect(createAgendaStore("o1", undefined).load()).toEqual({ ids: [], base: [] });
    const bad = { getItem: () => { throw new Error("x"); }, setItem: () => { throw new Error("x"); }, removeItem: () => undefined };
    expect(() => createAgendaStore("o1", bad).save({ ids: [], base: [] })).not.toThrow();
    expect(createAgendaStore("o1", bad).load()).toEqual({ ids: [], base: [] });
  });
});

describe("theme", () => {
  const ok = { bg: "#ffffff", fg: "#1c1917", surface: "#f5f5f4", accent: "#047857", accent_fg: "#ffffff" };
  it("turns a full palette into CSS variables", () => {
    expect(themeVars(ok)).toEqual({ "--cs-bg": "#ffffff", "--cs-fg": "#1c1917", "--cs-surface": "#f5f5f4", "--cs-accent": "#047857", "--cs-accent-fg": "#ffffff" });
  });
  it("uses nothing for no theme, a partial one, or any value that isn't #rrggbb (no injection)", () => {
    expect(themeVars({})).toEqual({});
    expect(themeVars(undefined)).toEqual({});
    expect(themeVars({ ...ok, bg: "red" })).toEqual({});
    expect(themeVars({ ...ok, accent: "#fff;background:url(x)" })).toEqual({});
  });
  it("track colours are safe too", () => {
    expect(safeColor("#1d4ed8")).toBe("#1d4ed8");
    expect(safeColor("url(javascript:1)")).toBe("#047857");
    expect(safeColor(undefined, "#000000")).toBe("#000000");
  });
});

describe("api", () => {
  const sched: Schedule = { timezone: CHI, theme: {}, rooms: [], tracks: [], sessions: [], version: "v1" };
  const reply = (status: number, body: unknown, headers: Record<string, string> = {}) =>
    vi.fn(async () => new Response(body === null ? null : JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } }));

  it("fetches the schedule and its ETag", async () => {
    const f = reply(200, sched, { ETag: '"v1"' });
    const r = await getSchedule(config, { fetch: f });
    expect(r).toEqual({ kind: "fresh", schedule: sched, etag: '"v1"' });
    expect((f.mock.calls[0] as unknown as [string])[0]).toBe("https://suite.test/api/schedule?org_id=org-1");
  });
  it("sends If-None-Match and treats a 304 as unchanged", async () => {
    const f = reply(304, null);
    expect(await getSchedule(config, { etag: '"v1"', fetch: f })).toEqual({ kind: "unchanged" });
    expect(new Headers((f.mock.calls[0] as unknown as [string, RequestInit])[1].headers).get("If-None-Match")).toBe('"v1"');
  });
  it("turns a suite refusal into a typed error, and a dead network into 'network'", async () => {
    const err = await getSchedule(config, { fetch: reply(402, { message: "This schedule isn't available", code: "plan_inactive" }) }).catch((e) => e);
    expect(err).toBeInstanceOf(SuiteError);
    expect(err.code).toBe("plan_inactive");
    const net = await getSchedule(config, { fetch: vi.fn(async () => { throw new TypeError("x"); }) }).catch((e) => e);
    expect(net.code).toBe("network");
  });
  it("reads and replaces the agenda with the Bearer token", async () => {
    const f = reply(200, { session_ids: ["a"], feed_url: "https://suite.test/api/schedule/ical?org_id=o&token=t" });
    expect((await getMyAgenda(config, "tok", f)).session_ids).toEqual(["a"]);
    expect(new Headers((f.mock.calls[0] as unknown as [string, RequestInit])[1].headers).get("Authorization")).toBe("Bearer tok");
    const g = reply(200, { session_ids: ["a", "b"], feed_url: "x" });
    await putMyAgenda(config, "tok", ["a", "b"], g);
    const [url, init] = g.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://suite.test/api/schedule/me");
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body as string)).toEqual({ org_id: "org-1", session_ids: ["a", "b"] });
  });
  it("builds the public feed url and its webcal twin", () => {
    expect(publicFeedUrl(config)).toBe("https://suite.test/api/schedule/ical?org_id=org-1");
    expect(webcalUrl(publicFeedUrl(config))).toBe("webcal://suite.test/api/schedule/ical?org_id=org-1");
  });
});
