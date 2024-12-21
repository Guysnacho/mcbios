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
        <VStack w={["80%", null, "75%", "70%"]} mx="auto" my="10" gap={10}>
          <Heading textAlign="center" mx="auto" size={["md", null, "lg"]}>
            MidSouth Computational Biology and Bioinformatics Society (MCBIOS)
          </Heading>
          <FocusCard
            maxH={["md", null, "fit-content"]}
            overflowY="auto"
            blurb="MCBIOS is a non-profit organization founded in 2003. What began as a grassroots effort led by a small group of researchers at the FDA NCTR (located in Little Rock, Arkansas) has since grown significantly. We are now one of only two regional societies in North America (alongside GLBIO) affiliated with ISCB, the world's largest bioinformatics society.||The mission of MCBIOS is to foster networking, collaboration, and professional development among members at all levels of skill and education. Our annual conference is the flagship event, bringing together talented scientists from across the nation to share scientific insights and discoveries, advancing our understanding of nature and health. Guided by these goals, the annual conference has enjoyed a rich and enduring history.||The 2025 iteration will mark the 21st in a series of exceptional conferences. For MCBIOS 2025, we are excited to host four plenary speakers and a myriad of world-class researchers presenting in technical sessions, workshops, and tutorials. Additionally, the Young Scientist Excellence Award (YSEA) will be awarded, alongside poster sessions and other engaging activities.||All registered attendees are invited to submit their research papers for consideration in the MCBIOS 2025 proceedings, which will be published as special issues in high-quality bioinformatics journals. We look forward to hosting an impactful bioinformatics conference and hope you'll join us on this exciting journey!"
          />
        </VStack>
        {/* block quote */}

        {/* Organizing Committee */}
      </Box>
    </VStack>
  );
}
