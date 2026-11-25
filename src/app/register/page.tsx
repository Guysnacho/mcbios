import { suiteConfig } from "@/suite/config";
import { RegistrationForm } from "@/suite/ui/RegistrationForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Registration" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <h1 className="text-4xl">Registration</h1>
      <p>Register for MCBIOS 2027, March 17–19, 2027, in Irving, Texas.</p>
      <RegistrationForm config={suiteConfig} />
    </div>
  );
}
