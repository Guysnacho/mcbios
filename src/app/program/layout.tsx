import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Program | MCBIOS 2025",
  description:
    "A listing of the full conference program.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
