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
                Organizing Committee
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* <Logo /> */}
        <VStack w={["90%", "75%", "80%"]} mx="auto">
          <Heading textAlign="center" mx="auto" size={["md", null, "lg"]}>
            MidSouth Computational Biology and Bioinformatics Society (MCBIOS)
          </Heading>
        </VStack>
        {/* block quote */}
        <HStack my={5} mx="auto" w={["80%", null, "50%", "40%"]}>
          <FocusCard
            title="Quick Notes"
            blurb="MCBIOS is a non-profit organization found in 2003, started as a grassroots effort spearheaded by a small group of researchers at FDA NCTR (located in Little Rock, Arkansas). It has since been expanded significantly. It is now one of only two regional societies in North America (with GLBIO) affiliated with ISCB, the biggest international bioinformatics society.||||The mission of MCBIOS is to foster networking and collaboration and to promote the professional development of members and supporting our student members. The annual conference is the flagship event for MCBIOS, which attract talented scientists from across the nation who gather together for the sharing of scientific information to advance our understanding in nature and health. The annual conferences have enjoyed a long history."
          />
        </HStack>

        {/* Organizing Committee */}
      </Box>
    </VStack>
  );
}
