"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFormCheckout, getCheckoutStatus, getRegistrationForm, getRegistrationProducts, submitRegistration } from "../core/registration/api";
import { createDraftStore } from "../core/registration/draft";
import { registrationMessage } from "../core/registration/errors";
import { getMembership, getProfile } from "../core/registration/member";
import { type RegistrationState, priceOptions, registrationState } from "../core/registration/options";
import type { Details, Membership, PriceOption, RegistrationFormSchema, RegistrationProducts } from "../core/registration/types";
import type { SuiteConfig } from "../core/types";
import { useAuth } from "./AuthProvider";
import { useStableConfig } from "./useStableConfig";

export type RegistrationData = {
  products: RegistrationProducts;
  options: PriceOption[];
  state: RegistrationState;
  form: RegistrationFormSchema | null;
};

export type RegistrationLoad =
  | { status: "loading" }
  | { status: "error"; message: string }
  | ({ status: "ready" } & RegistrationData);

/** Registration actions for the current person: Bearer when signed in, guest otherwise. */
export function useRegistrationActions(rawConfig: SuiteConfig) {
  const config = useStableConfig(rawConfig);
  const auth = useAuth();
  // The auth api object changes with every auth state change; keep the actions stable
  const tokenRef = useRef(auth.accessToken);
  useEffect(() => {
    tokenRef.current = auth.accessToken;
  });
  const drafts = useMemo(
    () => createDraftStore(typeof window === "undefined" ? undefined : window.localStorage),
    [],
  );
  return useMemo(
    () => ({
      drafts,
      async checkout(input: { formId: string; fieldId: string; priceId: string; details: Details; returnUrl: string }) {
        const token = await tokenRef.current();
        return createFormCheckout(config, { ...input, isPublic: true }, { token });
      },
      async submit(input: { formId: string; data: { id: string; title: string; value: unknown }[]; details?: Details }) {
        const token = await tokenRef.current();
        return submitRegistration(config, { formId: input.formId, data: input.data, guest: input.details }, { token });
      },
      status: (sessionId: string) => getCheckoutStatus(config, sessionId),
    }),
    [config, drafts],
  );
}

/**
 * Everything the registration screen needs: prices and the window (from the suite),
 * the form's fields, and, once signed in, the person's profile and membership.
 * `formId` comes from config; without it there is nothing to render.
 */
export function useRegistration(rawConfig: SuiteConfig) {
  const config = useStableConfig(rawConfig);
  const auth = useAuth();
  const { user, ready } = auth;
  const supabaseRef = useRef(auth.supabase);
  useEffect(() => {
    supabaseRef.current = auth.supabase;
  });
  const [load, setLoad] = useState<RegistrationLoad>({ status: "loading" });
  const [member, setMember] = useState<{ userId: string; profile: Partial<Details> | null; membership: Membership | null } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const formId = config.registrationFormId;

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoad({ status: "loading" });
      try {
        const products = await getRegistrationProducts(config);
        const options = priceOptions(products.products);
        const state = registrationState(products, options);
        // The form is public; skip fetching it when registration can't happen anyway
        const form = formId && state.kind === "open" ? await getRegistrationForm(config, formId) : null;
        if (alive) setLoad({ status: "ready", products, options, state, form });
      } catch (e) {
        if (alive) setLoad({ status: "error", message: registrationMessage(e) });
      }
    })();
    return () => {
      alive = false;
    };
  }, [config, formId, attempt]);

  // Members: prefill and "already registered", both read from the suite's database
  const userId = user?.id;
  const userEmail = user?.email ?? "";
  useEffect(() => {
    if (!ready || !userId) return;
    let alive = true;
    const db = supabaseRef.current();
    Promise.all([getProfile(db, config.orgId, userId, userEmail), getMembership(db, config.orgId)]).then(([profile, membership]) => {
      if (alive) setMember({ userId, profile, membership });
    });
    return () => {
      alive = false;
    };
  }, [ready, userId, userEmail, config.orgId]);
  // Only this user's data counts (a sign-out or switch hides the previous person's)
  const mine = userId && member?.userId === userId ? member : null;
  const profile = mine?.profile ?? null;
  const membership = mine?.membership ?? null;

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const actions = useRegistrationActions(config);

  return { load, retry, auth: { user, ready }, profile, membership, actions };
}

/** Just the state of registration (for buttons and badges elsewhere on the site). */
export function useRegistrationState(rawConfig: SuiteConfig): RegistrationState | null {
  const config = useStableConfig(rawConfig);
  const [state, setState] = useState<RegistrationState | null>(null);
  useEffect(() => {
    let alive = true;
    getRegistrationProducts(config)
      .then((p) => alive && setState(registrationState(p, priceOptions(p.products))))
      .catch(() => alive && setState({ kind: "unavailable" }));
    return () => {
      alive = false;
    };
  }, [config]);
  return state;
}
