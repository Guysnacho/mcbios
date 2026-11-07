import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Registration" };

export default function Page() {
  return (
    <ComingSoon title="Registration">
      The registration portal opens January 8, 2027.
    </ComingSoon>
  );
}
