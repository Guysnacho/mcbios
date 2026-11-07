"use client";

import { NAV_ITEMS } from "@/lib/site";
import { Dna, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function closeDropdown() {
  (document.activeElement as HTMLElement | null)?.blur();
}

export function Navbar() {
  const pathname = usePathname();

  const links = NAV_ITEMS.map((item) => (
    <li key={item.href}>
      <Link
        href={item.href}
        className={pathname === item.href ? "menu-active" : undefined}
        onClick={closeDropdown}
      >
        {item.label}
      </Link>
    </li>
  ));

  return (
    <header className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-60 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl gap-2">
          <Dna className="size-6 text-primary" />
          <span>
            MCBIOS <span className="text-primary">2027</span>
          </span>
        </Link>
      </div>

      <nav className="navbar-center hidden lg:flex" aria-label="Main">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </nav>

      <div className="navbar-end gap-2">
        <label
          className="swap swap-rotate btn btn-ghost btn-circle"
          aria-label="Toggle light and dark theme"
        >
          <input
            type="checkbox"
            value="mcbios-light"
            className="theme-controller"
          />
          <Moon className="swap-on size-5" />
          <Sun className="swap-off size-5" />
        </label>
        <Link
          href="/sessions"
          className="btn btn-primary hidden sm:inline-flex"
        >
          Submit Proposal
        </Link>
      </div>
    </header>
  );
}
