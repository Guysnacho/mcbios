import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Nav />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
