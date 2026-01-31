import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCBIOS Membership",
  description:
    "MCBIOS is a non-profit organization founded in 2003. Here you can learn about the separate membership tiers along with other registration details.",
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
