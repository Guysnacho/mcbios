"use client";

import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";

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
    </VStack>
  );
}
