import { SupabaseClient } from "@supabase/supabase-js";
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

export const couponFetcher = async (client: SupabaseClient<Database>) => {
  // Fetch data from external API
  const data = await client
    .from("admin_code")
    .select("*")
    .eq("type", "coupon")
    .throwOnError();

  return data;
};
