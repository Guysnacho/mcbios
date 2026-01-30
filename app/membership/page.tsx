"use client";

import { AuthModal } from "@/components/AuthModal";
import { MembershipPlan, MembershipPlans } from "@/components/MembershipPlans";
import { DnaHelix } from "@/components/svg/DnaHelix";
import { membershipBenefits } from "@/lib/constants";
import { useUserStore } from "@/lib/store";
import useStore from "@/lib/store/useStore";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { LuCircleCheck, LuShieldCheck } from "react-icons/lu";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const store = useStore(useUserStore, (store) => store);
  const router = useRouter();
  const params = use(searchParams);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (isAuthOpen) {
      if (store?.id) {
        router.push("/dashboard");
      }
    }
  }, [isAuthOpen, router, store?.id]);

  useEffect(() => {
    if (params.registration) {
      setAuthOpen(true);
    } else if (params.reset) {
      setIsSignUp(false);
      setAuthOpen(true);
    }
  }, [params]);

  const handlePlanSelect = (_plan: MembershipPlan) => {
    setIsSignUp(true);
    setAuthOpen(true);
  };

  const handleJoinClick = () => {
    setIsSignUp(true);
    setAuthOpen(true);
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />

      {/* Hero Section */}
      <Box
        as="section"
        pt="40"
        pb="20"
        bg={{ base: "slate.50", _dark: "gray.900" }}
        borderBottomWidth="1px"
        borderColor={{ base: "slate.200", _dark: "gray.700" }}
      >
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box maxW="3xl">
            <Heading
              as="h1"
              fontSize={["4xl", null, "6xl"]}
              fontWeight="black"
              color={{ base: "slate.900", _dark: "white" }}
              mb="6"
            >
              Membership
            </Heading>
            <Text fontSize="xl" color={{ base: "slate.600", _dark: "gray.300" }} lineHeight="relaxed">
              Join the premier bioinformatics network of the MidSouth and unlock
              exclusive benefits for your career and research.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Main Membership Section */}
      <Box
        as="section"
        py="24"
        bg={{ base: "white", _dark: "gray.950" }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="-50px"
          bottom="-100px"
          opacity="0.05"
          transform="rotate(12deg)"
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="w-64 h-[500px]" color="#4a6b8a" opacity="1" />
        </Box>

        <Container
          maxW="7xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Box
            bg="#1a1a1a"
            rounded="48px"
            overflow="hidden"
            shadow="2xl"
            borderWidth="1px"
            borderColor="slate.800"
          >
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
              {/* Left Panel - Benefits */}
              <GridItem
                p={{ base: 10, lg: 24 }}
                color="white"
                bgGradient="to-br"
                gradientFrom="#800000"
                gradientTo="#600000"
              >
                <Heading
                  as="h2"
                  fontSize="4xl"
                  fontWeight="black"
                  mb="8"
                  letterSpacing="tight"
                >
                  Join the MCBIOS Community
                </Heading>
                <Text
                  color="red.100"
                  fontSize="xl"
                  mb="12"
                  lineHeight="relaxed"
                  fontWeight="medium"
                >
                  Unlock exclusive benefits and professional networking in the
                  premier bioinformatics network of the MidSouth.
                </Text>

                <Stack gap="6" mb="16">
                  {membershipBenefits.map((benefit, idx) => (
                    <Flex key={idx} align="center" gap="4">
                      <Flex p="1" bg="whiteAlpha.200" rounded="full">
                        <Icon color="red.200" boxSize="5" flexShrink={0}>
                          <LuCircleCheck />
                        </Icon>
                      </Flex>
                      <Text
                        fontWeight="bold"
                        letterSpacing="wide"
                        fontSize="sm"
                        textTransform="uppercase"
                      >
                        {benefit}
                      </Text>
                    </Flex>
                  ))}
                </Stack>

                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap="6"
                  align="center"
                >
                  <Button
                    bg="white"
                    color="#800000"
                    px="10"
                    py="5"
                    rounded="xl"
                    fontWeight="black"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    fontSize="xs"
                    _hover={{ bg: "slate.50" }}
                    shadow="2xl"
                    onClick={handleJoinClick}
                  >
                    Join for 2026
                  </Button>
                </Flex>
              </GridItem>

              {/* Right Panel - Pricing */}
              <GridItem
                bg={{ base: "white", _dark: "gray.950" }}
                p={{ base: 10, lg: 24 }}
                borderLeftWidth={{ lg: "1px" }}
                borderColor={{ base: "slate.100", _dark: "gray.800" }}
                position="relative"
              >
                <Box
                  position="absolute"
                  top="10"
                  right="10"
                  opacity="0.05"
                  display={{ base: "none", md: "block" }}
                >
                  <DnaHelix className="w-24 h-48" color="#800000" opacity="1" />
                </Box>

                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight="black"
                  color={{ base: "slate.900", _dark: "white" }}
                  mb="10"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Membership Plans
                </Heading>

                <MembershipPlans
                  variant="inline"
                  onPlanSelect={handlePlanSelect}
                  showNote={true}
                />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Additional Info Section */}
      <Box as="section" py="16" bg={{ base: "slate.50", _dark: "gray.900" }}>
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Stack gap="8" textAlign="center">
            <Heading as="h3" fontSize="2xl" fontWeight="bold" color={{ base: "slate.900", _dark: "white" }}>
              Simple and Affordable Membership Options
            </Heading>
            <Stack gap="4">
              <Box
                bg={{ base: "white", _dark: "gray.800" }}
                p="6"
                rounded="2xl"
                borderWidth="1px"
                borderColor={{ base: "slate.200", _dark: "gray.700" }}
              >
                <Text color={{ base: "slate.700", _dark: "gray.300" }}>
                  <Text as="span" fontWeight="bold">
                    Conference Attendees:{" "}
                  </Text>
                  Your annual conference registration fee automatically includes
                  a one-year society membership.
                </Text>
              </Box>
              <Box
                bg={{ base: "white", _dark: "gray.800" }}
                p="6"
                rounded="2xl"
                borderWidth="1px"
                borderColor={{ base: "slate.200", _dark: "gray.700" }}
              >
                <Text color={{ base: "slate.700", _dark: "gray.300" }}>
                  <Text as="span" fontWeight="bold">
                    Direct Membership:{" "}
                  </Text>
                  Prefer to join or renew without attending? For 2026, enjoy our
                  introductory rates starting at a low{" "}
                  <Text as="span" fontWeight="bold">
                    $10 for Students
                  </Text>
                  . Direct membership registration will be made available after
                  upcomming conferences.
                </Text>
              </Box>
            </Stack>

            <Flex
              bg={{ base: "emerald.50", _dark: "emerald.950" }}
              p="6"
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "emerald.200", _dark: "emerald.800" }}
              align="center"
              justify="center"
              gap="4"
            >
              <Icon color={{ base: "emerald.600", _dark: "emerald.400" }} boxSize="6">
                <LuShieldCheck />
              </Icon>
              <Text color={{ base: "emerald.800", _dark: "emerald.200" }} fontWeight="medium">
                MCBIOS site and conference registration now available
              </Text>
            </Flex>

            <Button
              size="lg"
              bg="red.700"
              color="white"
              fontWeight="600"
              _hover={{ bg: "red.800" }}
              onClick={handleJoinClick}
              alignSelf="center"
            >
              Sign Up Now
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
