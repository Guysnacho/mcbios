import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://mcbios.org"),
  title: {
    default: "MCBIOS | MidSouth Computational Biology and Bioinformatics Society",
    template: "%s | MCBIOS",
  },
  description:
    "MCBIOS is a non-profit organization founded in 2003. One of only two regional societies in North America affiliated with ISCB, the world's largest bioinformatics society.",
  keywords: [
    "bioinformatics",
    "computational biology",
    "MidSouth",
    "MCBIOS",
    "ISCB",
    "conference",
    "research",
    "genomics",
    "data science",
  ],
  openGraph: {
    siteName: "MCBIOS",
    type: "website",
    images: [{ url: "/images/logo.jpg", alt: "MCBIOS Logo" }],
  },
  twitter: {
    card: "summary",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Nav />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
