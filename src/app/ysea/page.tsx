import { ComingSoon } from "@/components/ComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Young Scientist Excellence Awards",
};

export default function Page() {
  return (
    <ComingSoon title="Young Scientist Excellence Awards">
      MCBIOS offers the Young Scientist Excellence Podium and Poster Awards for
      graduate students and postdoctoral fellows. Eligibility and deadlines will
      be announced soon.
    </ComingSoon>
  );
}
