"use client";

import { NameTagForm } from "@/components/forms/NameTagForm";
import { DnaHelix } from "@/components/svg/DnaHelix";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { LuClipboardList, LuFileText, LuLock } from "react-icons/lu";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>MCBIOS Forms</title>
        <meta content="MCBIOS Forms | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <NameTagForm isOpen={isOpen} setIsOpen={setIsOpen} />

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

        <Container maxW="6xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={{ base: 8, lg: 12 }}
          >
            {/* Left - Image */}
            <Box
              flex="1"
              maxW={{ base: "300px", lg: "400px" }}
              order={{ base: 2, lg: 1 }}
            >
              <Image
                src="https://blush.design/api/download?shareUri=unSj1VTUqC9V06JG&c=Hair_0%7E878787-0.2%7Ec38741_Skin_0%7Ec26e5e-0.2%7E7d4439&w=800&h=800&fm=png"
                alt="People talking"
                w="100%"
                h="auto"
              />
            </Box>

            {/* Right - Content */}
            <Box flex="1" order={{ base: 1, lg: 2 }}>
              <Flex align="center" gap="3" mb="4">
                <Flex p="3" bg="red.100" rounded="xl" align="center" justify="center">
                  <Icon color="red.700" boxSize="6">
                    <LuClipboardList />
                  </Icon>
                </Flex>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="red.700"
                >
                  Resources
                </Text>
              </Flex>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="black"
                color="slate.900"
                mb="4"
                lineHeight="tight"
              >
                MCBIOS Forms
              </Heading>
              <Text fontSize="lg" color="slate.600" lineHeight="relaxed">
                Access official forms for conference registration, name tags, and other
                society-related submissions.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Forms Section */}
      <Box as="section" py="20" bg="white" position="relative" overflow="hidden">
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

        <Container maxW="3xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Stack gap="6">
            {/* Name Tag Form Card */}
            <Box
              p={{ base: 6, md: 8 }}
              bg="slate.50"
              rounded="2xl"
              borderWidth="1px"
              borderColor="slate.200"
            >
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={{ base: "start", sm: "center" }}
                justify="space-between"
                gap="4"
              >
                <Flex align="center" gap="4">
                  <Flex
                    w="12"
                    h="12"
                    bg="red.100"
                    rounded="xl"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon color="red.700" boxSize="6">
                      <LuFileText />
                    </Icon>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="lg" fontWeight="bold" color="slate.900" mb="1">
                      2025 Conference - Name Tag Confirmation
                    </Heading>
                    <Text fontSize="sm" color="slate.500">
                      Confirm your name tag details for the upcoming conference
                    </Text>
                  </Box>
                </Flex>
                <Button
                  colorPalette="red"
                  onClick={() => setIsOpen(true)}
                  disabled
                  flexShrink={0}
                >
                  <LuLock size={16} />
                  Closed
                </Button>
              </Flex>
            </Box>

            {/* Placeholder for future forms */}
            <Flex
              p="6"
              bg="slate.100"
              rounded="2xl"
              borderWidth="1px"
              borderColor="slate.200"
              borderStyle="dashed"
              align="center"
              justify="center"
              minH="120px"
            >
              <Text color="slate.500" fontSize="sm" fontWeight="medium">
                More forms will be available here as needed
              </Text>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
