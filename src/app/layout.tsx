import { Footer } from "@/components/Footer";
import { HelixBackground } from "@/components/HelixBackground";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import { Amiko, Bacasime_Antique } from "next/font/google";
import "./globals.css";

const bacasime = Bacasime_Antique({
  variable: "--font-bacasime",
  subsets: ["latin"],
  weight: "400",
});

const amiko = Amiko({
  variable: "--font-amiko",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "MCBIOS 2027 | The Role of AI in Biology and Medicine",
    template: "%s | MCBIOS 2027",
  },
  description:
    "MCBIOS 2027, March 17-19, 2027. New intelligence. Deeper biological insights. Better medicine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bacasime.variable} ${amiko.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HelixBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
