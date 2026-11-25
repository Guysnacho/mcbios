import type { SupabaseClient } from "@supabase/supabase-js";
import type { Details, Membership } from "./types";
import { REGISTRATION_ROLES } from "./types";

type Db = Pick<SupabaseClient, "from" | "rpc">;

/**
 * The signed-in person's own member row (RLS lets them read it), to prefill the
 * form: members never retype their profile. Null for a guest or on any error.
 */
export async function getProfile(db: Db, orgId: string, userId: string, email: string): Promise<Partial<Details> | null> {
  const { data, error } = await db
    .from("member")
    .select("fname, lname, institution, role")
    .eq("user_id", userId)
    .eq("org_id", orgId)
    .maybeSingle();
  if (error || !data) return null;
  const role = REGISTRATION_ROLES.find((r) => r === data.role);
  return { fname: data.fname ?? "", lname: data.lname ?? "", institution: data.institution ?? "", email, ...(role ? { role } : {}) };
}

/**
 * What the suite says this person is to the org: role, last payment, and whether
 * that payment counts for the current cycle. The database decides ("paid this
 * cycle" is a SQL function); nothing here recomputes it.
 */
export async function getMembership(db: Db, orgId: string): Promise<Membership | null> {
  const { data, error } = await db.rpc("my_membership", { p_org: orgId });
  if (error || !Array.isArray(data) || data.length === 0) return null;
  return data[0] as Membership;
}
