import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} style={{ width: "100%" }}>
        <Nav />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
