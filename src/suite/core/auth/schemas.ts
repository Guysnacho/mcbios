import { z } from "zod";

/** Supabase's default minimum; the project's own setting is the real rule. */
export const MIN_PASSWORD = 6;

export const emailSchema = z.email({ error: "Enter a valid email address" });

export const signInSchema = z.object({
  email: emailSchema,
  // Sign-in only needs *a* password: don't reveal the password policy here
  password: z.string().min(1, { error: "Enter your password" }),
});

export const signUpSchema = z.object({
  fname: z.string().trim().min(2, { error: "Enter your given name (at least 2 characters)" }),
  lname: z.string().trim().min(2, { error: "Enter your family name (at least 2 characters)" }),
  institution: z.string().trim().min(3, { error: "Enter your institution (at least 3 characters)" }),
  email: emailSchema,
  password: z
    .string()
    .min(MIN_PASSWORD, { error: `Password must be at least ${MIN_PASSWORD} characters` }),
});

/** Linking an account from another org: the profile the suite needs, the password is theirs already. */
export const linkProfileSchema = signUpSchema.pick({ fname: true, lname: true, institution: true });

export const resetSchema = z.object({ email: emailSchema });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

/** Field -> first message, for inline errors. Null when the data is valid. */
export function fieldErrors<T extends z.ZodType>(
  schema: T,
  data: unknown,
): Record<string, string> | null {
  const result = schema.safeParse(data);
  if (result.success) return null;
  const out: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
