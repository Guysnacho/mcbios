import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Attractions | MCBIOS 2025",
  description:
    "There are several attractions that you can enjoy throughout the city. Specifically there are ski resorts that we'd love to recommend.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
