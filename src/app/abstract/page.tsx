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
            Submission Instructions
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
                  Abstract submissions are open!
                </Heading>
                <Text>
                  The deadline to submit an abstract is February 1st, 2025.
                </Text>
                <Button
                  as="a"
                  colorScheme="blue"
                  mt="5"
                  href="https://forms.gle/mkRcchVaWhN4DuRY8"
                  target="_blank"
                  rounded={"full"}
                >
                  Submission Form
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
          <Divider borderColor="black" />
          <Text>
            The abstract should not exceed 300 words. Please minimize the use of
            abbreviations and do not cite references in the abstract.
          </Text>
          <Text>
            The abstract must include the following separate sections:
          </Text>
          <UnorderedList>
            <ListItem>Background: Context and purpose of the study</ListItem>
            <ListItem>Results: Main findings</ListItem>
            <ListItem>
              Conclusions: A brief summary and potential implications
            </ListItem>
          </UnorderedList>
        </VStack>
        <Box
          w={{ base: "85%", md: "md", lg: "md" }}
          mx="auto"
          justifyContent="space-around"
          gap={5}
        >
          <Heading size="lg" color="blue.800" mb={4}>
            Submissions
          </Heading>
          <Text>
            A registered author can submit multiple abstracts, as long as that
            author is the presenting author. Authors will also have an
            opportunity to submit and publish a full paper for MCBIOS 2025
            proceedings in Frontiers in Artificial Intelligence. The deadline
            for full paper submission is February 1st, 2025.
          </Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
