"use client";

import {
  PROPOSAL_DEADLINE_LABEL,
  SESSION_PROPOSAL_URL,
  SUGGESTED_TOPICS,
} from "@/lib/site";
import {
  AlertCircle,
  Clock,
  ExternalLink,
  Info,
  Search,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useDeadlinePassed } from "./Countdown";

export function DeadlineNotice() {
  const passed = useDeadlinePassed();
  return passed ? (
    <div role="alert" className="alert alert-error inline-flex">
      <AlertCircle className="size-5" />
      <span>
        Proposal deadline: <strong>CLOSED</strong>
      </span>
    </div>
  ) : (
    <div role="alert" className="alert alert-info alert-soft inline-flex">
      <Clock className="size-5" />
      <span>
        Proposal deadline: <strong>{PROPOSAL_DEADLINE_LABEL}</strong>
      </span>
    </div>
  );
}

export function TopicExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(SUGGESTED_TOPICS.map((t) => t.category)),
  ];

  const q = search.toLowerCase();
  const topics = SUGGESTED_TOPICS.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      (t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl">Suggested topics</h2>
          <p className="opacity-70">Pitch one of these or propose your own.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="input">
            <Search className="size-4 opacity-60" />
            <input
              type="search"
              placeholder="Search topics"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((t) => (
          <div
            key={t.id}
            className="card card-border bg-base-100/80 backdrop-blur-md"
          >
            <div className="card-body flex-row items-start gap-4">
              <span className="badge badge-primary badge-soft badge-lg shrink-0">
                {t.id}
              </span>
              <div className="space-y-1">
                <span className="badge badge-outline badge-sm">
                  {t.category}
                </span>
                <h3 className="card-title text-base">{t.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {topics.length === 0 && (
        <div role="alert" className="alert alert-soft">
          <Info className="size-5" />
          <span>No topics match your search.</span>
        </div>
      )}
    </div>
  );
}

export function SubmitPanel() {
  const passed = useDeadlinePassed();

  return (
    <div className="card card-border bg-base-200/80 backdrop-blur-md">
      <div className="card-body items-center text-center">
        <Send className="size-10 text-primary" />
        <h2 className="card-title text-3xl">Ready to submit?</h2>
        <p className="max-w-xl">
          Proposals are submitted through a Google Form. Prepare your proposal
          summary and speaker details before opening the form.
        </p>
        <div className="card-actions pt-2">
          {passed ? (
            <div role="alert" className="alert alert-error">
              Session proposals for MCBIOS 2027 are now closed. Thank you!
            </div>
          ) : SESSION_PROPOSAL_URL ? (
            <a
              href={SESSION_PROPOSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Open submission form <ExternalLink className="size-5" />
            </a>
          ) : (
            <button className="btn btn-lg" disabled>
              Submission link coming soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
