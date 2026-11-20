/**
 * The sign-in / sign-up / reset dialog as a pure state machine (no React, no
 * network). `reduce` is the whole decision table; the host performs the effects
 * (fetching, signing in) and feeds results back in as events.
 */

export type Mode = "signin" | "signup" | "reset";

/** What `GET /api/auth/[org_id]?email=` told us. */
export type EmailCheck =
  | { kind: "registered" } // 200 { authed: true }: full account in this org
  | { kind: "guest" } // 200 { authed: false }: guest row (submitted a form), no account yet
  | { kind: "not_found" } // 404
  | { kind: "other_org" } // 406: account exists in another org
  | { kind: "rate_limited" } // 429
  | { kind: "error" }; // anything else, or the network

export type Status =
  | { kind: "idle" }
  | { kind: "busy" }
  | { kind: "info"; message: string }
  | { kind: "error"; message: string };

export type AuthState = {
  open: boolean;
  mode: Mode;
  /** 0: ask for the email. 1: ask for the password (and profile when signing up). */
  step: 0 | 1;
  email: string;
  /** The account lives in another org: sign in with its password, then link it to this org. */
  linking: boolean;
  /** Ask for name and institution: a brand-new account, or linking one from another org. */
  needsProfile: boolean;
  status: Status;
};

export type AuthEvent =
  | { type: "open"; mode?: Mode }
  | { type: "close" }
  | { type: "setMode"; mode: Mode }
  | { type: "back" }
  | { type: "emailChecking"; email: string }
  | { type: "emailChecked"; check: EmailCheck }
  | { type: "busy" }
  | { type: "failed"; message: string }
  | { type: "done" };

export const initialAuthState: AuthState = {
  open: false,
  mode: "signin",
  step: 0,
  email: "",
  linking: false,
  needsProfile: false,
  status: { kind: "idle" },
};

const idle: Status = { kind: "idle" };

/** What the email check decides: where to go next, and which form to show. */
export type EmailDecision = {
  mode: Mode;
  step: 0 | 1;
  linking: boolean;
  needsProfile: boolean;
  status: Status;
};

/**
 * The email-check decision table. Differs from the original AuthModal in one
 * case: signing up with an email that already has an account here switches to
 * sign-in (password only) instead of showing the full sign-up form, since the
 * member row already exists and the profile would be thrown away.
 */
export function decideEmailCheck(mode: Mode, check: EmailCheck): EmailDecision {
  const stay = (status: Status): EmailDecision => ({ mode, step: 0, linking: false, needsProfile: false, status });
  switch (check.kind) {
    case "registered":
      return {
        mode: "signin",
        step: 1,
        linking: false,
        needsProfile: false,
        status: {
          kind: "info",
          message:
            mode === "signup"
              ? "You already have an account, so there is nothing to create. Enter your password to sign in."
              : "Email verified. Enter your password to continue.",
        },
      };
    case "guest":
    case "not_found":
      return mode === "signup"
        ? {
            mode,
            step: 1,
            linking: false,
            needsProfile: true,
            status: { kind: "info", message: "Email available. Complete the sign-up form." },
          }
        : stay({ kind: "error", message: "This email is not registered. Sign up first." });
    case "other_org":
      return {
        mode,
        step: 1,
        linking: true,
        // Linking creates this org's member row, which needs a name and institution
        needsProfile: mode === "signup",
        status: {
          kind: "info",
          message:
            mode === "signup"
              ? "This email has a Conference Suite account with another organization. Add your details here and we will link it."
              : "This email has a Conference Suite account with another organization. Sign in with the same password to link it.",
        },
      };
    case "rate_limited":
      return stay({ kind: "error", message: "Too many attempts. Wait a minute and try again." });
    case "error":
      return stay({ kind: "error", message: "We could not check that email. Try again." });
  }
}

export function reduce(state: AuthState, event: AuthEvent): AuthState {
  switch (event.type) {
    case "open":
      return { ...initialAuthState, open: true, mode: event.mode ?? "signin" };
    case "close":
      return { ...initialAuthState };
    case "setMode":
      // Switching mode keeps the typed email but restarts the flow
      return { ...initialAuthState, open: state.open, mode: event.mode, email: state.email };
    case "back":
      return { ...state, step: 0, linking: false, needsProfile: false, status: idle };
    case "emailChecking":
      return { ...state, email: event.email, status: { kind: "busy" } };
    case "emailChecked":
      return { ...state, ...decideEmailCheck(state.mode, event.check) };
    case "busy":
      return { ...state, status: { kind: "busy" } };
    case "failed":
      return { ...state, status: { kind: "error", message: event.message } };
    case "done":
      return { ...initialAuthState };
  }
}
