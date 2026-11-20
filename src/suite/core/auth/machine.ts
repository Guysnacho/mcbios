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
  /** The account lives in another org (or already exists here): sign in, then link it. */
  linking: boolean;
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
  status: { kind: "idle" },
};

const idle: Status = { kind: "idle" };

/** The email-check decision table (mirrors the original AuthModal). */
export function decideEmailCheck(
  mode: Mode,
  check: EmailCheck,
): { step: 0 | 1; linking: boolean; status: Status } {
  switch (check.kind) {
    case "registered":
      return {
        step: 1,
        // Signing up with an email that already has an account: sign in instead, then link
        linking: mode === "signup",
        status: {
          kind: "info",
          message:
            mode === "signup"
              ? "Account found. Enter your password to continue."
              : "Email verified. Enter your password to continue.",
        },
      };
    case "guest":
    case "not_found":
      return mode === "signup"
        ? {
            step: 1,
            linking: false,
            status: { kind: "info", message: "Email available. Complete the sign-up form." },
          }
        : {
            step: 0,
            linking: false,
            status: { kind: "error", message: "This email is not registered. Sign up first." },
          };
    case "other_org":
      return {
        step: 1,
        linking: true,
        status: {
          kind: "info",
          message:
            mode === "signup"
              ? "This email has a Conference Suite account with another organization. Create your profile here and we will link it."
              : "This email has a Conference Suite account with another organization. Sign in with the same password to link it.",
        },
      };
    case "rate_limited":
      return {
        step: 0,
        linking: false,
        status: { kind: "error", message: "Too many attempts. Wait a minute and try again." },
      };
    case "error":
      return {
        step: 0,
        linking: false,
        status: { kind: "error", message: "We could not check that email. Try again." },
      };
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
      return { ...state, step: 0, linking: false, status: idle };
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
