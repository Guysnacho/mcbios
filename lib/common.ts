import { useAptabase } from "@aptabase/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Stripe } from "stripe";
import { Database } from "./supabase/types";

export const isPresent = (str?: string) => {
  return str !== undefined && str !== "";
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function handleStripeSessionUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  const userId = session.metadata!.userId;
  const tier = session.metadata!.tier;
  console.info(
    `[handleStripeSessionUpdate] Updating member | user_id=${userId} tier=${tier}`,
  );

  const { data, error } = await client
    .from("member")
    .update({
      fees_paid_at: new Date().toISOString(),
      role: tier as Database["public"]["Enums"]["user_role"],
      institution: session.metadata!.institution,
    })
    .eq("user_id", userId)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .select("user_id")
    .maybeSingle();

  if (error) {
    console.error(
      `[handleStripeSessionUpdate] Failed to update member | user_id=${userId}`,
      error.message,
    );
    throw new Error(error.message);
  }

  console.info(
    `[handleStripeSessionUpdate] Member updated, appending attendance year | user_id=${data!.user_id}`,
  );

  const { error: appendError } = await client.rpc(
    "append_current_year_to_attended",
    { target_user: data!.user_id },
  );

  if (appendError) {
    console.error(
      `[handleStripeSessionUpdate] Failed to append attendance year | user_id=${data!.user_id}`,
      appendError.message,
    );
    throw new Error(appendError.message);
  }

  console.info(`[handleStripeSessionUpdate] Done | user_id=${data!.user_id}`);
}

export async function handleStripeRawUpdate(
  client: SupabaseClient<Database>,
  session: Stripe.Response<Stripe.Checkout.Session>,
) {
  const email = session.metadata!.email;
  const name = `${session.metadata!.fname} ${session.metadata!.lname}`;
  console.info(
    `[handleStripeRawUpdate] Upserting raw registration | email=${email} name=${name}`,
  );

  const { error } = await client.from("raw_registration").upsert(
    {
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
      email,
      fname: session.metadata!.fname,
      lname: session.metadata!.lname,
      institution: session.metadata!.institution,
      created_at: new Date().toISOString(),
      role: session.metadata!.tier as Database["public"]["Enums"]["user_role"],
    },
    { ignoreDuplicates: false },
  );

  if (error) {
    console.error(
      `[handleStripeRawUpdate] Failed to upsert raw registration | email=${email}`,
      error.message,
    );
    throw new Error(error.message);
  }

  console.info(`[handleStripeRawUpdate] Done | email=${email}`);
}

export const useAnalytics = () => {
  const { trackEvent: aptabaseTrackEvent } = useAptabase();

  function trackEvent(
    eventName: string,
    eventBody?: Record<string, string | number | boolean>,
  ) {
    aptabaseTrackEvent(eventName, {
      ...eventBody,
      org: process.env.NEXT_PUBLIC_ORG_ID ?? "",
      url: process.env.NEXT_PUBLIC_APP_URL ?? "",
    });
  }

  return { trackEvent };
};
