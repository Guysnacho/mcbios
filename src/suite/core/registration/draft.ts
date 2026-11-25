import type { Details, FieldValue } from "./types";

export type Draft = {
  details: Details;
  values: Record<string, FieldValue>;
  priceId: string;
  savedAt: number;
};

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const key = (formId: string) => `cs:registration:${formId}`;
/** A draft older than this is dropped (a checkout never takes this long). */
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * The answers survive the trip to Stripe and back (the return page submits them).
 * Storage can be missing or throw (private windows), so every access is guarded.
 */
export function createDraftStore(store: Store | undefined) {
  return {
    save(formId: string, draft: Omit<Draft, "savedAt">, now = Date.now()): void {
      try {
        store?.setItem(key(formId), JSON.stringify({ ...draft, savedAt: now }));
      } catch {
        // best effort
      }
    },
    load(formId: string, now = Date.now()): Draft | null {
      try {
        const raw = store?.getItem(key(formId));
        if (!raw) return null;
        const draft = JSON.parse(raw) as Draft;
        if (!draft || typeof draft.savedAt !== "number" || now - draft.savedAt > MAX_AGE_MS) return null;
        return draft;
      } catch {
        return null;
      }
    },
    clear(formId: string): void {
      try {
        store?.removeItem(key(formId));
      } catch {
        // best effort
      }
    },
  };
}
