import type { SuiteConfig } from "../types";
import { SuiteError, toSuiteError } from "../errors";
import type { EmailCheck } from "./machine";

type Fetch = typeof fetch;

/** `GET /api/auth/[org_id]?email=`: a plain GET, so no CORS preflight. */
export async function checkEmail(
  config: SuiteConfig,
  email: string,
  doFetch: Fetch = fetch,
): Promise<EmailCheck> {
  try {
    const res = await doFetch(
      `${config.suiteUrl}/api/auth/${config.orgId}?email=${encodeURIComponent(email)}`,
    );
    if (res.ok) {
      const body = (await res.json()) as { authed?: boolean };
      return body.authed ? { kind: "registered" } : { kind: "guest" };
    }
    if (res.status === 404) return { kind: "not_found" };
    if (res.status === 406) return { kind: "other_org" };
    if (res.status === 429) return { kind: "rate_limited" };
    return { kind: "error" };
  } catch {
    return { kind: "error" };
  }
}

export type OrgPublic = { id: string; url: string; name: string; shortName: string | null };

/** `GET /api/org/[id]`: public org details (its `url` is the base_url that scopes the shared cookie). */
export async function getOrg(config: SuiteConfig, doFetch: Fetch = fetch): Promise<OrgPublic> {
  const res = await doFetch(`${config.suiteUrl}/api/org/${config.orgId}`);
  if (!res.ok) throw await toSuiteError(res);
  return (await res.json()) as OrgPublic;
}

/**
 * `PUT /api/auth`: add an existing account to this org. With `profile` it is the
 * sign-up form (the `signup` header selects that body); without, a plain sign-in.
 * Failures here never undo the sign-in, so callers treat them as non-fatal.
 */
export async function linkAccount(
  config: SuiteConfig,
  token: string,
  profile?: { fname: string; lname: string; institution: string },
  doFetch: Fetch = fetch,
): Promise<void> {
  const res = await doFetch(`${config.suiteUrl}/api/auth`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(profile ? { signup: "true" } : {}) },
    body: JSON.stringify({ org_id: config.orgId, token, ...profile }),
  });
  // 409: already a member, which is the goal
  if (!res.ok && res.status !== 409) {
    const err = await toSuiteError(res);
    throw new SuiteError(err.message, err.code, err.status);
  }
}
