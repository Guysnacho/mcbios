import { SupabaseClient } from "@supabase/supabase-js";
import { isPaidThisCycle } from "./paid";
import { Database } from "./supabase/types";

export const authFetcher = async (client: SupabaseClient<Database>) => {
  const { data: token } = await client.auth.getClaims();
  const { data } = await client
    .from("member")
    .select("*")
    .eq("user_id", token!.claims.sub)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .order("date", { ascending: false });
  // Members can read their own org: it carries the registration window that
  // decides whether a payment counts for the upcoming conference.
  const { data: org } = await client
    .from("organization")
    .select("registration_start_date, conference_date")
    .eq("id", process.env.NEXT_PUBLIC_ORG_ID!)
    .maybeSingle();
  const user = await client.auth.getUser();

  if (data) {
    return {
      user: {
        ...data,
        email: user.data.user?.email,
        // Paid for the UPCOMING conference (not just ever paid)
        paidThisCycle: isPaidThisCycle(data.fees_paid_at, {
          registrationStart: org?.registration_start_date,
          conferenceDate: org?.conference_date,
        }),
      },
      videos: videos ?? [],
    };
  }
  return { user: undefined, videos: [] };
};

/** Everyone registered for this year's conference (members with this year in `attended`). */
export const memberRegistrationFetcher = async (
  client: SupabaseClient<Database>,
) => {
  const now = new Date();
  const { data } = await client
    .from("member")
    .select(`*`)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .contains("attended", [now.getFullYear().toString()])
    .throwOnError();

  return data;
};

export type Registration = {
  fname: string;
  lname: string;
  role: "professional" | "student" | "admin" | "postdoctorial";
  email: string;
  institution: string;
};
