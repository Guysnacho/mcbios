import { Nav } from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "MCBIOS Member Dashboard | MidSouth Computational Biology and Bioinformatics Society",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-gray-100">
      <main className="h-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Add dashboard nav */}
          <Nav />
          {children}
        </div>
      </main>
    </div>
  );
}
