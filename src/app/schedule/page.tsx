import { suiteConfig } from "@/suite/config";
import { SchedulePage } from "@/suite/ui/SchedulePage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule" };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <h1 className="text-4xl print:hidden">Schedule</h1>
      <SchedulePage config={suiteConfig} />
    </div>
  );
}
