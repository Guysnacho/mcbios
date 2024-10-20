"use client";

import { Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert mx-auto"
          src="https://mcbios.com/images/logo.jpg"
          alt="Next.js logo"
          width={337}
          height={187}
          priority
        />
        <Flex
          w={"full"}
          h={"100vh"}
          backgroundImage={
            "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
          }
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={[4, null, null, 8]}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["3xl", null, null, "4xl"]}
              >
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor
              </Text>
              <Stack direction={"row"}>
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Show me more
                </Button>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "whiteAlpha.500" }}
                >
                  Show me more
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>
      </main>
    </div>
  );
}
