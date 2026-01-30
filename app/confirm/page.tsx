"use client";

import { DnaHelix } from "@/components/svg/DnaHelix";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  Globe,
  Handshake,
  Library,
  Medal,
  MicVocal,
  Sparkles,
  ChevronLeft,
  AlertTriangle,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LuCircleCheck, LuPartyPopper } from "react-icons/lu";

export default function Page() {
  const params = useSearchParams();
  const isValid = params?.has("token");

  return (
    <>
      <Head>
        <title>Signup Confirmation</title>
        <meta content="MCBIOS Membership Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
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

        <Container maxW="6xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={{ base: 8, lg: 12 }}
          >
            {/* Left - Image */}
            <Box
              flex="1"
              maxW={{ base: "350px", lg: "450px" }}
              order={{ base: 2, lg: 1 }}
            >
              <Image
                src="/images/conferenceroom.avif"
                alt="Wood Conference Room, Photo by Aditya Sethia on Unsplash"
                width={800}
                height={700}
                style={{ borderRadius: "24px", objectFit: "cover" }}
              />
            </Box>

            {/* Right - Content */}
            <Box flex="1" order={{ base: 1, lg: 2 }}>
              {isValid ? (
                <>
                  <Flex align="center" gap="3" mb="4">
                    <Flex p="3" bg="emerald.100" rounded="xl" align="center" justify="center">
                      <Icon color="emerald.700" boxSize="6">
                        <LuPartyPopper />
                      </Icon>
                    </Flex>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="widest"
                      color="emerald.700"
                    >
                      Welcome Aboard
                    </Text>
                  </Flex>
                  <Heading
                    as="h1"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="black"
                    color="slate.900"
                    mb="4"
                    lineHeight="tight"
                  >
                    Thank You for Joining MCBIOS
                  </Heading>
                  <Text fontSize="lg" color="slate.600" lineHeight="relaxed">
                    We appreciate your contribution and time! Your membership helps
                    advance computational biology and bioinformatics in the MidSouth region.
                  </Text>
                </>
              ) : (
                <>
                  <Flex align="center" gap="3" mb="4">
                    <Flex p="3" bg="orange.100" rounded="xl" align="center" justify="center">
                      <Icon color="orange.700" boxSize="6">
                        <AlertTriangle />
                      </Icon>
                    </Flex>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="widest"
                      color="orange.700"
                    >
                      Oops
                    </Text>
                  </Flex>
                  <Heading
                    as="h1"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="black"
                    color="slate.900"
                    mb="4"
                    lineHeight="tight"
                  >
                    Something Went Wrong
                  </Heading>
                  <Text fontSize="lg" color="slate.600" lineHeight="relaxed">
                    If you were in the middle of a registration, please try again later
                    or reach out to us. If you got here by accident, no worries!
                  </Text>
                </>
              )}

              <Button
                asChild
                mt="8"
                size="lg"
                bg={isValid ? "red.700" : "orange.600"}
                color="white"
                fontWeight="bold"
                _hover={{ bg: isValid ? "red.800" : "orange.700" }}
              >
                <Link href="/">
                  <ChevronLeft size={18} />
                  Return Home
                </Link>
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Benefits Section - Only show if valid */}
      {isValid && (
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

          <Container maxW="6xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
            <Flex align="center" gap="3" mb="3" justify="center">
              <Icon color="red.700" boxSize="5">
                <Sparkles />
              </Icon>
              <Text
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="widest"
                color="red.700"
              >
                Member Benefits
              </Text>
            </Flex>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="black"
              color="slate.900"
              mb="12"
              textAlign="center"
            >
              What You Get as a Member
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
              {perks.map((perk, idx) => (
                <Box
                  key={idx}
                  p="6"
                  bg="slate.50"
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor="slate.200"
                  transition="all 0.2s"
                  _hover={{ borderColor: "red.200", shadow: "md" }}
                >
                  <Flex
                    w="12"
                    h="12"
                    bg="red.100"
                    rounded="xl"
                    align="center"
                    justify="center"
                    mb="4"
                  >
                    <Icon color="red.700" boxSize="6">
                      <perk.icon />
                    </Icon>
                  </Flex>
                  <Heading as="h3" fontSize="md" fontWeight="bold" color="slate.900" mb="2">
                    {perk.heading}
                  </Heading>
                  <Text fontSize="sm" color="slate.600" lineHeight="relaxed">
                    {perk.blurb}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            <Flex
              mt="12"
              p="6"
              bg="emerald.50"
              rounded="2xl"
              borderWidth="1px"
              borderColor="emerald.200"
              align="center"
              justify="center"
              gap="3"
            >
              <Icon color="emerald.600" boxSize="5">
                <LuCircleCheck />
              </Icon>
              <Text color="emerald.800" fontWeight="medium">
                Your membership is now active. Check your email for next steps!
              </Text>
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
}

const perks = [
  {
    icon: Globe,
    heading: "Global Research Network",
    blurb:
      "Connect with leading scientists, data analysts, and bioinformatics innovators. Collaborate, exchange ideas, and build partnerships.",
  },
  {
    icon: MicVocal,
    heading: "Priority Speaker Consideration",
    blurb:
      "Get early consideration for speaker slots at panels, lightning talks, and workshops across our events.",
  },
  {
    icon: Sparkles,
    heading: "Research Spotlight",
    blurb:
      "Feature your publications, lab breakthroughs, or datasets in our monthly Member Highlights newsletter.",
  },
  {
    icon: Library,
    heading: "On-Demand Learning Hub",
    blurb:
      "Unlock a growing library of conference recordings, technical tutorials, and expert interviews.",
  },
  {
    icon: Handshake,
    heading: "Mentorship Programs",
    blurb:
      "Join structured mentorship circles pairing early-career researchers with senior scientists and industry experts.",
  },
  {
    icon: Medal,
    heading: "Annual Awards & Recognition",
    blurb:
      "Be eligible for member-only awards celebrating innovation, leadership, and outstanding contributions.",
  },
];
