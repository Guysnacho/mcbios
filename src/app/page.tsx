import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Speakers } from "../components/Speakers";
import { Schedule } from "../components/Schedule";
import { Registration } from "../components/Registration";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--maroon)] via-[var(--pink)] to-[var(--off-white)]">
      <Header />
      <Header />
      <main>
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}