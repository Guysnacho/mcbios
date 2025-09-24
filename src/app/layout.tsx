import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCBIOS 2026 - Bridging Data, AI, and Innovation to Transform Health",
  description:
    "Join us at MCBIOS 2026 in Florida for cutting-edge discussions on computational biology, AI in healthcare, and innovative data solutions.",
  keywords:
    "computational biology, AI, healthcare, data science, bioinformatics, machine learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <div className="bg-linear-to-r from-[#f4d7de] to-[#a0aef8]">
            <div className="min-h-screen bg-gradient-to-b from-[var(--maroon)] via-[var(--pink)] to-[var(--off-white)]">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
