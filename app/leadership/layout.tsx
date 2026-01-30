import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCBIOS Leadership",
  description:
    "MCBIOS is a non-profit organization founded in 2003. Here you can find the board that makes this society operate.",
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
