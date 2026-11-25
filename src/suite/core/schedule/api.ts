import { SuiteError, toSuiteError } from "../errors";
import type { SuiteConfig } from "../types";
import type { Schedule } from "./types";

type Fetch = typeof fetch;

export type ScheduleFetch = { kind: "fresh"; schedule: Schedule; etag: string | null } | { kind: "unchanged" };

/**
 * `GET /api/schedule?org_id`: the public schedule. Pass the ETag you last got and an
 * unchanged schedule comes back as a cheap 304 (`unchanged`), so polling is nearly free.
 */
export async function getSchedule(config: SuiteConfig, opts: { etag?: string | null; fetch?: Fetch } = {}): Promise<ScheduleFetch> {
  let res: Response;
  try {
    res = await (opts.fetch ?? fetch)(`${config.suiteUrl}/api/schedule?org_id=${config.orgId}`, {
      headers: opts.etag ? { "If-None-Match": opts.etag } : undefined,
    });
  } catch {
    throw new SuiteError("We could not reach the server.", "network");
  }
  if (res.status === 304) return { kind: "unchanged" };
  if (!res.ok) throw await toSuiteError(res);
  return { kind: "fresh", schedule: (await res.json()) as Schedule, etag: res.headers.get("ETag") };
}

export type MyAgenda = { session_ids: string[]; feed_url: string };

async function agendaCall(config: SuiteConfig, token: string, init: { method: "GET" | "PUT"; ids?: string[] }, doFetch?: Fetch): Promise<MyAgenda> {
  let res: Response;
  try {
    res = await (doFetch ?? fetch)(
      init.method === "GET" ? `${config.suiteUrl}/api/schedule/me?org_id=${config.orgId}` : `${config.suiteUrl}/api/schedule/me`,
      {
        method: init.method,
        headers: { Authorization: `Bearer ${token}`, ...(init.method === "PUT" ? { "Content-Type": "application/json" } : {}) },
        body: init.method === "PUT" ? JSON.stringify({ org_id: config.orgId, session_ids: init.ids ?? [] }) : undefined,
      },
    );
  } catch {
    throw new SuiteError("We could not reach the server.", "network");
  }
  if (!res.ok) throw await toSuiteError(res);
  return (await res.json()) as MyAgenda;
}

/** The signed-in member's agenda and their personal iCal feed link. */
export const getMyAgenda = (config: SuiteConfig, token: string, doFetch?: Fetch) => agendaCall(config, token, { method: "GET" }, doFetch);

/** Replace the agenda (the suite ignores ids that aren't published sessions). Returns what it now holds. */
export const putMyAgenda = (config: SuiteConfig, token: string, ids: string[], doFetch?: Fetch) => agendaCall(config, token, { method: "PUT", ids }, doFetch);

/** A subscribable feed of every published session (no sign-in). */
export const publicFeedUrl = (config: SuiteConfig) => `${config.suiteUrl}/api/schedule/ical?org_id=${config.orgId}`;

/** The same URL for calendar apps that want the webcal scheme. */
export const webcalUrl = (httpsUrl: string) => httpsUrl.replace(/^https?:/, "webcal:");
