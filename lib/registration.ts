import useSWR from "swr";
import { getBaseServiceURL } from "./common";

/** A product on the org's Stripe Connect account, as returned by the suite. */
export type SuiteProduct = {
  id: string;
  name: string;
  active: boolean;
  metadata: Record<string, string>;
  default_price:
    | { id: string; unit_amount: number | null; currency: string }
    | string
    | null;
};

export type SuiteProducts = {
  products: SuiteProduct[];
  stripeAccount?: string;
  publishableKey?: string | null;
  configError?: "no_account" | "stripe_unavailable";
  subscriptionActive?: boolean;
  /** The org's registration window (Settings > dates), YYYY-MM-DD or null */
  registration?: {
    startDate: string | null;
    endDate: string | null;
    windowOpen: boolean;
  };
};

/**
 * Can people register right now? Driven entirely by the suite: the org's
 * registration window, an active subscription, a connected Stripe account and at
 * least one registration product. `undefined` while loading.
 */
export function isRegistrationOpen(
  data: SuiteProducts | undefined,
  options: RegistrationOption[],
): boolean | undefined {
  if (!data) return undefined;
  return (
    !data.configError &&
    data.subscriptionActive !== false &&
    data.registration?.windowOpen !== false &&
    options.length > 0
  );
}

export type RegistrationRole = "student" | "postdoctorial" | "professional";

const ROLES: RegistrationRole[] = ["student", "postdoctorial", "professional"];

export async function fetchRegistrationProducts(): Promise<SuiteProducts> {
  const res = await fetch(
    `${getBaseServiceURL()}/api/stripe/registration-product?org_id=${process.env.NEXT_PUBLIC_ORG_ID}`,
  );
  if (!res.ok) throw new Error("Unable to load registration options");
  return (await res.json()) as SuiteProducts;
}

export const useRegistrationProducts = () =>
  useSWR("suite/registration-products", fetchRegistrationProducts, {
    revalidateOnFocus: false,
  });

export type RegistrationOption = {
  role: RegistrationRole;
  label: string;
  /** e.g. "$25.00" */
  price: string | null;
};

/**
 * Conference registration levels from the org's products: one per role, taken
 * from `metadata.role`. Membership-only products (`metadata.type = "membership"`)
 * are excluded. Cheapest first.
 */
export function registrationOptions(products: SuiteProduct[]): RegistrationOption[] {
  return products
    .filter(
      (p) =>
        p.active &&
        p.metadata?.type !== "membership" &&
        ROLES.includes(p.metadata?.role as RegistrationRole) &&
        typeof p.default_price === "object" &&
        p.default_price !== null,
    )
    .map((p) => {
      const price = p.default_price as Exclude<SuiteProduct["default_price"], string | null>;
      return {
        role: p.metadata.role as RegistrationRole,
        label: p.name,
        amount: price.unit_amount ?? 0,
        price:
          price.unit_amount === null
            ? null
            : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency.toUpperCase(),
              }).format(price.unit_amount / 100),
      };
    })
    .sort((a, b) => a.amount - b.amount)
    .map(({ role, label, price }) => ({ role, label, price }));
}

/**
 * Formatted conference price per role (e.g. { student: "$250.00" }), from the
 * same products registration checks out with, so displayed prices never drift.
 */
export function registrationPrices(
  products: SuiteProduct[],
): Partial<Record<RegistrationRole, string>> {
  const prices: Partial<Record<RegistrationRole, string>> = {};
  for (const option of registrationOptions(products)) {
    if (option.price) prices[option.role] = option.price;
  }
  return prices;
}

/** Live registration state for CTAs: `open` is undefined while loading. */
export function useRegistrationStatus() {
  const { data, isLoading } = useRegistrationProducts();
  const open = isRegistrationOpen(data, registrationOptions(data?.products ?? []));
  const today = new Date().toISOString().slice(0, 10);
  const start = data?.registration?.startDate ?? null;
  const end = data?.registration?.endDate ?? null;
  return {
    open,
    isLoading,
    /** Button / badge text */
    label:
      open === undefined
        ? "Registration"
        : open
          ? "Register Now"
          : end && today > end
            ? "Registration Closed"
            : start && today < start
              ? "Registration Opens Soon"
              : "Registration Closed",
  };
}
