"use client";

import { RadioGroup } from "@ark-ui/react/radio-group";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { checkEmail } from "../core/auth/api";
import { registrationMessage } from "../core/registration/errors";
import { formatDay, roleLabel } from "../core/registration/options";
import type { Details, FieldValue, FormField, PriceOption, RegistrationRole } from "../core/registration/types";
import { REGISTRATION_ROLES } from "../core/registration/types";
import { type Errors, isAskable, isEmail, validateDetails, validateValues } from "../core/registration/validation";
import type { SuiteConfig } from "../core/types";
import { useAuth } from "../react/AuthProvider";
import { type RegistrationData, useRegistration } from "../react/useRegistration";
import { ui } from "./classes";
import { CheckoutMount } from "./CheckoutMount";
import { FieldInput } from "./fields";

const EMPTY: Details = { fname: "", lname: "", email: "", institution: "", role: "" };

type EmailHint = "account" | null;

function Notice({ tone, title, children }: { tone: "info" | "error"; title: string; children?: React.ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={tone === "error" ? ui.statusError : ui.statusInfo}>
      <div>
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  );
}

/**
 * The registration form, rendered natively from the suite's `registration` form:
 * your details and the form's questions, then a price, then Stripe's embedded
 * checkout. Whether registration is open, full or already done for you is decided by
 * the suite (database guards); this only shows it.
 *
 * `returnPath` is where Stripe sends people back (a page rendering <PaymentStatus />).
 */
export function RegistrationForm({ config, returnPath = "/register/status" }: { config: SuiteConfig; returnPath?: string }) {
  const reg = useRegistration(config);
  const { load } = reg;

  if (!config.registrationFormId) {
    return <Notice tone="info" title="Registration is not set up yet" />;
  }
  if (load.status === "loading") {
    return (
      <p role="status" aria-live="polite" className="text-center">
        <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />
        Loading registration…
      </p>
    );
  }
  if (load.status === "error") {
    return (
      <Notice tone="error" title="We couldn't load registration">
        <p>{load.message}</p>
        <button type="button" className="btn btn-sm mt-2" onClick={reg.retry}>
          Try again
        </button>
      </Notice>
    );
  }

  const { state } = load;
  if (state.kind === "opens_soon") {
    return (
      <Notice tone="info" title={state.startDate ? `Registration opens ${formatDay(state.startDate)}` : "Registration opens soon"}>
        <p>Check back then. Your answers aren&apos;t needed until it opens.</p>
      </Notice>
    );
  }
  if (state.kind === "closed") return <Notice tone="info" title="Registration is closed" />;
  if (state.kind === "unavailable") {
    return (
      <Notice tone="info" title="Registration isn't available right now">
        <p>Please check back soon.</p>
      </Notice>
    );
  }

  if (reg.membership?.paid_this_cycle) {
    return (
      <Notice tone="info" title="You're registered">
        <p>
          We have your registration as a {reg.membership.role} attendee. There is nothing more to do; see you at the conference.
        </p>
      </Notice>
    );
  }
  if (!load.form || !load.form.schema?.some((f) => f.type === "payment")) {
    return (
      <Notice tone="info" title="Registration isn't available right now">
        <p>The registration form is being set up. Please check back soon.</p>
      </Notice>
    );
  }

  return <Flow config={config} returnPath={returnPath} data={load} formId={load.form.id} fields={load.form.schema} reg={reg} />;
}

