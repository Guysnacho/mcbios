import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { VeinBackground } from "@/components/VeinBackground";
import type { Metadata } from "next";
import { Bacasime_Antique } from "next/font/google";
import "./globals.css";

const bacasime = Bacasime_Antique({
  variable: "--font-bacasime",
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
    <html lang="en" className={`${bacasime.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <VeinBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
