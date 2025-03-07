"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Alert,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import localFont from "next/font/local";
import { useState } from "react";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Page() {
  const [registrationOpen] = useState(true);
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
          backgroundImage={"/campus_bg.jpg"}
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
                Conference Registration
              </Text>
            </Stack>
          </VStack>
        </Flex>
        {/* YSEA Instructions */}
        <SimpleGrid
          w="full"
          mx="auto"
          justifyContent="space-evenly"
          py="20"
          bgGradient="linear(to-br, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
          columns={{ base: 1, lg: 2 }}
          spacing={10}
        >
          <VStack w={{ base: "90%", lg: "75%" }} mx="auto" spacing={5}>
            <Heading size="lg" color="blue.800">
              Information Regarding Registration
            </Heading>
            <Text>
              Payment is expected at the time of registration (Credit or Debit
              Card). Demographic information gathered during registration will
              be aggregated and utilized by MCBIOS for grant applications.
              Member&apos;s information is never shared or sold.
            </Text>
            <Text>
              All three types of registration include complimentary 1-year
              MCBIOS membership, which provides access to workshops and
              collaborative projects hosted by MCBIOS throughout the year.
            </Text>
          </VStack>
          <VStack
            w={{ base: "90%", lg: "50%" }}
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
                    MCBIOS 2025 Registration
                  </Heading>
                  {!registrationOpen ? (
                    <Text textAlign="center">
                      Registration opening soon. Construction is underway!
                    </Text>
                  ) : (
                    <>
                      <Text mx="auto" fontSize="lg">
                        To register for the 2025 Conference, complete the form
                        available on the main MCBIOS Society site. Secure
                        payment processing powered by Stripe Checkout.
                      </Text>
                      <Text mx="auto" fontSize="lg">
                        The deadline for registration is March 17th, 2025.
                      </Text>
                      <Alert borderRadius="md">
                        <Text align="center">
                          If you run into issues at any point during
                          registration, feel free to reach out to our developers
                          at{" "}
                          <Text
                            opacity={0.8}
                            _hover={{ opacity: 1 }}
                            as={Link}
                            target="_blank"
                            href="mailto:mcbios.society@gmail.com"
                          >
                            mcbios.society@gmail.com
                          </Text>
                          .
                        </Text>
                      </Alert>
                      <Button
                        as={Link}
                        mx="auto"
                        href="https://mcbios.com/events"
                        target="_blank"
                        bg={"blue.400"}
                        rounded={"full"}
                        color={"white"}
                        _hover={{ bg: "blue.500" }}
                      >
                        Register Today!
                      </Button>
                    </>
                  )}
                </Stack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}
