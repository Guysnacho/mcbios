import { REGISTRATION_ROLES, type PriceOption, type RegistrationProducts, type RegistrationRole, type SuiteProduct } from "./types";

const ROLE_LABEL: Record<RegistrationRole, string> = {
  student: "Student",
  postdoctorial: "Postdoctoral",
  professional: "Professional",
};
export const roleLabel = (role: RegistrationRole) => ROLE_LABEL[role];

/**
 * What people can pay for: the org's active registration products (`metadata.role`
 * is a registration role; `metadata.type = "membership"` products are not conference
 * registration). Cheapest first. Used only to render the payment choice: the suite
 * validates the price again at checkout.
 */
export function priceOptions(products: SuiteProduct[]): PriceOption[] {
  const out: PriceOption[] = [];
  for (const p of products) {
    const role = p.metadata?.role as RegistrationRole | undefined;
    const price = p.default_price;
    if (!p.active || p.metadata?.type === "membership") continue;
    if (!role || !REGISTRATION_ROLES.includes(role)) continue;
    if (typeof price !== "object" || price === null || price.unit_amount == null) continue;
    out.push({
      priceId: price.id,
      role,
      label: p.name,
      amount: price.unit_amount,
      price: new Intl.NumberFormat("en-US", { style: "currency", currency: price.currency.toUpperCase() }).format(
        price.unit_amount / 100,
      ),
    });
  }
  return out.sort((a, b) => a.amount - b.amount);
}

export type RegistrationState =
  | { kind: "open" }
  | { kind: "opens_soon"; startDate: string | null }
  | { kind: "closed" }
  /** Plan inactive, no Stripe account, Stripe unreachable, or no registration products */
  | { kind: "unavailable" };

/**
 * Can people register? `windowOpen` and `subscriptionActive` come from the suite's
 * database; this only picks the wording. `today` is used for the label alone
 * ("opens soon" vs "closed"), never to decide whether registration is open.
 */
export function registrationState(
  data: RegistrationProducts,
  options: PriceOption[],
  today: string = new Date().toISOString().slice(0, 10),
): RegistrationState {
  if (data.configError || data.subscriptionActive === false) return { kind: "unavailable" };
  if (!data.registration.windowOpen) {
    const start = data.registration.startDate;
    return start && today < start ? { kind: "opens_soon", startDate: start } : { kind: "closed" };
  }
  return options.length > 0 ? { kind: "open" } : { kind: "unavailable" };
}

/** "January 8, 2027" from a YYYY-MM-DD (no time zone shifts). */
export function formatDay(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
