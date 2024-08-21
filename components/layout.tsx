import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Providers } from "@/providers/Providers";
import Nav2 from "./Nav2";

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
  // const { data, error } = useSWR('/auth/user', fetcher)
  return (
    <Providers>
      <Nav />
      <Nav2 />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
