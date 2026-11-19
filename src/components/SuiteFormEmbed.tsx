"use client";

import { SUITE_URL } from "@/lib/site";
import { useEffect, useState } from "react";

/**
 * A Conference Suite form rendered in place. The suite's `/embed/form/[id]`
 * route has no site chrome and posts `{ type: "cs:resize", height }` so the
 * frame grows with the form. Third-party cookies are blocked in iframes, so the
 * form always runs as a guest here: editing an existing submission means going
 * to the suite (see `suiteFormUrl`).
 */
export function SuiteFormEmbed({
  formId,
  title,
}: {
  formId: string;
  title: string;
}) {
  const [height, setHeight] = useState(720);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SUITE_URL) return;
      const d = e.data as { type?: string; height?: unknown } | null;
      if (d?.type === "cs:resize" && typeof d.height === "number") {
        setHeight(Math.max(400, Math.min(d.height, 6000)));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      src={`${SUITE_URL}/embed/form/${encodeURIComponent(formId)}`}
      title={title}
      style={{ height }}
      className="w-full rounded-box border-0 bg-transparent"
      loading="lazy"
    />
  );
}
