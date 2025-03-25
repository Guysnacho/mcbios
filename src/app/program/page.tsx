"use client";

import { FocusCard } from "@/components/FocusCard";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Page() {
  return (
    <VStack
      minH="2xl"
      className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]"
    >
      <Box
        w="full"
        className="flex flex-col row-start-2 items-center sm:items-start"
        gap={5}
      >
        {/* Hero Section */}
        <Flex
          w={"full"}
          h={"40vh"}
          backgroundImage={"/campus_bg.jpg"}
          backgroundSize={"cover"}
          backgroundPosition={"top center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={[4, null, null, 8]}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack
              maxW={"3xl"}
              align={"flex-start"}
              spacing={4}
              textAlign="center"
              borderRadius={10}
              px={[15, null, 20]}
              py={6}
              bgColor={"blackAlpha.500"}
            >
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                Conference Program
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* block quote */}
        <HStack my={5} mx="auto" w={["80%", null, "50%", "40%"]}>
          <FocusCard blurb="Below you will be able to find the sessions that will be held during the conference. All of which cover exciting and novel developments in the field." />
        </HStack>

        <Box
          className="space-y-5"
          mx="auto"
          my={10}
          w={["80%", null, "65%", "55%"]}
        >
          <Heading size="lg" color="blue.700" textAlign="center">
            2025 Conference Program
          </Heading>
          
          <Text textAlign="center">
            Data-Driven Discovery: Harnessing the power of AI to transform
            health
          </Text>

          <p className="text-center mx-auto w-4/5 md:w-3/5">
            Below you can a breakdown of conference events throughout the day.
          </p>
          <Booklet />
        </Box>
      </Box>
    </VStack>
  );
}

const Booklet = () => (
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <Box
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "750px",
      }}
    >
      <Viewer
        plugins={[defaultLayoutPlugin()]}
        fileUrl="/program/MCBIOS2025_Program.pdf"
      />
      ;
    </Box>
  </Worker>
);
