"use client";

import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { Eye, EyeOff, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { fieldErrors, linkProfileSchema, resetSchema, signInSchema, signUpSchema } from "../core/auth/schemas";
import type { Mode } from "../core/auth/machine";
import { useAuth } from "../react/AuthProvider";
import { ui } from "./classes";

const TITLES: Record<Mode, string> = {
  signin: "Sign in",
  signup: "Create your account",
  reset: "Reset your password",
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; className: string }) => React.ReactNode;
}) {
  const errId = `${id}-error`;
  return (
    <div className={ui.field}>
      <label htmlFor={id} className={ui.label}>
        {label}
      </label>
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": error ? errId : undefined,
        className: `${ui.input} ${error ? ui.inputInvalid : ""}`,
      })}
      {error && (
        <p id={errId} className={ui.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordField({
  id,
  label,
  error,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: "current-password" | "new-password";
}) {
  const [shown, setShown] = useState(false);
  return (
    <Field id={id} label={label} error={error}>
      {(p) => (
        <div className="relative">
          <input
            {...p}
            className={`${p.className} pr-12`}
            type={shown ? "text" : "password"}
            autoComplete={autoComplete}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle absolute right-1.5 top-1/2 -translate-y-1/2"
            aria-label={shown ? "Hide password" : "Show password"}
            aria-pressed={shown}
            onClick={() => setShown((s) => !s)}
          >
            {shown ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
      )}
    </Field>
  );
}

/** The form body. Mounted fresh each time the dialog opens, so it never shows the last person's details. */
function AuthForm() {
  const auth = useAuth();
  const { state } = auth;
  const base = useId();
  const [email, setEmail] = useState(state.email);
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLFormElement>(null);

  // Move focus to the first field of the new step (the dialog itself only focuses on open)
  useEffect(() => {
    if (!state.open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("input");
    first?.focus();
  }, [state.open, state.mode, state.step]);

  const busy = state.status.kind === "busy";
  const id = (n: string) => `${base}-${n}`;
  const needsProfile = state.mode === "signup" && state.step === 1;
  const status = state.status;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (state.mode === "reset") {
      const errs = fieldErrors(resetSchema, { email });
      setErrors(errs ?? {});
      if (!errs) await auth.reset(email.trim());
      return;
    }

    if (state.step === 0) {
      const errs = fieldErrors(signInSchema.pick({ email: true }), { email });
      setErrors(errs ?? {});
      if (!errs) await auth.checkEmail(email.trim());
      return;
    }

    if (state.mode === "signin") {
      const errs = fieldErrors(signInSchema, { email, password });
      setErrors(errs ?? {});
      if (!errs) await auth.signIn({ email: email.trim(), password });
      return;
    }

    // Sign up: a brand-new account needs a new password; linking an existing one needs only its password
    const schema = state.linking ? signInSchema.extend(linkProfileSchema.shape) : signUpSchema;
    const values = { email, password, fname, lname, institution };
    const errs = fieldErrors(schema, values);
    setErrors(errs ?? {});
    if (!errs) await auth.signUp({ ...values, email: email.trim() });
  }

  const submitLabel =
    state.mode === "reset"
      ? "Send reset link"
      : state.step === 0
        ? "Continue"
        : state.mode === "signin"
          ? "Sign in"
          : state.linking
            ? "Link my account"
            : "Create account";

  return (
    <form ref={panelRef} onSubmit={submit} noValidate className="mt-5 flex flex-col gap-4">
              {(state.mode === "reset" || state.step === 0) && (
                <Field id={id("email")} label="Email" error={errors.email}>
                  {(p) => (
                    <input
                      {...p}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                </Field>
              )}

              {needsProfile && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field id={id("fname")} label="Given name" error={errors.fname}>
                      {(p) => <input {...p} autoComplete="given-name" value={fname} onChange={(e) => setFname(e.target.value)} />}
                    </Field>
                    <Field id={id("lname")} label="Family name" error={errors.lname}>
                      {(p) => <input {...p} autoComplete="family-name" value={lname} onChange={(e) => setLname(e.target.value)} />}
                    </Field>
                  </div>
                  <Field id={id("institution")} label="Institution" error={errors.institution}>
                    {(p) => <input {...p} autoComplete="organization" value={institution} onChange={(e) => setInstitution(e.target.value)} />}
                  </Field>
                </>
              )}

              {state.mode !== "reset" && state.step === 1 && (
                <PasswordField
                  id={id("password")}
                  label={state.mode === "signup" && !state.linking ? "Choose a password" : "Password"}
                  error={errors.password}
                  value={password}
                  onChange={setPassword}
                  autoComplete={state.mode === "signup" && !state.linking ? "new-password" : "current-password"}
                />
              )}

              <div aria-live="polite" role="status">
                {status.kind === "info" && <p className={ui.statusInfo}>{status.message}</p>}
              </div>
              {status.kind === "error" && (
                <p role="alert" className={ui.statusError}>
                  {status.message}
                </p>
              )}

              <button type="submit" className={ui.primary} disabled={busy}>
                {busy ? <span className="loading loading-spinner loading-sm" aria-hidden /> : null}
                {busy ? "Working…" : submitLabel}
              </button>

              <div className="flex flex-col items-start gap-2">
                {state.mode !== "reset" && state.step === 1 && (
                  <button type="button" className={ui.link} onClick={auth.back}>
                    Use a different email
                  </button>
                )}
                {state.mode === "signin" && (
                  <>
                    <button type="button" className={ui.link} onClick={() => auth.setMode("reset")}>
                      Forgot your password?
                    </button>
                    <button type="button" className={ui.link} onClick={() => auth.setMode("signup")}>
                      New here? Create an account
                    </button>
                  </>
                )}
                {state.mode !== "signin" && (
                  <button type="button" className={ui.link} onClick={() => auth.setMode("signin")}>
                    Already have an account? Sign in
                  </button>
                )}
              </div>
            </form>
  );
}

/** Sign in, sign up and password reset in one accessible dialog. Open it with `useAuth().open()`. */
export function AuthDialog() {
  const auth = useAuth();
  const { state } = auth;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Root
      open={state.open}
      onOpenChange={(d) => (d.open ? auth.open(state.mode) : auth.close())}
      lazyMount
      unmountOnExit
      finalFocusEl={auth.returnFocusEl}
      // Start in the first field (Ark's default is the dialog itself)
      initialFocusEl={() => contentRef.current?.querySelector<HTMLElement>("input") ?? null}
    >
      <Portal>
        <Dialog.Backdrop className={ui.backdrop} />
        <Dialog.Positioner className={ui.positioner}>
          <Dialog.Content ref={contentRef} className={`${ui.panel} relative`}>
            <Dialog.CloseTrigger className={ui.closeButton} aria-label="Close">
              <X className="size-4" aria-hidden />
            </Dialog.CloseTrigger>

            <Dialog.Title className={ui.title}>{TITLES[state.mode]}</Dialog.Title>
            <Dialog.Description className={ui.description}>
              {state.mode === "reset"
                ? "Enter your email and we will send a link to choose a new password."
                : state.step === 0
                  ? "Use the email you registered or submitted with."
                  : state.email}
            </Dialog.Description>

            <AuthForm />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
