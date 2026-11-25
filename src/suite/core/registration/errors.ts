import { SuiteError } from "../errors";

/** Codes the suite's registration guards raise (see the suite's registration_guard). */
export type RegistrationCode =
  | "subscription_inactive"
  | "registration_limit"
  | "member_limit"
  | "registration_closed"
  | "already_registered"
  | "plan_inactive";

const MESSAGES: Record<RegistrationCode, string> = {
  subscription_inactive: "Registration is not open right now.",
  registration_closed: "Registration is not open right now.",
  registration_limit: "Registration is full. Please contact the organizers.",
  member_limit: "This conference isn't accepting new registrations right now. Please contact the organizers.",
  already_registered: "You are already registered for this conference.",
  plan_inactive: "Registration is not available right now.",
};

export const isRegistrationCode = (code: unknown): code is RegistrationCode =>
  typeof code === "string" && code in MESSAGES;

/** A friendly sentence for an error: our wording for a known guard code, else the server's message. */
export function registrationMessage(error: unknown): string {
  if (error instanceof SuiteError) {
    if (isRegistrationCode(error.code)) return MESSAGES[error.code];
    if (error.code === "network") return "We could not reach the server. Check your connection and try again.";
    return error.message || "Something went wrong. Try again.";
  }
  return "Something went wrong. Try again.";
}
