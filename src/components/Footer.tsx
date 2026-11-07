import { MAIN_SITE_URL, NAV_ITEMS } from "@/lib/site";
import { Calendar, Dna, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer footer-vertical sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside className="max-w-xs gap-2">
        <div className="flex items-center gap-2 text-xl">
          <Dna className="size-6 text-primary" />
          MCBIOS 2027
        </div>
        <p>
          MidSouth Computational Biology and Bioinformatics Society. Fostering
          collaboration and scientific excellence since 2003.
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          March 17-19, 2027
        </p>
        <p className="opacity-70">Venue details coming soon</p>
      </aside>

      <nav>
        <h6 className="footer-title">Conference</h6>
        <Link href="/" className="link link-hover">
          Home
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="link link-hover">
            {item.label}
          </Link>
        ))}
        <Link href="/register" className="link link-hover">
          Registration
        </Link>
      </nav>

      <nav>
        <h6 className="footer-title">Society</h6>
        <a
          href={MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover inline-flex items-center gap-1"
        >
          mcbios.com <ExternalLink className="size-3.5" />
        </a>
        <a
          href={`${MAIN_SITE_URL}/bylaws`}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          Bylaws
        </a>
      </nav>
    </footer>
  );
}
