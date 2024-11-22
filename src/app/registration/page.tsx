"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import localFont from "next/font/local";
import { ReactNode, useState } from "react";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Page() {
  const [registrationOpen] = useState(true);
  return (
    <VStack className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Box
        w="full"
        className="flex flex-col row-start-2 items-center sm:items-start"
      >
        {/* <Logo /> */}
        {/* Hero Section */}
        <Flex
          w={"full"}
          h={"40vh"}
          backgroundImage={"/Winter Campus View 2018-4.jpg"}
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
                Conference Registration
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* YSEA Instructions */}
        <SimpleGrid
          w="full"
          mx="auto"
          justifyContent="space-evenly"
          py="20"
          bgGradient="linear(to-br, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
          columns={{ base: 1, lg: 2 }}
          spacing={10}
        >
          <VStack w={{ base: "90%", lg: "75%" }} mx="auto" spacing={5}>
            <Heading size="lg" color="blue.800">
              Information Regarding Registration
            </Heading>
            <Text>
              Payment is expected at the time of registration (Credit or Debit
              Card). Demographic information gathered during registration will
              be aggregated and utilized by MCBIOS for grant applications.
              Member&apos;s information is never shared or sold.
            </Text>
            <Text>
              All three types of registration include complimentary 1-year
              MCBIOS membership, which provides access to workshops and
              collaborative projects hosted by MCBIOS throughout the year.
            </Text>
          </VStack>
          <VStack
            w={{ base: "90%", lg: "50%" }}
            mx="auto"
            justifyContent="space-around"
          >
            <Card
              w={{ base: "full", md: "md" }}
              _hover={{ shadow: "xl", borderColor: "blue.600" }}
              borderColor="blue.400"
              borderWidth={0.5}
            >
              <CardBody>
                <Stack spacing="3">
                  <Heading
                    size="xl"
                    color="blue.800"
                    textAlign="center"
                    className={geistMono.className}
                  >
                    MCBIOS 2024 Registration
                  </Heading>
                  <Text mx="auto" fontSize="lg">
                    To register for the 2024 Conference, create your MCBIOS
                    account and select your registration type. Secure payment
                    processing powered by Stripe Checkout.
                  </Text>
                  <Button
                    as={Link}
                    mx="auto"
                    href="https://mcbios.com/membership"
                    target="_blank"
                    bg={"blue.400"}
                    rounded={"full"}
                    color={"white"}
                    _hover={{ bg: "blue.500" }}
                  >
                    Register Today!
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}

const TextHighlight = ({ children }: { children: ReactNode }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const blurbs = [
  {
    title: "Application and Evaluation Process",
    content: (
      <>
        Applications from students and postdoctoral fellows will be rigorously
        evaluated. The <TextHighlight>top four candidates</TextHighlight> will
        be invited to give an oral presentation in a session dedicated to this
        award program.
        <br />
        <br />
        In addition to an abstract, participation in this program requires
        submission of two additional documents: <br />
      </>
    ),
    list: [
      "A description of the innovation of the research (150 words or less).",
      "An explanation of the individual's contribution to the work being presented (150 words or less).",
    ],
  },
  {
    title: "Selection Criteria",
    content: (
      <>
        The selection of the top four candidates is based on an evaluation by
        the MCBIOS board members, who assess{" "}
        <TextHighlight>the quality and impact</TextHighlight> of the research.
        After the oral presentations, a panel of judges (including keynote
        speakers) selects the finalists.
        <br />
        <br /> The primary consideration for awarding is the quality of the
        professional presentation. Applicants demonstrating a multidisciplinary
        contribution and initiative receive preference during the final
        selection process.
      </>
    ),
  },
  {
    title: "Award Announcement",
    content: <>The awards will be announced during the final luncheon.</>,
  },
];
