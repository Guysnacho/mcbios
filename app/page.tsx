"use client";

import { DnaHelix } from "@/components/svg/DnaHelix";
import { toaster } from "@/components/ui/toaster";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Lightbulb,
  MapPin,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  TriangleAlert,
  Users,
} from "lucide-react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const router = useRouter();

  setTimeout(() => {
    if (params.error_description) {
      toaster.create({
        description: params.error_description,
        type: "warning",
        duration: 8000,
        closable: true,
      });
    } else if (params.token || params.code) {
      toaster.create({
        title: "Thank you for your verification",
        description:
          "You are free to continue with your conference registration or any other activities!",
        type: "success",
        duration: 8000,
        closable: true,
      });
    }
  }, 500);

  return (
    <Box>
      <Head>
        <title>
          MCBIOS | MidSouth Computational Biology and Bioinformatics Society
        </title>
        <meta
          name="description"
          content="MCBIOS - Advancing the MidSouth research community through innovation, interdisciplinary collaboration, and excellence in bioinformatics education since 2004."
        />
      </Head>

      {/* Hero Section */}
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        _dark={{ bg: "gray.900" }}
      >
        {/* Background DNA Helix decorations */}
        <Box
          position="absolute"
          right={-20}
          top={0}
          h="full"
          opacity={0.05}
          display={{ base: "none", xl: "block" }}
        >
          <DnaHelix className="h-full" color="currentColor" opacity="1" />
        </Box>
        <Box
          position="absolute"
          left={-20}
          bottom={0}
          h="60%"
          opacity={0.03}
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="h-full" color="currentColor" opacity="1" />
        </Box>

        <Container maxW="7xl" py={{ base: 12, md: 20 }} position="relative">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 10, lg: 16 }}
            alignItems="center"
          >
            {/* Left Content */}
            <GridItem>
              <Stack gap={6}>
                {/* Badge */}
                <Badge
                  colorPalette="red"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  w="fit-content"
                  fontSize="xs"
                  fontWeight={600}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  <Flex align="center" gap={2}>
                    <Box w={2} h={2} bg="red.500" borderRadius="full" />
                    MCBIOS 2026 Registration is Open
                  </Flex>
                </Badge>

                {/* Headline */}
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight={700}
                  lineHeight={1.1}
                  color="gray.900"
                  _dark={{ color: "white" }}
                >
                  Frontiers of{" "}
                  <Text as="span" color="red.700" _dark={{ color: "red.400" }}>
                    Computational
                  </Text>
                  <br />
                  <Text as="span" color="red.700" _dark={{ color: "red.400" }}>
                    Biology
                  </Text>{" "}
                  & Data
                </Heading>

                {/* Subtext */}
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  maxW="lg"
                >
                  Advancing the MidSouth research community through innovation,
                  interdisciplinary collaboration, and excellence in
                  bioinformatics education since 2004.
                </Text>

                {/* CTA Buttons */}
                <Flex gap={4} flexWrap="wrap">
                  <Button
                    size="lg"
                    bg="red.700"
                    color="white"
                    fontWeight={600}
                    _hover={{ bg: "red.800" }}
                    onClick={() => router.push("/events")}
                  >
                    Register for 2026
                    <ArrowRight size={18} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="gray.300"
                    color="gray.700"
                    _dark={{ borderColor: "gray.600", color: "gray.200" }}
                    fontWeight={500}
                    onClick={() => router.push("/about")}
                  >
                    Learn More
                  </Button>
                </Flex>

                {/* Stats */}
                <Flex gap={{ base: 6, md: 10 }} mt={4} flexWrap="wrap">
                  {stats.map((stat) => (
                    <Box key={stat.label}>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight={700}
                        color="red.700"
                        _dark={{ color: "red.400" }}
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {stat.label}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Stack>
            </GridItem>

            {/* Right Content - Image */}
            <GridItem position="relative">
              {/* Background box with tilt */}
              <Box
                position="absolute"
                top={-4}
                left={-4}
                right={-4}
                bottom={-4}
                bg="red.800/5"
                _dark={{ bg: "red.400/10" }}
                borderRadius="40px"
                transform="rotate(-3deg)"
              />
              <Box
                position="relative"
                borderRadius="32px"
                overflow="hidden"
                boxShadow="2xl"
                transform="rotate(2deg)"
              >
                <Image
                  src="/images/banners/lab-hero.png"
                  alt="Laboratory research"
                  w="full"
                  h={{ base: "300px", md: "400px" }}
                  objectFit="cover"
                />
                {/* Decorative overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient="to-t"
                  gradientFrom="blackAlpha.400"
                  gradientTo="transparent"
                />
              </Box>

              {/* Research Focus Card */}
              <Card.Root
                position={{ base: "relative", md: "absolute" }}
                bottom={{ md: -6 }}
                right={{ md: -6 }}
                mt={{ base: 4, md: 0 }}
                maxW={{ base: "full", md: "280px" }}
                bg="white"
                _dark={{ bg: "gray.800" }}
                boxShadow="xl"
                borderRadius="xl"
                p={4}
              >
                <Flex gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bg="red.100"
                    _dark={{ bg: "red.900" }}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon color="red.600" _dark={{ color: "red.400" }}>
                      <TriangleAlert size={20} />
                    </Icon>
                  </Flex>
                  <Box>
                    <Text
                      fontWeight={600}
                      fontSize="sm"
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      Research Focus
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{ color: "gray.400" }}
                      mt={1}
                    >
                      Bridging the critical gap between raw biological data and
                      clinical computational insights.
                    </Text>
                  </Box>
                </Flex>
              </Card.Root>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Society Objectives Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="gray.50"
        _dark={{ bg: "gray.800" }}
        position="relative"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          opacity={0.02}
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="h-96" color="currentColor" opacity="1" />
        </Box>

        <Container maxW="7xl" position="relative">
          <Stack gap={12}>
            {/* Section Header */}
            <Box textAlign="center" maxW="2xl" mx="auto">
              <Text
                fontSize="sm"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing="wider"
                color="red.600"
                _dark={{ color: "red.400" }}
                mb={2}
              >
                Our Mission
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight={700}
                color="gray.900"
                _dark={{ color: "white" }}
                mb={4}
              >
                Society Objectives
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                MCBIOS is dedicated to creating a vibrant ecosystem where data
                science meets biological innovation.
              </Text>
            </Box>

            {/* Objectives Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {objectives.map((objective) => (
                <Card.Root
                  key={objective.title}
                  bg="white"
                  _dark={{ bg: "gray.900", borderColor: "gray.700" }}
                  borderRadius="xl"
                  p={6}
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor="gray.100"
                  transition="all 0.2s"
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                >
                  <Stack gap={4}>
                    <Flex
                      w={12}
                      h={12}
                      bg="red.50"
                      _dark={{ bg: "red.900" }}
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Icon color="red.600" _dark={{ color: "red.400" }}>
                        <objective.icon size={24} />
                      </Icon>
                    </Flex>
                    <Heading
                      as="h3"
                      fontSize="lg"
                      fontWeight={600}
                      color="gray.900"
                      _dark={{ color: "white" }}
                    >
                      {objective.title}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {objective.description}
                    </Text>
                  </Stack>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Membership Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="gray.800"
        _dark={{ bg: "gray.950" }}
        position="relative"
        overflow="hidden"
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          left={0}
          top={0}
          h="full"
          opacity={0.05}
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="h-full" color="white" opacity="1" />
        </Box>

        <Container maxW="7xl" position="relative">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="start"
          >
            {/* Left - Benefits */}
            <Stack gap={8}>
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight={700}
                  color="white"
                  mb={4}
                >
                  Join the MCBIOS Community
                </Heading>
                <Text color="gray.300" fontSize="lg">
                  Unlock exclusive benefits and professional networking in the
                  premier bioinformatics network of the MidSouth.
                </Text>
              </Box>

              <Stack gap={3}>
                {membershipBenefits.map((benefit) => (
                  <Flex key={benefit} align="center" gap={3}>
                    <Flex
                      w={6}
                      h={6}
                      bg="red.600"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <CheckCircle size={14} color="white" />
                    </Flex>
                    <Text
                      color="gray.200"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {benefit}
                    </Text>
                  </Flex>
                ))}
              </Stack>

              <Flex gap={4} align="center" mt={4}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.100" }}
                  onClick={() => router.push("/membership")}
                >
                  Join for 2026
                </Button>
                {/* <Flex align="center" gap={2}>
                  <Flex>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Box
                        key={i}
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg="gray.600"
                        border="2px solid"
                        borderColor="gray.800"
                        ml={i > 1 ? -2 : 0}
                      />
                    ))}
                  </Flex>
                  <Text color="gray.400" fontSize="sm">
                    500+ Active
                  </Text>
                </Flex> */}
              </Flex>
            </Stack>

            {/* Right - Pricing Cards */}
            <Card.Root
              bg="white"
              _dark={{ bg: "gray.800" }}
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="xl"
            >
              <Box p={{ base: 6, md: 8 }}>
                <Text
                  fontSize="sm"
                  fontWeight={600}
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="gray.500"
                  _dark={{ color: "gray.400" }}
                  mb={6}
                >
                  Conference Registration
                </Text>

                <Stack gap={4}>
                  {/* Professional Plan */}
                  <Box
                    p={5}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _dark={{ borderColor: "gray.700" }}
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{
                      borderColor: "red.300",
                      bg: "red.50",
                      boxShadow: "0 0 20px rgba(185, 28, 28, 0.15)",
                      transform: "translateY(-2px)",
                      _dark: { borderColor: "red.600", bg: "red.900" },
                    }}
                  >
                    <Flex justify="space-between" align="flex-start" mb={3}>
                      <Box>
                        <Text
                          fontWeight={700}
                          color="gray.900"
                          _dark={{ color: "white" }}
                          fontSize="lg"
                        >
                          Professional
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          For Researchers & Faculty
                        </Text>
                      </Box>
                      <Box textAlign="right">
                        <Flex align="baseline" gap={1}>
                          <Text
                            fontSize="3xl"
                            fontWeight={700}
                            color="red.700"
                            _dark={{ color: "red.400" }}
                          >
                            $450
                          </Text>
                        </Flex>
                        <Badge
                          colorPalette="green"
                          variant="subtle"
                          fontSize="xs"
                        >
                          $400 Early Bird
                        </Badge>
                      </Box>
                    </Flex>
                    <Stack gap={2}>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Full voting rights in society
                        </Text>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Leadership board eligibility
                        </Text>
                      </Flex>
                    </Stack>
                  </Box>

                  {/* Postdoc Plan */}
                  <Box
                    p={5}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _dark={{ borderColor: "gray.700" }}
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{
                      borderColor: "red.300",
                      bg: "red.50",
                      boxShadow: "0 0 20px rgba(185, 28, 28, 0.15)",
                      transform: "translateY(-2px)",
                      _dark: { borderColor: "red.600", bg: "red.900" },
                    }}
                  >
                    <Flex justify="space-between" align="flex-start" mb={3}>
                      <Box>
                        <Text
                          fontWeight={700}
                          color="gray.900"
                          _dark={{ color: "white" }}
                          fontSize="lg"
                        >
                          Postdoc
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          For Postdoctoral Researchers
                        </Text>
                      </Box>
                      <Box textAlign="right">
                        <Flex align="baseline" gap={1}>
                          <Text
                            fontSize="3xl"
                            fontWeight={700}
                            color="red.700"
                            _dark={{ color: "red.400" }}
                          >
                            $350
                          </Text>
                        </Flex>
                        <Badge
                          colorPalette="green"
                          variant="subtle"
                          fontSize="xs"
                        >
                          $300 Early Bird
                        </Badge>
                      </Box>
                    </Flex>
                    <Stack gap={2}>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Career development resources
                        </Text>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Mentorship opportunities
                        </Text>
                      </Flex>
                    </Stack>
                  </Box>

                  {/* Student Plan */}
                  <Box
                    p={5}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _dark={{ borderColor: "gray.700" }}
                    transition="all 0.2s"
                    cursor="pointer"
                    _hover={{
                      borderColor: "red.300",
                      bg: "red.50",
                      boxShadow: "0 0 20px rgba(185, 28, 28, 0.15)",
                      transform: "translateY(-2px)",
                      _dark: { borderColor: "red.600", bg: "red.900" },
                    }}
                  >
                    <Flex justify="space-between" align="flex-start" mb={3}>
                      <Box>
                        <Text
                          fontWeight={700}
                          color="gray.900"
                          _dark={{ color: "white" }}
                          fontSize="lg"
                        >
                          Student
                        </Text>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          For Undergraduates & PhDs
                        </Text>
                      </Box>
                      <Box textAlign="right">
                        <Flex align="baseline" gap={1}>
                          <Text
                            fontSize="3xl"
                            fontWeight={700}
                            color="red.700"
                            _dark={{ color: "red.400" }}
                          >
                            $250
                          </Text>
                        </Flex>
                        <Badge
                          colorPalette="green"
                          variant="subtle"
                          fontSize="xs"
                        >
                          $200 Early Bird
                        </Badge>
                      </Box>
                    </Flex>
                    <Stack gap={2}>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Scholarship & award eligibility
                        </Text>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <Star size={14} color="#B91C1C" />
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          Career networking access
                        </Text>
                      </Flex>
                    </Stack>
                  </Box>
                </Stack>

                {/* Note */}
                <Flex
                  bg="red.50"
                  _dark={{ bg: "red.900" }}
                  borderRadius="lg"
                  p={4}
                  gap={3}
                  align="flex-start"
                  mt={6}
                >
                  <Flex
                    w={6}
                    h={6}
                    bg="red.100"
                    _dark={{ bg: "red.800" }}
                    borderRadius="full"
                    align="center"
                    justify="center"
                    flexShrink={0}
                    mt={0.5}
                  >
                    <Sparkles size={12} color="#B91C1C" />
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="red.700"
                    my="auto"
                    _dark={{ color: "red.200" }}
                  >
                    Registration fee includes complimentary one-year MCBIOS
                    membership.
                  </Text>
                </Flex>
              </Box>
            </Card.Root>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg="gray.100"
        _dark={{ bg: "gray.900" }}
        position="relative"
      >
        <Container maxW="4xl">
          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="2xl"
            boxShadow="xl"
            overflow="hidden"
            position="relative"
          >
            {/* Background decoration */}
            <Box position="absolute" right={-10} top={-10} opacity={0.05}>
              <DnaHelix
                className="h-64 w-32"
                color="currentColor"
                opacity="1"
              />
            </Box>

            <Box p={{ base: 8, md: 12 }} textAlign="center" position="relative">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight={700}
                color="gray.900"
                _dark={{ color: "white" }}
                mb={4}
              >
                Ready to shape the future of bioinformatics?
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                mb={8}
                maxW="lg"
                mx="auto"
              >
                Join our community of researchers, educators, and innovators
                making a difference in computational biology.
              </Text>
              <Flex gap={4} justify="center" flexWrap="wrap">
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.700"
                  _dark={{ borderColor: "gray.600", color: "gray.200" }}
                  fontWeight={500}
                  onClick={() => router.push("/events")}
                >
                  Register for 2026
                </Button>
                <Button
                  size="lg"
                  bg="red.700"
                  color="white"
                  fontWeight={600}
                  _hover={{ bg: "red.800" }}
                  onClick={() => router.push("/membership")}
                >
                  Become a Member
                </Button>
              </Flex>
            </Box>
          </Card.Root>
        </Container>
      </Box>

      {/* Sticky Bottom Nav (Mobile) */}
      {/* <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
        borderTopWidth="1px"
        borderColor="gray.200"
        py={3}
        px={4}
        zIndex={999}
        boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
      >
        <Flex justify="space-between" align="center" maxW="lg" mx="auto">
          <Flex gap={1} overflow="auto" flex={1}>
            {[
              "Home",
              "Leadership",
              "Membership",
              "Conferences",
              "Publications",
            ].map((item) => (
              <Link
                key={item}
                asChild
                fontSize="xs"
                fontWeight={500}
                color="gray.600"
                _dark={{ color: "gray.400" }}
                px={2}
                py={1}
                whiteSpace="nowrap"
                _hover={{ color: "red.700" }}
              >
                <NextLink
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item.toUpperCase()}
                </NextLink>
              </Link>
            ))}
          </Flex>
          <Button
            size="sm"
            bg="red.700"
            color="white"
            fontWeight={600}
            _hover={{ bg: "red.800" }}
            ml={2}
            flexShrink={0}
            onClick={() => router.push("/events")}
          >
            Register Now
          </Button>
        </Flex>
      </Box> */}

      {/* Spacer for fixed bottom nav on mobile */}
      {/* <Box display={{ base: "block", lg: "none" }} h="60px" /> */}
    </Box>
  );
}

