import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Registration Instructions | MCBIOS 2025",
  description:
    "MCBIOS 2025 conference registration instructions. Site and conference registrations and payments are completed on the main MCBIOS site. https://mcbios.com/membership",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
