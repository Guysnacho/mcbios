import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "YSEA | MCBIOS 2025",
  description:
    "MCBIOS 2025 Young Scientist Excellence Award instructions. Applications from students and postdoctoral fellows will be rigorously evaluated. The top four candidates will be invited to give an oral presentation in a session dedicated to this award program.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
