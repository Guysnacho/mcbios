"use client";

import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import { DnaHelix } from "@/components/svg/DnaHelix";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { LuClock, LuLock, LuShieldCheck } from "react-icons/lu";

export default function Page() {
  const [password, setPassword] = useState("");
  const isAuthenticated = password === process.env.NEXT_PUBLIC_LATE_REGISTRATION;

  return (
    <>
      <Head>
        <title>MCBIOS Late Registration</title>
        <meta content="Late Registration | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      {/* Hero Section */}
      <Box as="section" pt="40" pb="16" bg="slate.50" position="relative" overflow="hidden">
        <Box
          position="absolute"
          right="-80px"
          top="50%"
          transform="translateY(-50%) rotate(-10deg)"
          opacity="0.03"
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="w-48 h-100" color="#800000" opacity="1" />
        </Box>

        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Flex align="center" gap="3" mb="4" justify="center">
            <Flex p="3" bg="orange.100" rounded="xl" align="center" justify="center">
              <Icon color="orange.700" boxSize="6">
                <LuClock />
              </Icon>
            </Flex>
            <Text
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="orange.700"
            >
              Extended Access
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="black"
            color="slate.900"
            mb="4"
            lineHeight="tight"
            textAlign="center"
          >
            Late Registration
          </Heading>
          <Text fontSize="lg" color="slate.600" lineHeight="relaxed" textAlign="center" maxW="2xl" mx="auto">
            {isAuthenticated
              ? "You have access to late registration. Complete your conference registration below."
              : "This page requires administrator access. Please enter your provided password to continue."}
          </Text>
        </Container>
      </Box>

      {/* Content Section */}
      <Box as="section" py="16" bg="white" position="relative" overflow="hidden">
        <Box
          position="absolute"
          left="-60px"
          bottom="-80px"
          opacity="0.02"
          transform="rotate(15deg)"
          display={{ base: "none", xl: "block" }}
        >
          <DnaHelix className="w-48 h-100" color="#800000" opacity="1" />
        </Box>

        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          {isAuthenticated ? (
            <Box>
              <Flex
                mb="8"
                p="4"
                bg="emerald.50"
                rounded="xl"
                borderWidth="1px"
                borderColor="emerald.200"
                align="center"
                justify="center"
                gap="3"
              >
                <Icon color="emerald.600" boxSize="5">
                  <LuShieldCheck />
                </Icon>
                <Text color="emerald.800" fontWeight="medium" fontSize="sm">
                  Access granted. You may proceed with registration.
                </Text>
              </Flex>
              <ConferenceRegistration />
            </Box>
          ) : (
            <Box maxW="md" mx="auto">
              <Box
                p={{ base: 6, md: 8 }}
                bg="slate.50"
                rounded="2xl"
                borderWidth="1px"
                borderColor="slate.200"
              >
                <Flex
                  w="16"
                  h="16"
                  bg="slate.200"
                  rounded="full"
                  align="center"
                  justify="center"
                  mx="auto"
                  mb="6"
                >
                  <Icon color="slate.500" boxSize="8">
                    <LuLock />
                  </Icon>
                </Flex>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color="slate.900"
                  mb="2"
                  textAlign="center"
                >
                  Administrator Access Required
                </Heading>
                <Text fontSize="sm" color="slate.500" mb="6" textAlign="center">
                  Please enter your administrator-provided password to access late registration.
                </Text>
                <Input
                  type="password"
                  placeholder="Enter password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  disabled
                />
                <Text fontSize="xs" color="slate.400" mt="3" textAlign="center">
                  Late registration is currently closed
                </Text>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
