"use client";

import { Plus, Trash2 } from "lucide-react";
import { useId } from "react";
import { emptyEntry, entryBounds, isRepeatable, toEntries, toPerson } from "../core/registration/validation";
import type { FieldValue, FormField, PersonValue } from "../core/registration/types";
import { ui } from "./classes";

type Common = {
  field: FormField;
  value: FieldValue | undefined;
  error?: string;
  onChange: (v: FieldValue) => void;
};

const labelOf = (item: { key: string; label?: unknown }) => (typeof item.label === "string" && item.label ? item.label : item.key);

function describedBy(id: string, hasHint: boolean, error?: string) {
  const ids = [hasHint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return ids || undefined;
}

/** A single-value input (text, textarea, select) with its label, hint and error wired up. */
function SingleInput({
  field,
  id,
  label,
  value,
  onChange,
  error,
  hint,
  hideLabel,
}: {
  field: FormField;
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
}) {
  const aria = { "aria-invalid": !!error, "aria-describedby": describedBy(id, !!hint, error), "aria-required": field.required || undefined };
  const inputType = field.type === "text" ? field.inputType : undefined;
  return (
    <div className={ui.field}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : ui.label}>
        {label}
        {field.required && !hideLabel && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-base-content/70">
          {hint}
        </p>
      )}
      {field.type === "textarea" ? (
        <textarea id={id} className={`${ui.textarea} ${error ? ui.inputInvalid : ""}`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} {...aria} />
      ) : field.type === "select" ? (
        <select id={id} className={`${ui.select} ${error ? ui.inputInvalid : ""}`} value={value} onChange={(e) => onChange(e.target.value)} {...aria}>
          <option value="">Choose one</option>
          {field.items.map((i) => (
            <option key={i.key} value={i.key}>
              {labelOf(i)}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className={`${ui.input} ${error ? ui.inputInvalid : ""}`}
          type={inputType === "email" ? "email" : inputType === "url" ? "url" : inputType === "number" ? "number" : "text"}
          autoComplete={inputType === "email" ? "email" : "off"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.type === "text" ? field.placeholder : undefined}
          {...aria}
        />
      )}
      {error && (
        <p id={`${id}-error`} className={ui.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

function PersonInputs({
  field,
  idBase,
  person,
  onChange,
  legend,
}: {
  field: Extract<FormField, { type: "person" }>;
  idBase: string;
  person: PersonValue;
  onChange: (p: PersonValue) => void;
  legend: string;
}) {
  const set = (patch: Partial<PersonValue>) => onChange({ ...person, ...patch });
  const input = (key: "fname" | "lname" | "email" | "affiliation" | "title" | "department", label: string, type = "text") => (
    <div className={ui.field}>
      <label htmlFor={`${idBase}-${key}`} className={ui.label}>
        {label}
      </label>
      <input id={`${idBase}-${key}`} type={type} className={ui.input} value={(person[key] as string | undefined) ?? ""} onChange={(e) => set({ [key]: e.target.value })} autoComplete="off" />
    </div>
  );
  return (
    <fieldset className={ui.fieldset}>
      <legend className={ui.legend}>{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {input("fname", "First name")}
        {input("lname", "Last name")}
      </div>
      {field.extras?.email !== false && input("email", "Email", "email")}
      {input("affiliation", "Affiliation")}
      {field.extras?.title && input("title", "Title")}
      {field.extras?.department && input("department", "Department")}
      {field.customFields?.map((c) => (
        <div key={c.id} className={ui.field}>
          <label htmlFor={`${idBase}-c-${c.id}`} className={ui.label}>
            {c.label}
          </label>
          <input
            id={`${idBase}-c-${c.id}`}
            className={ui.input}
            value={person.custom?.[c.id] ?? ""}
            onChange={(e) => set({ custom: { ...person.custom, [c.id]: e.target.value } })}
            autoComplete="off"
          />
        </div>
      ))}
    </fieldset>
  );
}

/** One form question: text, textarea, select or person, optionally repeatable ("add another"). */
export function FieldInput({ field, value, error, onChange }: Common) {
  const id = useId();
  const hint = field.description || undefined;

  if (!isRepeatable(field)) {
    if (field.type === "person") {
      const single = Array.isArray(value) ? value[0] : value;
      return (
        <div className="flex flex-col gap-1">
          {hint && <p className="text-sm text-base-content/70">{hint}</p>}
          <PersonInputs field={field} idBase={id} person={toPerson(single)} onChange={onChange} legend={`${field.title}${field.required ? " *" : ""}`} />
          {error && (
            <p role="alert" className={ui.fieldError}>
              {error}
            </p>
          )}
        </div>
      );
    }
    const single = Array.isArray(value) ? value[0] : value;
    return <SingleInput field={field} id={id} label={field.title} value={typeof single === "string" ? single : ""} onChange={onChange} error={error} hint={hint} />;
  }

  const [min, max] = entryBounds(field);
  const entries = toEntries(value);
  // An optional list starts empty ("Add a guest"); a required one starts with the entries it needs
  const shown = entries.length >= min ? entries : [...entries, ...Array.from({ length: min - entries.length }, () => emptyEntry(field))];
  const itemLabel = field.itemLabel || "Entry";
  const update = (next: Array<string | PersonValue>) => onChange(next);

  return (
    <fieldset className="flex flex-col gap-3" aria-describedby={describedBy(id, !!hint, error)}>
      <legend className={ui.label}>
        {field.title}
        {field.required && <span aria-hidden="true"> *</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-base-content/70">
          {hint}
        </p>
      )}
      {shown.map((entry, i) => {
        const n = i + 1;
        const canRemove = shown.length > min;
        return (
          <div key={i} className="flex flex-col gap-2">
            {field.type === "person" ? (
              <PersonInputs field={field} idBase={`${id}-${i}`} person={toPerson(entry)} onChange={(p) => update(shown.map((e, j) => (j === i ? p : e)))} legend={`${itemLabel} ${n}`} />
            ) : (
              <SingleInput
                field={field}
                id={`${id}-${i}`}
                label={`${field.title}, ${itemLabel.toLowerCase()} ${n}`}
                hideLabel
                value={typeof entry === "string" ? entry : ""}
                onChange={(v) => update(shown.map((e, j) => (j === i ? v : e)))}
              />
            )}
            {canRemove && (
              <button type="button" className="btn btn-ghost btn-sm self-start" onClick={() => update(shown.filter((_, j) => j !== i))}>
                <Trash2 className="size-4" aria-hidden="true" /> Remove {itemLabel.toLowerCase()} {n}
              </button>
            )}
          </div>
        );
      })}
      {shown.length < max && (
        <button type="button" className="btn btn-outline btn-sm self-start" onClick={() => update([...shown, emptyEntry(field)])}>
          <Plus className="size-4" aria-hidden="true" /> Add {shown.length > 0 ? "another " : "a "}
          {itemLabel.toLowerCase()}
        </button>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={ui.fieldError}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
