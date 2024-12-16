import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "About Us | MCBIOS 2025",
  description: "Learn more about the MCBIOS 2025 team!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
