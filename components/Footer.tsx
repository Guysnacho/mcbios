"use client";

import { ConfYears, PathMap } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  const keys = Object.keys(PathMap);

  return (
    <footer className="bg-gray-900 border-double border-t-4 border-indigo-600 mt-20">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {keys.map((route) =>
            route == "/conferences" ? (
              <div key={route} className="pb-6 flex flex-col">
                <p className="text-sm leading-6 text-white hover:text-gray-300 mb-3">
                  CONFERENCES
                </p>
                {ConfYears.map((conference) => (
                  <a
                    key={conference.year}
                    href={conference.url}
                    target="_self"
                    className="text-sm leading-6 text-white hover:text-gray-300"
                  >
                    MCBIOS {conference.year}
                  </a>
                ))}
              </div>
            ) : route == "/membership" ? (
              <div key={route} className="pb-6 flex flex-col">
                <p className="text-sm leading-6 text-white hover:text-gray-300 mb-3">
                  MEMBERSHIP
                </p>
                <a
                  href="/login"
                  target="_self"
                  className="text-sm leading-6 text-white hover:text-gray-300"
                >
                  Sign In
                </a>
                <a
                  href="/membership"
                  target="_self"
                  className="text-sm leading-6 text-white hover:text-gray-300"
                >
                  Registration
                </a>
              </div>
            ) : (
              <Link
                //@ts-ignore
                href={PathMap[route].path}
                color={path == route ? "primary" : "foreground"}
                aria-current="page"
                target="_self"
                className="text-sm leading-6 text-white hover:text-gray-300"
              >
                {/*@ts-ignore*/}
                {PathMap[route].name}
              </Link>
            )
          )}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-100">
          &copy; 2024 MCBIOS, All rights reserved.
        </p>
      </div>
    </footer>
  );
};
