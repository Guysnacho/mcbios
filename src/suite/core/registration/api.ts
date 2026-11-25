import { SuiteError, toSuiteError } from "../errors";
import type { SuiteConfig } from "../types";
import type { CheckoutStatus, Details, RegistrationFormSchema, RegistrationProducts } from "./types";

type Fetch = typeof fetch;
type Deps = { fetch?: Fetch; token?: string | null };

async function call(url: string, init: RequestInit, deps: Deps): Promise<Response> {
  const headers = new Headers(init.headers);
  // A Bearer token makes the suite treat the caller as the signed-in member
  if (deps.token) headers.set("Authorization", `Bearer ${deps.token}`);
  let res: Response;
  try {
    res = await (deps.fetch ?? fetch)(url, { ...init, headers });
  } catch {
    throw new SuiteError("We could not reach the server.", "network");
  }
  if (!res.ok) throw await toSuiteError(res);
  return res;
}

/** `GET /api/stripe/registration-product`: prices, Stripe keys, and the window (`windowOpen` is decided by the suite). */
export async function getRegistrationProducts(config: SuiteConfig, deps: Deps = {}): Promise<RegistrationProducts> {
  const res = await call(`${config.suiteUrl}/api/stripe/registration-product?org_id=${config.orgId}`, {}, deps);
  return (await res.json()) as RegistrationProducts;
}

/** `GET /api/form?id&org_id`: the public form's fields (no member data). */
export async function getRegistrationForm(
  config: SuiteConfig,
  formId: string,
  deps: Deps = {},
): Promise<RegistrationFormSchema> {
  const res = await call(`${config.suiteUrl}/api/form?id=${formId}&org_id=${config.orgId}`, {}, deps);
  return (await res.json()) as RegistrationFormSchema;
}

/**
 * `POST /api/stripe/form-checkout`: an embedded checkout for the form's payment field.
 * The suite's registration guard runs here, so a closed window, a full org or an
 * already-registered person comes back as a typed error (`registration_closed`,
 * `already_registered`, ...). Bearer when signed in; guests send their email.
 */
export async function createFormCheckout(
  config: SuiteConfig,
  input: { formId: string; fieldId: string; priceId: string; details: Details; returnUrl: string; isPublic: boolean },
  deps: Deps = {},
): Promise<{ clientSecret: string }> {
  const { details } = input;
  const res = await call(
    `${config.suiteUrl}/api/stripe/form-checkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        org_id: config.orgId,
        form_id: input.formId,
        field_id: input.fieldId,
        price_id: input.priceId,
        is_public: input.isPublic,
        return_url: input.returnUrl,
        email: details.email,
        fname: details.fname,
        lname: details.lname,
        institution: details.institution,
      }),
    },
    deps,
  );
  return (await res.json()) as { clientSecret: string };
}

/** `PATCH /api/form`: submit the filled form. Guests send `user_json`; a signed-in member sends only a Bearer token. */
export async function submitRegistration(
  config: SuiteConfig,
  input: {
    formId: string;
    data: { id: string; title: string; value: unknown }[];
    /** Omit when signed in */
    guest?: Details;
  },
  deps: Deps = {},
): Promise<{ id?: string; updated_at?: string }> {
  const { guest } = input;
  const res = await call(
    `${config.suiteUrl}/api/form`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: input.formId,
        data: input.data,
        org_id: config.orgId,
        ...(guest && !deps.token
          ? {
              user_json: {
                fname: guest.fname,
                lname: guest.lname,
                email: guest.email,
                institution: guest.institution,
                role: guest.role,
              },
            }
          : {}),
      }),
    },
    deps,
  );
  return (await res.json()) as { id?: string; updated_at?: string };
}

/** `GET /api/stripe/registration-checkout?session_id`: the status of a checkout, for the return page. */
export async function getCheckoutStatus(
  config: SuiteConfig,
  sessionId: string,
  deps: Deps = {},
): Promise<CheckoutStatus> {
  const res = await call(
    `${config.suiteUrl}/api/stripe/registration-checkout?org_id=${config.orgId}&session_id=${encodeURIComponent(sessionId)}`,
    {},
    deps,
  );
  return (await res.json()) as CheckoutStatus;
}
