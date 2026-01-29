import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCBIOS | MidSouth Computational Biology and Bioinformatics Society",
  description:
    "MCBIOS is a non-profit organization founded in 2003. What began as a grassroots effort led by a small group of researchers at the FDA NCTR (located in Little Rock, Arkansas) has since grown significantly. We are now one of only two regional societies in North America (alongside GLBIO) affiliated with ISCB, the world's largest bioinformatics society.",
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
