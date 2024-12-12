import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Accommodations | MCBIOS 2025",
  description:
    "A brief offering of nearby hotels to stay at for the duration of the conference.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
