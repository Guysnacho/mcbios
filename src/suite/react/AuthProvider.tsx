"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { createSuiteSession } from "../core/auth/session";
import { type AuthService, createAuthService } from "../core/auth/service";
import { type AuthState, type Mode, initialAuthState, reduce } from "../core/auth/machine";
import { SuiteError } from "../core/errors";
import type { SuiteConfig } from "../core/types";

export type AuthApi = {
  state: AuthState;
  /** The signed-in user, or null. Only meaningful once `ready`. */
  user: User | null;
  /** False until the session has been read on the client (avoids a signed-out flash). */
  ready: boolean;
  /** A message to announce after the dialog closes ("Welcome back", "Check your email"). */
  notice: string | null;
  dismissNotice: () => void;
  /** Where focus goes when the dialog closes: whatever opened it. */
  returnFocusEl: () => HTMLElement | null;
  open: (mode?: Mode) => void;
  close: () => void;
  setMode: (mode: Mode) => void;
  back: () => void;
  checkEmail: (email: string) => Promise<void>;
  signIn: (v: { email: string; password: string }) => Promise<void>;
  signUp: (v: { email: string; password: string; fname: string; lname: string; institution: string }) => Promise<void>;
  reset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({
  config,
  onSignedIn,
  children,
}: {
  config: SuiteConfig;
  /** Called after a successful sign-in or sign-up that returned a session. */
  onSignedIn?: (user: User) => void;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reduce, initialAuthState);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  // Created on first use (an effect or a click), so it never runs during server rendering
  const sessionRef = useRef<{ svc: AuthService; ensureCookieDomain: () => Promise<void> } | null>(null);
  const getSession = useCallback(() => {
    if (!sessionRef.current) {
      const session = createSuiteSession(config);
      sessionRef.current = { svc: createAuthService(config, session), ensureCookieDomain: session.ensureCookieDomain };
    }
    return sessionRef.current;
  }, [config]);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const onSignedInRef = useRef(onSignedIn);
  useEffect(() => {
    onSignedInRef.current = onSignedIn;
  });

  // Client only: the Supabase browser client needs the browser (and the env on the page).
  useEffect(() => {
    const { svc, ensureCookieDomain } = getSession();
    let alive = true;
    svc.getUser().then((u) => {
      if (alive) {
        setUser(u);
        setReady(true);
      }
    });
    const off = svc.onChange((u) => alive && setUser(u));
    // Resolve the shared cookie domain early so the first sign-in already has it
    void ensureCookieDomain();
    return () => {
      alive = false;
      off();
    };
  }, [getSession]);

  const run = useCallback(
    async (fn: (svc: AuthService) => Promise<void>) => {
      dispatch({ type: "busy" });
      try {
        await fn(getSession().svc);
      } catch (e) {
        dispatch({ type: "failed", message: e instanceof SuiteError ? e.message : "Something went wrong. Try again." });
      }
    },
    [getSession],
  );

  const api = useMemo<AuthApi>(
    () => ({
      state,
      user,
      ready,
      notice,
      dismissNotice: () => setNotice(null),
      returnFocusEl: () => (returnFocusRef.current?.isConnected ? returnFocusRef.current : null),
      open: (mode) => {
        returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dispatch({ type: "open", mode });
      },
      close: () => dispatch({ type: "close" }),
      setMode: (mode) => dispatch({ type: "setMode", mode }),
      back: () => dispatch({ type: "back" }),

      checkEmail: async (email) => {
        dispatch({ type: "emailChecking", email });
        dispatch({ type: "emailChecked", check: await getSession().svc.checkEmail(email) });
      },

      signIn: ({ email, password }) =>
        run(async (svc) => {
          const { user: u, linkError } = await svc.signIn({ email, password, linking: state.linking });
          dispatch({ type: "done" });
          setNotice(linkError ? `Signed in, but we could not add your account to this organization: ${linkError}.` : "Welcome back!");
          onSignedInRef.current?.(u);
        }),

      signUp: (v) =>
        run(async (svc) => {
          const res = await svc.signUp({ ...v, linking: state.linking });
          dispatch({ type: "done" });
          if (res.kind === "confirmEmail") {
            setNotice("Check your email and open the confirmation link, then come back and sign in.");
          } else {
            setNotice(res.linkError ? `Welcome! We could not add your account to this organization: ${res.linkError}.` : "Welcome!");
            onSignedInRef.current?.(res.user);
          }
        }),

      reset: (email) =>
        run(async (svc) => {
          // No redirectTo: the suite's email function decides where the link goes (the Conference Suite reset page)
          await svc.resetPassword(email);
          dispatch({ type: "done" });
          setNotice("If an account exists for that email, a reset link is on its way. It opens Conference Suite, where you choose a new password; then sign in here again.");
        }),

      signOut: async () => {
        await getSession().svc.signOut();
        setUser(null);
        setNotice("You are signed out.");
      },
    }),
    [state, user, ready, notice, getSession, run],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
