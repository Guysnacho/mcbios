import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase/types";

export const authFetcher = async (client: SupabaseClient<Database>) => {
  // Fetch data from external API
  const { data } = await client.from("member").select("*").single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .order("date", { ascending: false });

  if (data) {
    if (videos) {
      return { user: data, videos };
    }
    return { user: data, videos: [] };
  }
  return { user: undefined, videos: [] };
};
