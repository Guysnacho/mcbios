import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accommodations" };

export default function Page() {
  return (
    <ComingSoon title="Accommodations">
      MCBIOS 2027 will be held at the University of Dallas in Irving, Texas.
      Travel and lodging information will be announced soon.
    </ComingSoon>
  );
}
