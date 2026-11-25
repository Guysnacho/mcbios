/**
 * What the SDK needs to render a suite registration form and take payment.
 * The rules (window, limits, "already paid") are decided by the suite's database;
 * nothing here recomputes them. Field types mirror the suite's `form-schema.ts`
 * (the subset a public form uses).
 */

export type RegistrationRole = "student" | "postdoctorial" | "professional";
export const REGISTRATION_ROLES: RegistrationRole[] = ["student", "postdoctorial", "professional"];

/** Answers to a person field. */
export type PersonValue = {
  fname: string;
  lname: string;
  email: string;
  affiliation: string;
  title?: string;
  department?: string;
  urls?: string[];
  custom?: Record<string, string>;
};
export type FieldValue = string | PersonValue | Array<string | PersonValue>;

type Base = { id: string; title: string; description: string; required: boolean };
type Repeat = { repeatable?: boolean; minItems?: number; maxItems?: number; itemLabel?: string };
type Limits = { maxLength?: number; maxWords?: number };

export type FormField = (
  | (Base & { type: "text"; inputType?: "text" | "email" | "url" | "number" | "uuid"; placeholder?: string })
  | (Base & { type: "textarea"; placeholder?: string })
  | (Base & { type: "select"; helperText?: string; items: { key: string; label?: unknown }[] })
  | (Base & {
      type: "person";
      extras?: { email?: boolean; title?: boolean; department?: boolean; urls?: boolean };
      customFields?: { id: string; label: string }[];
    })
  | (Base & { type: "dropzone"; helperText?: string })
  | (Base & { type: "payment" })
) &
  Repeat &
  Limits;

/** `GET /api/form?id&org_id` for a public form. Never includes member data. */
export type RegistrationFormSchema = {
  id: string;
  org_id: string;
  type: "abstract" | "session" | "general" | "registration";
  meta: { title: string; description?: string; public?: boolean };
  schema: FormField[] | null;
};

/** A product on the org's Stripe account, as `GET /api/stripe/registration-product` returns it. */
export type SuiteProduct = {
  id: string;
  name: string;
  active: boolean;
  metadata: Record<string, string>;
  default_price: { id: string; unit_amount: number | null; currency: string } | string | null;
};

export type RegistrationWindow = { startDate: string | null; endDate: string | null; windowOpen: boolean };

export type RegistrationProducts = {
  products: SuiteProduct[];
  registration: RegistrationWindow;
  stripeAccount?: string;
  publishableKey?: string | null;
  subscriptionActive?: boolean;
  configError?: "no_account" | "stripe_unavailable";
};

/** One thing a person can pay for. */
export type PriceOption = {
  priceId: string;
  role: RegistrationRole;
  label: string;
  /** Minor units */
  amount: number;
  /** e.g. "$250.00" */
  price: string;
};

/** Who is registering. Members' profile is prefilled from their member row. */
export type Details = {
  fname: string;
  lname: string;
  email: string;
  institution: string;
  role: RegistrationRole | "";
};

/** What the signed-in person is to this org (the suite's `my_membership` function). */
export type Membership = {
  role: string;
  fees_paid_at: string | null;
  paid_this_cycle: boolean;
  registration_open: boolean;
};

export type CheckoutStatus = {
  status: "open" | "complete" | "expired" | null;
  payment_status: "paid" | "unpaid" | "no_payment_required" | null;
  customer_email: string | null;
};
