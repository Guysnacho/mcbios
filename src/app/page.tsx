import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Speakers } from "@/components/Speakers";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--maroon)] via-[var(--pink)] to-[var(--off-white)]">
      <Hero />
      <Speakers />
      <About />
      {/* <Registration /> */}
      {/* <Schedule /> */}
    </div>
  );
}
