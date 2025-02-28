"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import localFont from "next/font/local";
import { ReactNode } from "react";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Page() {
  return (
    <VStack className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
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
                Session Proposals
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* Session Proposals */}
      </Box>
      <SimpleGrid
        mx="auto"
        justifyContent="space-evenly"
        py="20"
        bgGradient="linear(to-br, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
        columns={{ base: 1, lg: 2 }}
        spacing={5}
      >
        <VStack
          w={{ base: "90%", lg: "75%" }}
          m="auto"
          align="stretch"
          spacing={5}
        >
          <Heading size="lg" color="blue.800">
            Submission Instructions
          </Heading>
          <Text>
            We offer the chance to present a Scientific Session of your
            choosing. Typically a session will have 90 minutes. You can propose
            the topic, and invite 3-5 speakers per session. If selected, please
            invite your speakers to attend the conference and present in person.
          </Text>
          <Divider borderColor="black" />
        </VStack>
        <Box
          w={{ base: "85%", md: "md", lg: "md" }}
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
                  Session proposals are closed!
                </Heading>
                <Text>
                  The deadline to submit an abstract was December 20th, 2024.
                </Text>
                <Button
                  // as="a"
                  colorScheme="teal"
                  mt="5"
                  // href="https://forms.gle/Ao8hxxD3KfBjrnEt7"
                  // target="_blank"
                  rounded={"full"}
                  disabled
                >
                  Proposal Form
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Box>
        {/* More info */}
        <VStack
          w={{ base: "90%", lg: "75%" }}
          mx="auto"
          align="stretch"
          spacing={5}
        >
          <Heading size={["md", null, "lg"]} color="blue.800">
            Session Types
          </Heading>
          <UnorderedList>
            <ListItem>
              <TextHighlight>Technical session</TextHighlight>: Presentations
              showcasing cutting-edge research and advancements in computational
              biology and bioinformatics.
            </ListItem>
            <ListItem>
              <TextHighlight>Tutorial</TextHighlight>: In-depth, hands-on
              learning experiences designed to teach specific tools, techniques,
              or methodologies.
            </ListItem>
            <ListItem>
              <TextHighlight>Workshop</TextHighlight>: Interactive sessions
              focused on collaborative problem-solving and skill development in
              emerging topics.
            </ListItem>
            <ListItem>
              <TextHighlight>Panel discussion</TextHighlight>: Engaging
              conversations where experts share insights, debate trends, and
              answer audience questions on key issues in the field.
            </ListItem>
          </UnorderedList>
        </VStack>
        <Box
          w={{ base: "85%", md: "md", lg: "md" }}
          mx="auto"
          justifyContent="space-around"
          gap={5}
        >
          <Heading size={["md", null, "lg"]} color="blue.800" mb={4}>
            Additional Perks
          </Heading>
          <Text>
            Authors will also have the opportunity to submit and publish a full
            paper for MCBIOS 2025 proceedings in Frontiers in Artificial
            Intelligence.
          </Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}

const TextHighlight = ({ children }: { children: ReactNode }) => (
  <Text as={"span"} fontWeight={700}>
    {children}
  </Text>
);
