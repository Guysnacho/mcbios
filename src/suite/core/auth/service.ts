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

export type SignInResult = { user: User; /** linking to this org failed (the sign-in itself worked) */ linkFailed: boolean };
export type SignUpResult =
  | { kind: "signedIn"; user: User; linkFailed: boolean }
  | { kind: "confirmEmail" };

function firstIssue(error: { issues: { message: string }[] }): SuiteError {
  return new SuiteError(error.issues[0]?.message ?? "Check the form and try again.", "invalid_input");
}

function authError(message: string, status?: number): SuiteError {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return new SuiteError("Wrong email or password.", "invalid_credentials", status);
  if (m.includes("email not confirmed")) return new SuiteError("Confirm your email first. Check your inbox for the link.", "email_not_confirmed", status);
  if (m.includes("rate limit")) return new SuiteError("Too many requests for this email. Try again later.", "rate_limited", status);
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

  /** Link failures never undo a sign-in: report them and move on. */
  async function tryLink(token: string, profile?: Parameters<typeof linkAccount>[2]): Promise<boolean> {
    try {
      await linkAccount(config, token, profile, deps.fetch);
      return false;
    } catch {
      return true;
    }
  }

  return {
    checkEmail: (email: string): Promise<EmailCheck> => checkEmail(config, email, deps.fetch),

    async signIn(input: { email: string; password: string; linking: boolean }): Promise<SignInResult> {
      const parsed = signInSchema.safeParse(input);
      if (!parsed.success) throw firstIssue(parsed.error);
      const { user, session } = await signInWithPassword(parsed.data.email, parsed.data.password);
      const linkFailed = input.linking ? await tryLink(session.access_token) : false;
      return { user, linkFailed };
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
        return { kind: "signedIn", user, linkFailed: await tryLink(session.access_token, profile.data) };
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
      return data.session && data.user
        ? { kind: "signedIn", user: data.user, linkFailed: false }
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

    onChange(cb: (user: User | null) => void): () => void {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
      return () => data.subscription.unsubscribe();
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
