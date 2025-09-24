"use client"

import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Registration } from "@/components/Registration";
import { Schedule } from "@/components/Schedule";
import { Speakers } from "@/components/Speakers";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear-gradient(to bottom, #4f1725, #9e2e4a, #f9f2eb)"
    >
      <Header />
      <Box as="main">
        <Hero />
        <About />
        <Speakers />
        <Schedule />
        <Registration />
      </Box>
      <Footer />
    </Box>
  );
}
