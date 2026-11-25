import type { Details, FieldValue, FormField, PersonValue } from "./types";
import { REGISTRATION_ROLES } from "./types";

/**
 * Checks that catch typos before a round trip. The suite validates again on submit
 * and is the authority, so these only ever need to be as strict as it is, never stricter.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v: string) => EMAIL.test(v.trim());
const wordCount = (v: string) => v.trim().split(/\s+/).filter(Boolean).length;

export type Errors = Record<string, string>;

export function validateDetails(d: Details): Errors {
  const e: Errors = {};
  if (!d.fname.trim()) e.fname = "Enter your first name.";
  if (!d.lname.trim()) e.lname = "Enter your last name.";
  if (!d.email.trim()) e.email = "Enter your email.";
  else if (!isEmail(d.email)) e.email = "Enter a valid email address.";
  if (!d.institution.trim()) e.institution = "Enter your institution.";
  else if (d.institution.trim().length < 3) e.institution = "Institution needs at least 3 characters.";
  if (!d.role || !REGISTRATION_ROLES.includes(d.role)) e.role = "Choose your role.";
  return e;
}

export const toPerson = (raw: unknown): PersonValue => {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<PersonValue>;
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    fname: s(r.fname),
    lname: s(r.lname),
    email: s(r.email),
    affiliation: s(r.affiliation),
    ...(r.title != null ? { title: s(r.title) } : {}),
    ...(r.department != null ? { department: s(r.department) } : {}),
    ...(Array.isArray(r.urls) ? { urls: r.urls.map(s) } : {}),
    ...(r.custom && typeof r.custom === "object"
      ? { custom: Object.fromEntries(Object.entries(r.custom).map(([k, v]) => [k, s(v)])) }
      : {}),
  };
};

export const emptyEntry = (field: FormField): string | PersonValue =>
  field.type === "person" ? { fname: "", lname: "", email: "", affiliation: "" } : "";

export const isRepeatable = (field: FormField) =>
  !!field.repeatable && ["text", "textarea", "select", "person"].includes(field.type);

/** Entry bounds [min, max]; a field that is not repeatable is exactly one. */
export function entryBounds(field: FormField): [number, number] {
  if (!isRepeatable(field)) return [1, 1];
  const max = Math.min(field.maxItems ?? 50, 50);
  const min = Math.min(Math.max(field.minItems ?? 0, field.required ? 1 : 0), max);
  return [min, max];
}

export const toEntries = (value: unknown): Array<string | PersonValue> =>
  Array.isArray(value) ? (value as Array<string | PersonValue>) : value === undefined || value === "" ? [] : [value as string | PersonValue];

/** Fields this renderer shows. Payment is its own step; file uploads are not supported here. */
export const isAskable = (f: FormField) => f.type !== "payment" && f.type !== "dropzone";

function textProblem(field: FormField, v: string): string | null {
  if (field.type === "text" && field.inputType === "email" && !isEmail(v)) return "Enter a valid email address.";
  if (field.type === "text" && field.inputType === "url" && !/^https?:\/\/\S+$/i.test(v.trim())) return "Enter a link starting with http:// or https://.";
  if (field.type === "text" && field.inputType === "number" && Number.isNaN(Number(v))) return "Enter a number.";
  if (field.maxLength && v.length > field.maxLength) return `Keep this under ${field.maxLength} characters.`;
  if (field.maxWords && wordCount(v) > field.maxWords) return `Keep this under ${field.maxWords} words.`;
  if (field.type === "select" && field.items && !field.items.some((i) => i.key === v)) return "Choose one of the options.";
  return null;
}

function personProblem(field: Extract<FormField, { type: "person" }>, p: PersonValue): string | null {
  if (!p.fname.trim() || !p.lname.trim()) return "Enter this person's first and last name.";
  if (!p.affiliation.trim()) return "Enter this person's affiliation.";
  if (field.extras?.email !== false && !isEmail(p.email)) return "Enter this person's email address.";
  return null;
}

/** Errors keyed by field id (one message per field: the first problem found). */
export function validateValues(fields: FormField[], values: Record<string, FieldValue | undefined>): Errors {
  const e: Errors = {};
  for (const field of fields.filter(isAskable)) {
    const [min, max] = entryBounds(field);
    const raw = toEntries(values[field.id]);
    const filled = raw.filter((x) => (typeof x === "string" ? x.trim() !== "" : toPerson(x).fname.trim() !== "" || toPerson(x).lname.trim() !== ""));
    // A required field needs `min` entries; an optional repeatable one may be empty, but a half-filled entry is a problem
    if (filled.length < min && (field.required || filled.length > 0)) {
      e[field.id] = isRepeatable(field) && min > 1 ? `Add at least ${min}.` : "This is required.";
      continue;
    }
    if (filled.length > max) {
      e[field.id] = `Add at most ${max}.`;
      continue;
    }
    for (const entry of filled) {
      const problem =
        field.type === "person" ? personProblem(field, toPerson(entry)) : textProblem(field, String(entry));
      if (problem) {
        e[field.id] = problem;
        break;
      }
    }
  }
  return e;
}

/** The `data` array PATCH /api/form takes: one item per askable field, plus the payment session when paid. */
export function buildSubmissionData(
  fields: FormField[],
  values: Record<string, FieldValue | undefined>,
  payment?: { fieldId: string; sessionId: string },
): { id: string; title: string; value: FieldValue }[] {
  const data: { id: string; title: string; value: FieldValue }[] = fields.filter(isAskable).map((field) => {
    if (isRepeatable(field)) {
      const entries = toEntries(values[field.id])
        .map((x) => (field.type === "person" ? toPerson(x) : String(x).trim()))
        .filter((x) => (typeof x === "string" ? x !== "" : x.fname !== "" || x.lname !== ""));
      return { id: field.id, title: field.title, value: entries };
    }
    const raw = values[field.id];
    const single = Array.isArray(raw) ? raw[0] : raw;
    return {
      id: field.id,
      title: field.title,
      value: field.type === "person" ? toPerson(single) : typeof single === "string" ? single.trim() : "",
    };
  });
  if (payment) data.push({ id: payment.fieldId, title: "payment", value: payment.sessionId });
  return data;
}
