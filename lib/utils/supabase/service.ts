import { createClient as createSupaClient } from "@supabase/supabase-js";
import { Database } from "./types";

export default function createClient() {
  const supabase = createSupaClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVER_KEY!
  );

  return supabase;
}
