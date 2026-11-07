import { Countdown } from "@/components/Countdown";
import { KEY_DATES } from "@/lib/site";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Globe,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";

const COMING_UP = [
  {
    href: "/register",
    title: "Registration",
    badge: "Opens Jan 8",
    desc: "Register for three days of sessions, workshops, and networking.",
    Icon: Users,
  },
  {
    href: "/abstracts",
    title: "Abstracts",
    badge: "Coming soon",
    desc: "Oral and poster presentation opportunities for all members.",
    Icon: BookOpen,
  },
  {
    href: "/ysea",
    title: "YSEA",
    badge: "Coming soon",
    desc: "Young Scientist Excellence Podium and Poster Awards for graduate students and postdocs.",
    Icon: Award,
  },
  {
    href: "/schedule",
    title: "Schedule",
    badge: "Coming soon",
    desc: "Workshops, networking, and the full three-day program.",
    Icon: Layers,
  },
  {
    href: "/accommodations",
    title: "Accommodations",
    badge: "Coming soon",
    desc: "Venue and travel details will be announced.",
    Icon: Globe,
  },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="hero min-h-[80vh]">
        <div className="hero-content text-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-6xl sm:text-7xl">
              MCBIOS <span className="text-primary">2027</span>
            </h1>
            <div className="badge badge-lg badge-outline gap-2">
              <Calendar className="size-4" /> March 17–19, 2027
            </div>
            <h2 className="text-3xl sm:text-4xl">
              The Role of Artificial Intelligence in{" "}
              <span className="text-primary">Biology and Medicine</span>
            </h2>
            <p className="text-xl italic opacity-80">
              New intelligence. Deeper biological insights. Better medicine.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/sessions" className="btn btn-primary btn-lg">
                Submit a session proposal <ArrowRight className="size-5" />
              </Link>
              <button className="btn btn-lg" disabled>
                <Clock className="size-5" /> Registration opens Jan 8
              </button>
            </div>
            <div className="max-w-xl mx-auto">
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* Key dates */}
      <section className="mx-auto max-w-6xl px-4 space-y-8">
        <h2 className="text-3xl text-center">Key conference dates</h2>
        <ul className="timeline timeline-vertical lg:timeline-horizontal">
          {KEY_DATES.map((d, i) => (
            <li key={d.label}>
              {i > 0 && <hr />}
              <div className="timeline-start font-bold">{d.date}</div>
              <div className="timeline-middle">
                <span
                  className={`status status-lg ${d.tbd ? "" : "status-primary"}`}
                />
              </div>
              <div
                className={`timeline-end timeline-box ${d.tbd ? "opacity-60" : ""}`}
              >
                {d.label}
              </div>
              {i < KEY_DATES.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </section>

      {/* About the theme */}
      <section className="mx-auto max-w-3xl px-4 space-y-4 text-center">
        <h2 className="text-3xl">
          Late-breaking <span className="text-primary">AI in biology</span>
        </h2>
        <p className="text-lg">
          MCBIOS 2027 features late-breaking research on data science, machine
          learning, and artificial intelligence applied to disease biology
          modeling, genomics, systems biology, translational bioinformatics,
          computational drug discovery, and clinical informatics, all aimed at
          improving human health.
        </p>
      </section>

      {/* Call for session proposals */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="card card-border bg-base-200/80 backdrop-blur-md lg:card-side">
          <div className="card-body">
            <span className="badge badge-secondary badge-soft">
              Call for proposals
            </span>
            <h2 className="card-title text-3xl">
              Shape the MCBIOS 2027 program
            </h2>
            <p>
              We welcome session proposals across 16 suggested topics, from drug
              discovery and precision oncology to single-cell genomics and LLMs
              for drug safety. Proposals are due December 15, 2026.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">AI in drug discovery</span>
              <span className="badge badge-outline">Single-cell genomics</span>
              <span className="badge badge-outline">Precision oncology</span>
            </div>
            <div className="card-actions">
              <Link href="/sessions" className="btn btn-outline">
                See topics and submit <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coming up */}
      <section className="mx-auto max-w-6xl px-4 space-y-8">
        <h2 className="text-3xl text-center">
          What&apos;s <span className="text-primary">coming up</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMING_UP.map(({ href, title, badge, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="card card-border bg-base-100/80 backdrop-blur-md transition hover:border-primary"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-primary" />
                  <span className="badge badge-outline">{badge}</span>
                </div>
                <h3 className="card-title">{title}</h3>
                <p className="opacity-80">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About MCBIOS */}
      <section className="mx-auto max-w-3xl px-4 space-y-4 text-center">
        <h2 className="text-3xl">
          About the <span className="text-primary">MCBIOS Society</span>
        </h2>
        <p className="text-lg">
          MCBIOS is a non-profit founded in 2003 and one of only two regional
          North American societies affiliated with ISCB, the world&apos;s
          largest bioinformatics society. Its mission is to foster networking,
          collaboration, and professional development at every career level.
        </p>
        <Link href="/about" className="btn btn-link">
          Learn more about MCBIOS <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
