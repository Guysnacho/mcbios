import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase/types";
import Stripe from "stripe";

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

type CouponList = {
  coupon: Stripe.Coupon;
  active: boolean;
  promo_code: string;
  promo_id: string;
  created: number;
  max_redemptions: number | null;
  times_redeemed: number;
  expires_at: number | null;
}[]
