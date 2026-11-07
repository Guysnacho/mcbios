import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Abstracts" };

export default function Page() {
  return (
    <ComingSoon title="Abstracts">
      Abstract submission details for MCBIOS 2027 will be announced soon.
    </ComingSoon>
  );
}
