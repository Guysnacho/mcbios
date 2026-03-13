import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the board of directors, officers, and past presidents guiding the MidSouth Computational Biology and Bioinformatics Society (MCBIOS).",
  keywords: [
    "MCBIOS board",
    "bioinformatics leadership",
    "MidSouth society board",
    "computational biology directors",
    "MCBIOS president",
  ],
  openGraph: {
    title: "MCBIOS Leadership",
    description:
      "Meet the board of directors, officers, and past presidents guiding the MidSouth Computational Biology and Bioinformatics Society.",
    type: "website",
  },
  twitter: {
    title: "MCBIOS Leadership",
    description:
      "Meet the board of directors and leadership guiding MCBIOS.",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
