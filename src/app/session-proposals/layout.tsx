import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Session Proposals | MCBIOS 2025",
  description:
    "A registered author can submit multiple abstracts, as long as that author is the presenting author. Authors will also have an opportunity to submit and publish a full paper for MCBIOS 2025 proceedings in Frontiers in Artificial Intelligence.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
