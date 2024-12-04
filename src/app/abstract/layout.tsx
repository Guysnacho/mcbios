import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Abstract Submissions | MCBIOS 2025",
  description:
    "MCBIOS 2025 abstract submission instructions. Authors also have an opportunity to submit and publish a full paper for MCBIOS 2025 proceedings in Frontiers in Artificial Intelligence. The deadline for full paper submission is February 1st, 2025.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
