import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accommodations" };

export default function Page() {
  return (
    <ComingSoon title="Accommodations">
      Venue and travel information will be announced soon.
    </ComingSoon>
  );
}
