import { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Database } from "./supabase/types";

export const authFetcher = async (client: SupabaseClient<Database>) => {
  // Fetch data from external API
  const { data } = await client.from("member").select("*").single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .order("date", { ascending: false });
  const user = await client.auth.getUser();

  if (data) {
    if (videos) {
      return { user: { ...data, email: user.data.user?.email }, videos };
    }
    return { user: { ...data, email: user.data.user?.email }, videos: [] };
  }
  return { user: undefined, videos: [] };
};

export const couponFetcher = async (): Promise<CouponList> => {
  const data = await fetch("/api/admin");
  return await data.json();
};

export const memberFetcher = async (client: SupabaseClient<Database>) => {
  const rawRegistrationPromise = client
    .from("raw_registration")
    .select(`fname, lname, role, email, institution`)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .throwOnError()
    .then((res) => {
      res.data;
    });

  const memberPromise = client
    .from("member")
    .select(`*`)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .throwOnError()
    .then((res) => {
      res.data;
    });

  const [registrations, memberRes] = await Promise.all([
    rawRegistrationPromise,
    memberPromise,
  ]);
  return {
    // @ts-expect-error whoopsie
    registrations: registrations as Registration[],
    // @ts-expect-error whoopsie
    members: memberRes as Database["public"]["Tables"]["member"]["Row"][],
  };
};

type CouponList = {
  coupon: Stripe.Coupon;
  active: boolean;
  promo_code: string;
  promo_id: string;
  created: number;
  max_redemptions: number | null;
  times_redeemed: number;
  expires_at: number | null;
}[];

export type Registration =
  | {
      fname: string;
      lname: string;
      role: "professional" | "student" | "admin" | "postdoctorial";
      email: string;
      institution: string;
    }
  | Database["public"]["Tables"]["member"]["Row"];
