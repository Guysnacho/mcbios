"use client";

import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import localFont from "next/font/local";
import Head from "next/head";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Page() {
  return (
    <VStack className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>2025 MCBIOS | Abstract Submissions</title>
        <meta
          name="description"
          content="A registered author can submit multiple abstracts, as long as that author is the presenting author. Authors will also have an opportunity to submit and publish a full paper for MCBIOS 2024 proceedings in Frontiers in Artificial Intelligence."
        />
      </Head>
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
                Abstract Submissions
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* Abstract Submissions */}
      </Box>
      <SimpleGrid
        w="full"
        mx="auto"
        justifyContent="space-evenly"
        py="20"
        bgGradient="linear(to-br, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
        columns={{ base: 1, lg: 2 }}
        spacing={10}
      >
        <VStack
          w={{ base: "90%", lg: "75%" }}
          mx="auto"
          align="stretch"
          spacing={5}
        >
          <Heading size="lg" color="blue.800">
            Abstract Submission Instructions
          </Heading>
          <Text>
            There are a limited number of spots for oral presentations. If not
            selected for oral presentation, you will automatically be considered
            for poster presentation. Oral presentations will generally be 15 min
            long and the speaker would participate in a panel question and
            answer session.
          </Text>
          <Text>
            Poster size limitation: 30&quot;W x 20&quot;H (76cm x 51cm)
          </Text>
          <Text>The deadline to submit an abstract is February 1st, 2025</Text>
        </VStack>
        <Box
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
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
