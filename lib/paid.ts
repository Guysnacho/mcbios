/** Window of the upcoming conference cycle (organization columns, YYYY-MM-DD). */
export interface PaidWindow {
  /** organization.registration_start_date: first day payments count */
  registrationStart?: string | null;
  /** organization.conference_date: the upcoming conference; last day payments count */
  conferenceDate?: string | null;
}

/**
 * Has this member paid for the UPCOMING conference cycle?
 *
 * A payment counts when its calendar day (UTC) falls within
 * [registrationStart, conferenceDate], both inclusive. Either bound may be null
 * (unbounded); with neither set, any recorded payment counts.
 */
export function isPaidThisCycle(
  feesPaidAt: string | null | undefined,
  { registrationStart, conferenceDate }: PaidWindow,
): boolean {
  if (!feesPaidAt) return false;
  const day = feesPaidAt.slice(0, 10);
  if (registrationStart && day < registrationStart.slice(0, 10)) return false;
  if (conferenceDate && day > conferenceDate.slice(0, 10)) return false;
  return true;
}
