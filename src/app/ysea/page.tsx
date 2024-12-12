"use client";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Page() {
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
              p={4}
              py={6}
              bgColor={"blackAlpha.500"}
            >
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                MCBIOS Young Scientist Excellence Awards
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* YSEA Instructions */}
        <Box bgColor="blue.800" position={"relative"} w="full">
          <Container>
            <Stack direction={{ base: "column", lg: "row" }} my={12}>
              <Stack
                color={"blue.100"}
                justify={{ lg: "center" }}
                py={{ base: 4, md: 20, xl: 50 }}
                gap={5}
              >
                <Box mb={{ base: 8, md: 20 }}>
                  <Text
                    fontFamily={"heading"}
                    fontWeight={700}
                    textTransform={"uppercase"}
                    mb={3}
                    fontSize={"xl"}
                    color={"blue.100"}
                    decoration="underline"
                  >
                    Deadline: January 15th, 2025
                  </Text>
                  <Heading
                    color={"white"}
                    mb={5}
                    fontSize={{ base: "3xl", md: "5xl" }}
                  >
                    2025 Young Scientist Excellence Award Applications
                  </Heading>
                  <Center>
                    <Button
                      as="a"
                      size="lg"
                      w="md"
                      href="https://forms.gle/RVYFXmoodnGdAupX9"
                      target="_blank"
                      color={"white"}
                      rounded={"full"}
                      alignItems="center"
                      leftIcon={<ExternalLinkIcon />}
                      bg={"blue.600"}
                    >
                      YSEA Application
                    </Button>
                  </Center>
                </Box>

                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={10}
                  mx={{ base: 5, md: 0 }}
                >
                  {blurbs.map((blurb) => (
                    <Box key={blurb.title} w="full">
                      <Text
                        fontFamily={"heading"}
                        fontSize={"3xl"}
                        color={"white"}
                        mb={3}
                      >
                        {blurb.title}
                      </Text>
                      <Text fontSize={"xl"} color={"gray.400"}>
                        {blurb.content}
                      </Text>
                      {blurb.list &&
                        blurb.list.map((item) => (
                          <UnorderedList key={item} my={4}>
                            <ListItem>
                              <Text>{item}</Text>
                            </ListItem>
                          </UnorderedList>
                        ))}
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Container>
        </Box>
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
