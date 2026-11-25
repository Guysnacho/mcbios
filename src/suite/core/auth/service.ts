import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { SuiteError } from "../errors";
import type { SuiteConfig } from "../types";
import { checkEmail, linkAccount } from "./api";
import type { EmailCheck } from "./machine";
import { linkProfileSchema, resetSchema, signInSchema, signUpSchema } from "./schemas";

type Deps = {
  supabase: Pick<SupabaseClient, "auth">;
  ensureCookieDomain: () => Promise<void>;
  fetch?: typeof fetch;
};

/** `linkError` is why adding the account to this org failed; the sign-in itself still worked. */
export type SignInResult = { user: User; linkError: string | null };
export type SignUpResult = { kind: "signedIn"; user: User; linkError: string | null } | { kind: "confirmEmail" };

function firstIssue(error: { issues: { message: string }[] }): SuiteError {
  return new SuiteError(error.issues[0]?.message ?? "Check the form and try again.", "invalid_input");
}

function authError(message: string, status?: number): SuiteError {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return new SuiteError("Wrong email or password.", "invalid_credentials", status);
  if (m.includes("email not confirmed")) return new SuiteError("Confirm your email first. Check your inbox for the link.", "email_not_confirmed", status);
  if (m.includes("rate limit")) return new SuiteError("Too many requests for this email. Try again later.", "rate_limited", status);
  if (m.includes("failed to fetch") || m.includes("network") || m.includes("fetch failed"))
    return new SuiteError("We could not reach the server. Check your connection and try again.", "network", status);
  if (m.includes("already registered")) return new SuiteError("An account with this email already exists. Sign in instead.", "already_registered", status);
  return new SuiteError(message, undefined, status);
}

/** Sign-in, sign-up, reset and sign-out against Supabase + the suite. No UI, no React. */
export function createAuthService(config: SuiteConfig, deps: Deps) {
  const { supabase } = deps;

  async function signInWithPassword(email: string, password: string): Promise<{ user: User; session: Session }> {
    await deps.ensureCookieDomain();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) throw authError(error?.message ?? "Sign-in failed.", error?.status);
    return { user: data.user, session: data.session };
  }

  /** Link failures never undo a sign-in: report why and move on. */
  async function tryLink(token: string, profile?: Parameters<typeof linkAccount>[2]): Promise<string | null> {
    try {
      await linkAccount(config, token, profile, deps.fetch);
      return null;
    } catch (e) {
      if (e instanceof SuiteError && e.code === "member_limit") return "this organization has reached its member limit";
      return e instanceof SuiteError && e.message ? e.message : "an unexpected error";
    }
  }

  return {
    checkEmail: (email: string): Promise<EmailCheck> => checkEmail(config, email, deps.fetch),

    async signIn(input: { email: string; password: string; linking: boolean }): Promise<SignInResult> {
      const parsed = signInSchema.safeParse(input);
      if (!parsed.success) throw firstIssue(parsed.error);
      const { user, session } = await signInWithPassword(parsed.data.email, parsed.data.password);
      const linkError = input.linking ? await tryLink(session.access_token) : null;
      return { user, linkError };
    },

    async signUp(input: {
      email: string;
      password: string;
      fname: string;
      lname: string;
      institution: string;
      linking: boolean;
    }): Promise<SignUpResult> {
      if (input.linking) {
        // The account exists (here or in another org): sign in with its password, then link with this profile
        const creds = signInSchema.safeParse(input);
        if (!creds.success) throw firstIssue(creds.error);
        const profile = linkProfileSchema.safeParse(input);
        if (!profile.success) throw firstIssue(profile.error);
        const { user, session } = await signInWithPassword(creds.data.email, creds.data.password);
        return { kind: "signedIn", user, linkError: await tryLink(session.access_token, profile.data) };
      }

      const parsed = signUpSchema.safeParse(input);
      if (!parsed.success) throw firstIssue(parsed.error);
      await deps.ensureCookieDomain();
      const { email, password, fname, lname, institution } = parsed.data;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // handle_new_user reads these to create the member row (role is always student here)
        options: { data: { fname, lname, role: "student", institution, org_id: config.orgId } },
      });
      if (error) throw authError(error.message, error.status);
      // With email confirmation on, Supabase answers a sign-up for an existing email with a
      // user that has no identities (and sends nothing). Don't tell them to check their email.
      if (data.user && data.user.identities?.length === 0) {
        throw new SuiteError("An account with this email already exists. Sign in instead.", "already_registered");
      }
      return data.session && data.user
        ? { kind: "signedIn", user: data.user, linkError: null }
        : { kind: "confirmEmail" };
    },

    async resetPassword(email: string, redirectTo?: string): Promise<void> {
      const parsed = resetSchema.safeParse({ email });
      if (!parsed.success) throw firstIssue(parsed.error);
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, redirectTo ? { redirectTo } : undefined);
      if (error) throw authError(error.message, error.status);
    },

    /** Local scope: clears the (shared) session cookie, so every site on the domain signs out. */
    async signOut(): Promise<void> {
      await deps.ensureCookieDomain();
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw authError(error.message, error.status);
    },

    async getUser(): Promise<User | null> {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },

    /** The current access token (the Bearer the suite's API takes), or null when signed out. */
    async getAccessToken(): Promise<string | null> {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    },

    onChange(cb: (user: User | null) => void): () => void {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
      return () => data.subscription.unsubscribe();
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
