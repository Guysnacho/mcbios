"use client";

import { useEffect } from "react";
import { useAuth } from "../react/AuthProvider";
import { ui } from "./classes";

/** Announces the result of an auth action after the dialog closes, then goes away. */
export function AuthNotice() {
  const { notice, dismissNotice } = useAuth();

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(dismissNotice, 7000);
    return () => clearTimeout(t);
  }, [notice, dismissNotice]);

  // The live region stays mounted so screen readers announce the text when it appears
  return (
    <div className={ui.notice} role="status" aria-live="polite">
      {notice && (
        <div className={ui.noticeBody}>
          <span>{notice}</span>
          <button type="button" className="btn btn-ghost btn-xs" onClick={dismissNotice}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