function Flow({
  config,
  returnPath,
  data,
  formId,
  fields,
  reg,
}: {
  config: SuiteConfig;
  returnPath: string;
  data: Extract<ReturnType<typeof useRegistration>["load"], { status: "ready" }> & RegistrationData;
  formId: string;
  fields: FormField[];
  reg: ReturnType<typeof useRegistration>;
}) {
  const auth = useAuth();
  const signedIn = !!reg.auth.user;
  const paymentField = fields.find((f) => f.type === "payment")!;
  const askable = useMemo(() => fields.filter(isAskable), [fields]);

  const [step, setStep] = useState<"details" | "payment">("details");
  // A draft is what a person left when they went to Stripe and came back (client only: this mounts after load)
  const [draft] = useState(() => reg.actions.drafts.load(formId));
  const [edits, setEdits] = useState<Partial<Details>>({});
  const [values, setValues] = useState<Record<string, FieldValue>>(() => draft?.values ?? {});
  const [errors, setErrors] = useState<{ details: Errors; values: Errors }>({ details: {}, values: {} });
  const [priceId, setPriceId] = useState(() => draft?.priceId ?? "");
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [emailHint, setEmailHint] = useState<EmailHint>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // What the form shows: the draft, filled in from the member's profile where empty, then whatever they typed
  const profile = reg.profile;
  const details = useMemo<Details>(() => {
    const base = { ...EMPTY, ...draft?.details };
    if (profile) {
      base.fname ||= profile.fname ?? "";
      base.lname ||= profile.lname ?? "";
      base.institution ||= profile.institution ?? "";
      base.role ||= profile.role ?? "";
      base.email = profile.email || base.email;
    }
    return { ...base, ...edits };
  }, [draft, profile, edits]);

  // Move focus to the new step's heading so keyboard and screen-reader users land on it
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const options: PriceOption[] = useMemo(() => data.options.filter((o) => o.role === details.role), [data.options, details.role]);
  const chosen = options.find((o) => o.priceId === priceId) ?? options[0];
  const roles = REGISTRATION_ROLES.filter((r) => data.options.some((o) => o.role === r));
  const stripeAccount = data.products.stripeAccount;
  const publishableKey = data.products.publishableKey;

  const setDetail = (k: keyof Details) => (v: string) => setEdits((e) => ({ ...e, [k]: v }));

  async function lookupEmail() {
    if (signedIn || !isEmail(details.email)) return setEmailHint(null);
    const res = await checkEmail(config, details.email.trim());
    setEmailHint(res.kind === "registered" || res.kind === "other_org" ? "account" : null);
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    const found = { details: validateDetails(details), values: validateValues(askable, values) };
    setErrors(found);
    const messages = [...Object.values(found.details), ...Object.values(found.values)];
    if (messages.length > 0) {
      // Move focus to the summary, which lists what to fix
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setFailure(null);
    setStep("payment");
  }

  async function pay() {
    if (!chosen) return;
    setBusy(true);
    setFailure(null);
    try {
      reg.actions.drafts.save(formId, { details, values, priceId: chosen.priceId });
      const { clientSecret: secret } = await reg.actions.checkout({
        formId,
        fieldId: paymentField.id,
        priceId: chosen.priceId,
        details,
        returnUrl: `${window.location.origin}${returnPath}?session_id={CHECKOUT_SESSION_ID}`,
      });
      setClientSecret(secret);
    } catch (e) {
      setFailure(registrationMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const problems = [...Object.entries(errors.details), ...Object.entries(errors.values)];
  const detailErr = (k: keyof Details) => errors.details[k];
  const textField = (k: "fname" | "lname" | "email" | "institution", label: string, opts: { type?: string; auto: string; readOnly?: boolean }) => (
    <div className={ui.field}>
      <label htmlFor={`${uid}-${k}`} className={ui.label}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={`${uid}-${k}`}
        name={k}
        type={opts.type ?? "text"}
        className={`${ui.input} ${detailErr(k) ? ui.inputInvalid : ""}`}
        autoComplete={opts.auto}
        value={details[k]}
        readOnly={opts.readOnly}
        aria-readonly={opts.readOnly || undefined}
        aria-required="true"
        aria-invalid={!!detailErr(k)}
        aria-describedby={detailErr(k) ? `${uid}-${k}-error` : undefined}
        onChange={(e) => setDetail(k)(e.target.value)}
        onBlur={k === "email" ? lookupEmail : undefined}
      />
      {detailErr(k) && (
        <p id={`${uid}-${k}-error`} className={ui.fieldError}>
          {detailErr(k)}
        </p>
      )}
    </div>
  );

  if (step === "payment") {
    return (
      <section className={ui.section} aria-labelledby={`${uid}-pay-h`}>
        <div className="card-body gap-4">
          <h2 id={`${uid}-pay-h`} ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
            Payment
          </h2>
          {!clientSecret ? (
            <>
              <p>
                Registering as <strong>{roleLabel(details.role as RegistrationRole)}</strong>: {details.fname} {details.lname} ({details.email}).
              </p>
              {options.length === 0 ? (
                <Notice tone="error" title="There is no price for that role right now">
                  <p>Go back and choose another role, or contact the organizers.</p>
                </Notice>
              ) : (
                <RadioGroup.Root value={chosen?.priceId ?? ""} onValueChange={(e) => setPriceId(e.value ?? "")} className="flex flex-col gap-2">
                  <RadioGroup.Label className={ui.label}>Registration level</RadioGroup.Label>
                  {options.map((o) => (
                    <RadioGroup.Item key={o.priceId} value={o.priceId} className={ui.radioItem}>
                      <RadioGroup.ItemControl className={ui.radioDot} />
                      <RadioGroup.ItemText className="flex flex-1 justify-between gap-4">
                        <span>{o.label}</span>
                        <span className="font-semibold">{o.price}</span>
                      </RadioGroup.ItemText>
                      <RadioGroup.ItemHiddenInput />
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )}
              {failure && (
                <p role="alert" className={ui.statusError}>
                  {failure}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary" disabled={busy || !chosen} onClick={pay}>
                  {busy && <span className="loading loading-spinner loading-sm" aria-hidden="true" />}
                  {chosen ? `Continue to payment (${chosen.price})` : "Continue to payment"}
                </button>
                <button type="button" className={ui.secondary} disabled={busy} onClick={() => setStep("details")}>
                  Back to your details
                </button>
              </div>
            </>
          ) : publishableKey && stripeAccount ? (
            <CheckoutMount publishableKey={publishableKey} stripeAccount={stripeAccount} clientSecret={clientSecret} />
          ) : (
            <Notice tone="error" title="Payments are not available right now" />
          )}
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={next} noValidate className={`${ui.section}`} aria-labelledby={`${uid}-details-h`}>
      <div className="card-body gap-5">
        <h2 id={`${uid}-details-h`} ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
          Your details
        </h2>

        {problems.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} role="alert" className={ui.statusError}>
            <div>
              <p className="font-semibold">Please fix {problems.length === 1 ? "this" : "these"} before continuing:</p>
              <ul className="list-disc pl-5">
                {problems.map(([k, m]) => (
                  <li key={k}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {signedIn && <p className="text-sm text-base-content/80">Signed in as {reg.auth.user?.email}. Your profile is filled in below.</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          {textField("fname", "First name", { auto: "given-name" })}
          {textField("lname", "Last name", { auto: "family-name" })}
        </div>
        {textField("email", "Email", { type: "email", auto: "email", readOnly: signedIn && !!details.email })}

        {emailHint === "account" && !signedIn && (
          <div role="status" className={ui.statusInfo}>
            <div>
              <p>That email already has an account.</p>
              <button type="button" className="link link-primary" onClick={() => auth.open("signin")}>
                Sign in to register faster
              </button>
              <span> or keep going as a guest.</span>
            </div>
          </div>
        )}

        {textField("institution", "Institution", { auto: "organization" })}

        <div className={ui.field}>
          <label htmlFor={`${uid}-role`} className={ui.label}>
            Role <span aria-hidden="true">*</span>
          </label>
          <select
            id={`${uid}-role`}
            className={`${ui.select} ${detailErr("role") ? ui.inputInvalid : ""}`}
            value={details.role}
            aria-required="true"
            aria-invalid={!!detailErr("role")}
            aria-describedby={detailErr("role") ? `${uid}-role-error` : undefined}
            onChange={(e) => setDetail("role")(e.target.value)}
          >
            <option value="">Choose your role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {roleLabel(r)}
              </option>
            ))}
          </select>
          {detailErr("role") && (
            <p id={`${uid}-role-error`} className={ui.fieldError}>
              {detailErr("role")}
            </p>
          )}
        </div>

        {askable.map((f) => (
          <FieldInput key={f.id} field={f} value={values[f.id]} error={errors.values[f.id]} onChange={(v) => setValues((cur) => ({ ...cur, [f.id]: v }))} />
        ))}

        <div>
          <button type="submit" className="btn btn-primary">
            Continue to payment
          </button>
        </div>
      </div>
    </form>
  );
}
