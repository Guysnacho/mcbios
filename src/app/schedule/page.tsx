import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Schedule" };

export default function Page() {
  return (
    <ComingSoon title="Schedule">
      The program, including hands-on workshops and networking, will be
      published as planning progresses.
    </ComingSoon>
  );
}
