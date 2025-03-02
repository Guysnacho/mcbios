"use client";

import { FocusCard } from "@/components/FocusCard";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
        gap={5}
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
                Conference Program
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* block quote */}
        <HStack my={5} mx="auto" w={["80%", null, "50%", "40%"]}>
          <FocusCard blurb="Below you will be able to find the sessions that will be held during the conference. All of which cover exciting and novel developments in the field." />
        </HStack>

        <Box
          className="space-y-5"
          mx="auto"
          my={10}
          w={["80%", null, "50%", "40%"]}
        >
          <Heading size="lg" color="blue.700" textAlign="center">
            Conference at a Glance
          </Heading>

          <p className="text-center mx-auto w-4/5 md:w-3/5">
            Below you can a breakdown of conference events throughout the day.
            Expect a few changes as we confirm timeslots for speakers.
          </p>

          <Tabs>
            <TabList justifyContent="center">
              <Tab>Day One - March 27</Tab>
              <Tab>Day Two - March 28</Tab>
              <Tab>Day Three - March 29</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </VStack>
  );
}
