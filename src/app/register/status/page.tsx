import { suiteConfig } from "@/suite/config";
import { PaymentStatus } from "@/suite/ui/PaymentStatus";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Registration status" };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { session_id } = await searchParams;
  const sessionId = typeof session_id === "string" ? session_id : null;
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <h1 className="text-4xl">Registration status</h1>
      <PaymentStatus config={suiteConfig} sessionId={sessionId} />
    </div>
  );
}
