"use client";

import { FocusCard } from "@/components/FocusCard";
import {
  Box,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack
      minH="2xl"
      className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]"
    >
      <Box
        w="full"
        className="flex flex-col row-start-2 items-center sm:items-start"
      >
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
                Accommodations
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* block quote */}
        <HStack my={5} mx="auto" w={["80%", null, "50%", "40%"]}>
          <FocusCard
            title="Quick Notes"
            blurb="A few recommendations on nearby hotels are provided for you to use
            for the duration of the conference.||Being near the venue may ease
            time and traffic concerns so we urge you to consider distance when
            ultimately selecting your accommodations, whether they are the below
            or not."
          />
        </HStack>

        {/* Accommodations */}
        <Center gap={5} mx="auto"></Center>
      </Box>
    </VStack>
  );
}