const stats = [
  { value: "500+", label: "Active Members" },
  { value: "20+", label: "Years of Impact" },
  { value: "150+", label: "Research Labs" },
];

const objectives = [
  {
    icon: Lightbulb,
    title: "Advance Understanding",
    description:
      "Deepening the collective knowledge of bioinformatics and computational biology through shared research.",
  },
  {
    icon: Users,
    title: "Unite Scientists",
    description:
      "Bringing together researchers from diverse backgrounds and disciplines to solve complex biological problems.",
  },
  {
    icon: Target,
    title: "Foster Collaboration",
    description:
      "Creating bridges between biological, health, and medical sectors for interdisciplinary breakthroughs.",
  },
  {
    icon: GraduationCap,
    title: "Promote Education",
    description:
      "Nurturing the next generation of computational biologists through mentorship and workshops.",
  },
  {
    icon: MessageSquare,
    title: "Inform Public",
    description:
      "Communicating the results and societal implications of current computational biology research.",
  },
  {
    icon: MapPin,
    title: "Regional Growth",
    description:
      "Developing computational biology capacity and excellence across our regional chapters.",
  },
];

const membershipBenefits = [
  "Conference registration discounts",
  "Leadership opportunity eligibility",
  "Access to member-only events",
  "Reduced publication fees",
  "Student awards and grants",
  "Local chapter participation",
];
