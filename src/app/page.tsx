import { About } from "@/components/About";
import { AbstractSubmissions } from "@/components/AbstractSubmissions";
import { Hero } from "@/components/Hero";
import { Registration } from "@/components/Registration";
import { Schedule } from "@/components/Schedule";
import { SessionProposals } from "@/components/SessionProposals";
import { Speakers } from "@/components/Speakers";
import { YSEAward } from "@/components/YSEAward";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Speakers />
      <Schedule />
      <AbstractSubmissions />
      <SessionProposals />
      <YSEAward />
      <Registration />
    </>
  );
}
