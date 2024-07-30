"use server";

import { z } from "zod";
import { createClient } from "../utils/supabase/server";

const AuthSchema = z.object({
  email: z.string().email().describe("Email // Invalid email provided"),
  password: z.string().min(6).describe("Password // Invalid password provided"),
});

export const login = async (formData: FormData) => {
  const input = AuthSchema.parse(formData.get("login"));

  if (!input.email && !input.password) {
    throw new Error("Invalid email or password provided");
  }

  // const { data, error } = await supabase.auth.signUp({ email, password, options: {} });
  const client = createClient();
  const { error } = await client.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) {
    throw new Error(error.message);
  } else {
    return;
  }
};

export const signup = async (formData: FormData) => {
  const input = AuthSchema.parse(formData.get("login"));

  if (!input.email && !input.password) {
    throw new Error("Invalid email or password provided");
  }

  // const { data, error } = await supabase.auth.signUp({ email, password, options: {} });
  const client = createClient();
  const { error } = await client.auth.signUp({
    email: input.email,
    password: input.password,
  });
  if (error) {
    throw new Error(error.message);
  } else {
    return;
  }
};
