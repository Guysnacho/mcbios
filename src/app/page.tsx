"use client";

import { Button, Divider, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Logo /> */}
        <Flex
          w={"full"}
          h={"100vh"}
          backgroundImage={"/24-0287-MEIKLE-Background.jpg"}
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
              bgColor={"blackAlpha.500"}
            >
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                textUnderlineOffset={4}
                textDecorationLine="underline"
                fontSize={["3xl", null, null, "4xl"]}
              >
                MCBIOS 2025
              </Text>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                Data-Driven Discovery: Harnessing the power of AI to transform
                health
              </Text>
              <Text mx="auto" color={"white"} fontWeight={400} fontSize="lg">
                The 21st annual meeting of MCBIOS
              </Text>
              <Divider />
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                University of Utah
              </Text>
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                March 27-29, 2025
              </Text>
              <Stack direction={"row"} mx="auto">
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Program Coming Soon
                </Button>
                {/* <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "whiteAlpha.500" }}
                >
                  Show me more
                </Button> */}
              </Stack>
            </Stack>
          </VStack>
        </Flex>
      </main>
    </div>
  );
}
