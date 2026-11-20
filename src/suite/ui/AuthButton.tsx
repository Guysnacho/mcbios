"use client";

import { Menu } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { ChevronDown, CircleUser } from "lucide-react";
import { useAuth } from "../react/AuthProvider";
import { ui } from "./classes";

export type AccountLink = { label: string; href: string };

/** "Sign in" for visitors; an account menu (links + sign out) for members. */
export function AuthButton({ accountLinks = [] }: { accountLinks?: AccountLink[] }) {
  const auth = useAuth();

  // Reserve the space until the session is read, so the navbar doesn't jump
  if (!auth.ready) {
    return (
      <span className="btn btn-ghost invisible" aria-hidden>
        Sign in
      </span>
    );
  }

  if (!auth.user) {
    return (
      <button type="button" className="btn btn-ghost" onClick={() => auth.open("signin")}>
        Sign in
      </button>
    );
  }

  const email = auth.user.email ?? "your account";
  return (
    <Menu.Root onSelect={(d) => d.value === "signout" && void auth.signOut()} positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger className="btn btn-ghost gap-1" aria-label={`Account menu for ${email}`}>
        <CircleUser className="size-5" aria-hidden />
        <span className="hidden max-w-32 truncate sm:inline">{email}</span>
        <ChevronDown className="size-4" aria-hidden />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={ui.menuContent}>
            <p className="px-3 py-2 text-xs text-base-content/70">Signed in as {email}</p>
            {accountLinks.map((l) => (
              <Menu.Item key={l.href} value={l.href} asChild className={ui.menuItem}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </Menu.Item>
            ))}
            <Menu.Item value="signout" className={ui.menuItem}>
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
