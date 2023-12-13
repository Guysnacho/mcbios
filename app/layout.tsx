import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import type { Metadata } from "next";
import { Providers } from "./Providers";
import "./globals.css";

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });
// const josefin_slab = Josefin_Slab({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-josefin",
// });

export const metadata: Metadata = {
  title: "MCBIOS",
  description:
    "MCBIOS | MidSouth Computational Biology and Bioinformatics Society",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
