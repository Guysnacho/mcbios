"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { registrationMessage } from "../core/registration/errors";
import type { CheckoutStatus } from "../core/registration/types";
import { buildSubmissionData } from "../core/registration/validation";
import type { SuiteConfig } from "../core/types";
import { useRegistrationActions } from "../react/useRegistration";
import { useAuth } from "../react/AuthProvider";
import { useStableConfig } from "../react/useStableConfig";
import { getRegistrationForm } from "../core/registration/api";
import { ui } from "./classes";

type View =
  | { kind: "checking" }
  | { kind: "missing" }
  | { kind: "unpaid"; status: CheckoutStatus }
  | { kind: "saving" }
  | { kind: "done"; email: string | null; saved: boolean }
  | { kind: "save_failed"; message: string }
  | { kind: "error"; message: string };

/**
 * The page Stripe returns to (`/register/status?session_id=`). It confirms the
 * payment, then sends the answers saved before checkout so the registration form
 * has its submission. Stripe and the suite's webhook are the record of payment
 * (they apply the member's role even if this page is never opened), so a closed tab
 * loses nothing that matters; this page only completes the form.
 */
export function PaymentStatus({ config: rawConfig, sessionId }: { config: SuiteConfig; sessionId: string | null }) {
  const config = useStableConfig(rawConfig);
  const actions = useRegistrationActions(config);
  const auth = useAuth();
  const [run, setView] = useState<View>({ kind: "checking" });
  const view: View = sessionId ? run : { kind: "missing" };
  const [attempt, setAttempt] = useState(0);
  // One run per session id and retry: effects run twice in development, and a run must not be cancelled midway
  const started = useRef<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sessionId) return;
    // Wait for the session to be read so a signed-in member submits with their token
    if (!auth.ready) return;
    const key = `${sessionId}:${attempt}`;
    if (started.current === key) return;
    started.current = key;
    (async () => {
      try {
        let status: CheckoutStatus;
        try {
          status = await actions.status(sessionId);
        } catch (e) {
          return void setView({ kind: "error", message: registrationMessage(e) });
        }
        if (status.payment_status !== "paid") return void setView({ kind: "unpaid", status });

        const formId = config.registrationFormId;
        const draft = formId ? actions.drafts.load(formId) : null;
        if (!formId || !draft) return void setView({ kind: "done", email: status.customer_email, saved: false });

        setView({ kind: "saving" });
        const form = await getRegistrationForm(config, formId);
        const fields = form.schema ?? [];
        const paymentField = fields.find((f) => f.type === "payment");
        await actions.submit({
          formId,
          data: buildSubmissionData(fields, draft.values, paymentField ? { fieldId: paymentField.id, sessionId } : undefined),
          details: draft.details,
        });
        actions.drafts.clear(formId);
        setView({ kind: "done", email: status.customer_email, saved: true });
      } catch (e) {
        setView({ kind: "save_failed", message: registrationMessage(e) });
      }
    })();
  }, [sessionId, auth.ready, actions, config, attempt]);

  useEffect(() => {
    if (view.kind !== "checking" && view.kind !== "saving") headingRef.current?.focus();
  }, [view.kind]);

  const heading = (text: string) => (
    <h2 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
      {text}
    </h2>
  );

  return (
    <section className={ui.section} aria-live="polite">
      <div className="card-body gap-3">
        {view.kind === "checking" && (
          <p role="status">
            <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />
            Confirming your payment…
          </p>
        )}
        {view.kind === "saving" && (
          <p role="status">
            <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />
            Payment received. Saving your registration…
          </p>
        )}
        {view.kind === "missing" && (
          <>
            {heading("No payment to show")}
            <p>This page opens after checkout. If you meant to register, start here.</p>
            <Link href="/register" className="btn btn-primary self-start">
              Go to registration
            </Link>
          </>
        )}
        {view.kind === "unpaid" && (
          <>
            {heading(view.status.status === "expired" ? "Your checkout expired" : "Your payment isn't complete")}
            <p>You haven&apos;t been charged. You can start again; your details are saved on this device.</p>
            <Link href="/register" className="btn btn-primary self-start">
              Back to registration
            </Link>
          </>
        )}
        {view.kind === "done" && (
          <>
            {heading("You're registered")}
            <p>
              Thank you. Your payment went through{view.email ? <> and Stripe will email a receipt to {view.email}</> : null}.
              {!view.saved && " Your registration is recorded with your payment."}
            </p>
            <Link href="/" className="btn self-start">
              Back to home
            </Link>
          </>
        )}
        {view.kind === "save_failed" && (
          <>
            {heading("Payment received, but we couldn't save your answers")}
            <p role="alert">{view.message}</p>
            <p>Your payment is safe and your registration is recorded. Try saving your answers again, or contact the organizers.</p>
            <button type="button" className="btn btn-primary self-start" onClick={() => setAttempt((n) => n + 1)}>
              Try again
            </button>
          </>
        )}
        {view.kind === "error" && (
          <>
            {heading("We couldn't check your payment")}
            <p role="alert">{view.message}</p>
          </>
        )}
      </div>
    </section>
  );
}
