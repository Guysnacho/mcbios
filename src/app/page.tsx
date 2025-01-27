"use client";

import KeyDates from "@/components/KeyDates";
import KeynoteSpeakers from "@/components/KeynoteSpeakers";
import ScientificSessions from "@/components/ScientificSessions";
import TutorialSpeakers from "@/components/TutorialSpeakers";
import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import localFont from "next/font/local";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Hero Section */}
        <Flex
          id="sunm"
          flexFlow="column"
          w={"full"}
          backgroundImage={"/Winter Campus View 2018-4.jpg"}
          backgroundSize={"cover"}
          backgroundPosition={"top center"}
        >
          <VStack
            py="16"
            h="full"
            justifyContent="center"
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack
              maxW={["90%", "80%", "md", "xl"]}
              spacing={4}
              textAlign="center"
              borderRadius={10}
              py={6}
              bgColor={"blackAlpha.500"}
              justifySelf="center"
              mx="auto"
            >
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                textUnderlineOffset={4}
                textDecorationLine="underline"
                fontSize={["3xl", null, null, "4xl"]}
              >
                MCBIOS 2025
              </Text>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["2xl", "3xl", null, "4xl"]}
              >
                Data-Driven Discovery: Harnessing the power of AI to transform
                health
              </Text>
              <Text
                mx="auto"
                w="90%"
                color={"white"}
                fontWeight={400}
                fontSize="lg"
              >
                The 21st Annual Meeting of the MidSouth Computational Biology
                and Bioinformatics Society
              </Text>
              <Divider />
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                University of Utah
              </Text>
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                March 27-29, 2025
              </Text>
              <Stack direction={["column", "row"]} mx="auto">
                <Button
                  as={Link}
                  href="/registration"
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Registration
                </Button>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "whiteAlpha.500" }}
                >
                  Program Coming Soon
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>

        {/* Important Dates (sticky on mobile) */}
        <KeyDates />
        <Divider />
        {/* Accomodation blurb */}
        <Stack
          gap={3}
          className="container mx-auto w-4/5 md:w-3/5 self-center place-content-center my-10 shadow-lg shadow-indigo-500/40 rounded-xl py-6"
        >
          <Heading size="lg" color="blue.700" textAlign="center">
            Conference Day Logistics
          </Heading>
          <p className="text-center mx-auto w-4/5 md:w-3/5">
            The conference will take place at the{" "}
            <a
              href="https://ecclesalumnihouse.utah.edu/"
              target="_blank"
              className="underline text-secondary-300"
            >
              Cleone Peterson Eccles Alumni House
            </a>
            . Directions, maps, and parking information can be found{" "}
            <a
              href="https://ecclesalumnihouse.utah.edu/directions-parking/"
              target="_blank"
              className="underline text-secondary-300"
            >
              here
            </a>
            . Parking is free on Saturday. We encourage you to take ride share
            to the conference
            {/* <a href="/accommodations" className="underline text-secondary-300">
              {" "}accommodations page
            </a> */}
            !
          </p>
        </Stack>
        <VStack w="full" align="center" gap={0}>
          {/* Keynote Speakers */}
          <KeynoteSpeakers />

          {/* Invited Speakers */}
          <TutorialSpeakers />
          <ScientificSessions />
        </VStack>
      </main>
      {/* @ts-expect-error marquee is disabled */}
      <HStack as="marquee" justifyItems="space-evenly" my="3">
        <Heading
          size="lg"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          More invited speakers will be announced soon
        </Heading>
      </HStack>
    </div>
  );
}
