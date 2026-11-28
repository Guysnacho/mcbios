import { SupabaseClient } from "@supabase/supabase-js";
import { getBaseServiceURL } from "./common";
import { isPaidThisCycle } from "./paid";
import { Database } from "./supabase/types";

/**
 * A recording as `GET /api/videos` returns it. `url` is what to play: an embed URL
 * (YouTube, legacy Google Drive) or, for an uploaded file, a signed URL valid for 6 hours.
 */
export type Recording = {
  id: number;
  title: string;
  /** `YYYY-MM-DDTHH:mm:ss`, no zone: the day of the session */
  date: string;
  source: "upload" | "youtube" | "drive";
  url: string | null;
  size_bytes: number | null;
  status: "uploading" | "ready";
};

/** The org's finished recordings, newest first, from the suite (signed in with the member's own token). */
async function fetchRecordings(client: SupabaseClient<Database>): Promise<Recording[]> {
  try {
    const { data } = await client.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return [];
    const res = await fetch(
      `${getBaseServiceURL()}/api/videos?org_id=${process.env.NEXT_PUBLIC_ORG_ID}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) return [];
    const body = (await res.json()) as { videos?: Recording[] };
    return (body.videos ?? []).filter((v) => v.status === "ready");
  } catch {
    return [];
  }
}

export const authFetcher = async (client: SupabaseClient<Database>) => {
  const { data: token } = await client.auth.getClaims();
  const { data } = await client
    .from("member")
    .select("*")
    .eq("user_id", token!.claims.sub)
    .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
    .single();
  const videos = await fetchRecordings(client);
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
