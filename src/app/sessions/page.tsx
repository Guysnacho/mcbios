import {
  DeadlineNotice,
  SubmitPanel,
  TopicExplorer,
} from "@/components/SessionsClient";
import { CheckCircle2, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Session Proposals" };

const FORMATS = [
  {
    title: "Technical Session",
    desc: "Invited talks and late-breaking research presentations",
  },
  { title: "Tutorial", desc: "Step-by-step software tools and workflow demos" },
  { title: "Workshop", desc: "Hands-on coding or computational exercises" },
  {
    title: "Panel Discussion",
    desc: "Moderated debate on ethics, AI standards, or policy",
  },
];

const GUIDELINES = [
  "Standard sessions are scheduled for 80 minutes.",
  "Up to 3 additional co-speakers per session.",
  "Session presentations are expected in person.",
];

export default function SessionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      <header className="text-center space-y-4">
        <span className="badge badge-outline">Call for sessions</span>
        <h1 className="text-4xl sm:text-5xl">
          Lead a session at <span className="text-primary">MCBIOS 2027</span>
        </h1>
        <DeadlineNotice />
      </header>

      <div className="card card-border bg-base-100/80 backdrop-blur-md max-w-4xl mx-auto">
        <div className="card-body space-y-2 text-lg">
          <p>
            We warmly welcome you to submit a session proposal for MCBIOS 2027.
            The conference theme,{" "}
            <strong>
              &ldquo;The Role of Artificial Intelligence in Biology and
              Medicine&rdquo;
            </strong>
            , highlights data science, machine learning, and AI applied across
            disease biology, computational drug discovery, precision oncology,
            and clinical informatics.
          </p>
          <p>
            Please help spread the word about MCBIOS 2027 across your
            departments and professional networks. We look forward to seeing you
            in 2027!
          </p>
          <div className="divider my-1" />
          <p className="font-bold">Inimary Toby-Ogundeji, PhD</p>
        </div>
      </div>

      <TopicExplorer />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card card-border bg-base-100/80 backdrop-blur-md">
          <div className="card-body">
            <h2 className="card-title">
              <Layers className="size-5 text-secondary" /> Session formats
              <span className="badge badge-warning badge-soft">
                TBC for 2027
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FORMATS.map((f) => (
                <div key={f.title} className="rounded-box bg-base-200 p-3">
                  <div className="font-bold text-secondary">{f.title}</div>
                  <div className="text-sm opacity-80">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-border bg-base-100/80 backdrop-blur-md">
          <div className="card-body">
            <h2 className="card-title">
              <CheckCircle2 className="size-5 text-primary" /> Guidelines
              <span className="badge badge-warning badge-soft">
                TBC for 2027
              </span>
            </h2>
            <ul className="list">
              {GUIDELINES.map((g) => (
                <li key={g} className="list-row">
                  <span className="status status-primary mt-2" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <SubmitPanel />
    </div>
  );
}
