"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createAgendaStore, mergeAgenda, pruneAgenda } from "../core/schedule/agenda";
import { getMyAgenda, putMyAgenda } from "../core/schedule/api";
import type { Schedule } from "../core/schedule/types";
import type { SuiteConfig } from "../core/types";
import { useAuth } from "./AuthProvider";
import { useStableConfig } from "./useStableConfig";

export type SyncState = "local" | "syncing" | "synced" | "failed";

const SAVE_DELAY_MS = 600;

/**
 * "My schedule": local-first (works signed out, updates instantly) and, signed in, synced with
 * the suite. On sign-in it merges this device's picks with the account's (3-way, so removals
 * and adds both survive), then pushes changes a moment after each toggle.
 */
export function useAgenda(rawConfig: SuiteConfig, schedule: Schedule | null) {
  const config = useStableConfig(rawConfig);
  const auth = useAuth();
  const store = useMemo(() => createAgendaStore(config.orgId, typeof window === "undefined" ? undefined : window.localStorage), [config.orgId]);
  const [ids, setIds] = useState<string[]>([]);
  const [feedUrl, setFeedUrl] = useState<string | null>(null);
  const [sync, setSync] = useState<SyncState>("local");
  const base = useRef<string[]>([]);
  const idsRef = useRef<string[]>([]);
  const timer = useRef<number | null>(null);
  const tokenRef = useRef(auth.accessToken);
  useEffect(() => {
    tokenRef.current = auth.accessToken;
  });
  const userId = auth.user?.id ?? null;

  const known = useMemo(() => (schedule ? new Set(schedule.sessions.map((s) => s.id)) : null), [schedule]);

  const commit = useCallback(
    (next: string[], nextBase = base.current) => {
      idsRef.current = next;
      base.current = nextBase;
      setIds(next);
      store.save({ ids: next, base: nextBase });
    },
    [store],
  );

  // Load what this device has
  useEffect(() => {
    const s = store.load();
    idsRef.current = s.ids;
    base.current = s.base;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after mount (SSR-safe)
    setIds(s.ids);
  }, [store]);

  // Drop sessions that are no longer published
  useEffect(() => {
    if (!known) return;
    const kept = pruneAgenda(idsRef.current, known);
    if (kept.length !== idsRef.current.length) commit(kept);
  }, [known, commit]);

  const push = useCallback(async () => {
    const token = await tokenRef.current();
    if (!token) return setSync("local");
    setSync("syncing");
    try {
      const saved = await putMyAgenda(config, token, idsRef.current);
      commit(idsRef.current, saved.session_ids);
      setFeedUrl(saved.feed_url);
      setSync("synced");
    } catch {
      setSync("failed");
    }
  }, [config, commit]);

  // Signed in: pull the account's agenda, merge, push what's new
  useEffect(() => {
    if (!userId || !known) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- signed out: local only
      setSync("local");
      setFeedUrl(null);
      return;
    }
    let alive = true;
    (async () => {
      const token = await tokenRef.current();
      if (!token) return;
      setSync("syncing");
      try {
        const remote = await getMyAgenda(config, token);
        if (!alive) return;
        const merged = pruneAgenda(mergeAgenda(idsRef.current, remote.session_ids, base.current), known);
        commit(merged, remote.session_ids);
        setFeedUrl(remote.feed_url);
        const same = merged.length === remote.session_ids.length && merged.every((i) => remote.session_ids.includes(i));
        if (same) return setSync("synced");
        await push();
      } catch {
        if (alive) setSync("failed");
      }
    })();
    return () => {
      alive = false;
    };
  }, [userId, known, config, commit, push]);

  const toggle = useCallback(
    (id: string) => {
      const next = idsRef.current.includes(id) ? idsRef.current.filter((i) => i !== id) : [...idsRef.current, id];
      commit(next);
      if (!userId) return;
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => void push(), SAVE_DELAY_MS);
    },
    [commit, push, userId],
  );

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const set = useMemo(() => new Set(ids), [ids]);
  return { ids: set, toggle, sync, feedUrl, signedIn: !!userId, retrySync: push };
}
