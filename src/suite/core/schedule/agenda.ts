/**
 * "My schedule" is local-first: toggling a bookmark updates this device at once and
 * works signed out. Signed in, it also syncs with the suite (`GET/PUT /api/schedule/me`)
 * so it follows the person across devices.
 *
 * Merging uses the last synced set as the base, so a removal made while signed out
 * isn't undone by the server's older copy, and an add made elsewhere isn't lost:
 *   result = (remote ∪ (local − base)) − (base − local)
 */

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export type AgendaState = { ids: string[]; /** what the server last confirmed */ base: string[] };

export function mergeAgenda(local: Iterable<string>, remote: Iterable<string>, base: Iterable<string>): string[] {
  const L = new Set(local);
  const R = new Set(remote);
  const B = new Set(base);
  const out = new Set(R);
  for (const id of L) if (!B.has(id)) out.add(id); // added here
  for (const id of B) if (!L.has(id)) out.delete(id); // removed here
  return [...out];
}

const key = (orgId: string) => `cs:agenda:${orgId}`;

export function createAgendaStore(orgId: string, store: Store | undefined) {
  return {
    load(): AgendaState {
      try {
        const raw = store?.getItem(key(orgId));
        if (!raw) return { ids: [], base: [] };
        const v = JSON.parse(raw) as Partial<AgendaState>;
        const strings = (x: unknown) => (Array.isArray(x) ? x.filter((i): i is string => typeof i === "string") : []);
        return { ids: strings(v.ids), base: strings(v.base) };
      } catch {
        return { ids: [], base: [] };
      }
    },
    save(state: AgendaState): void {
      try {
        store?.setItem(key(orgId), JSON.stringify(state));
      } catch {
        // storage unavailable or full: the agenda still works for this visit
      }
    },
  };
}

/** Keep only ids that are still on the published schedule (a session can be unpublished). */
export const pruneAgenda = (ids: Iterable<string>, known: ReadonlySet<string>) => [...ids].filter((id) => known.has(id));
