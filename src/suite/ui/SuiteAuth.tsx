"use client";

import type { SuiteConfig } from "../core/types";
import { AuthProvider } from "../react/AuthProvider";
import { AuthDialog } from "./AuthDialog";
import { AuthNotice } from "./AuthNotice";

/** Wrap the app once: provides auth state and renders the dialog and the notice. */
export function SuiteAuth({ config, children }: { config: SuiteConfig; children: React.ReactNode }) {
  return (
    <AuthProvider config={config}>
      {children}
      <AuthDialog />
      <AuthNotice />
    </AuthProvider>
  );
}
