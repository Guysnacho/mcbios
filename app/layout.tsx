import { Nav } from "@/components/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";

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
      <body className={inter.className}>
        <Nav />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
