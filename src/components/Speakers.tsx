"use client"

import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Image,
  Icon,
  CardRoot,
} from "@chakra-ui/react";
import { MapPin, Award, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./common/ImageWithFallback";

export function Speakers() {
  const speakers = [
    {
      name: "Dr. Maria Rodriguez",
      title: "Chief AI Officer",
      institution: "Mayo Clinic",
      expertise: "AI in Clinical Decision Making",
      image:
        "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NDI2NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: true,
      location: "Rochester, MN",
    },
    {
      name: "Prof. James Chen",
      title: "Director of Digital Health",
      institution: "Stanford Medicine",
      expertise: "Precision Medicine & Genomics",
      image:
        "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzY2llbnRpc3QlMjBsYWIlMjBjb2F0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQyNjc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Palo Alto, CA",
    },
    {
      name: "Dr. Sarah Johnson",
      title: "VP of Health AI",
      institution: "Google Health",
      expertise: "AI for Drug Discovery & Diagnostics",
      image:
        "https://images.unsplash.com/photo-1735679356705-7c06b780c7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc2NpZW50aXN0JTIwdGVhbSUyMHJlc2VhcmNoZXJzJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTg0MjY3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: true,
      location: "Mountain View, CA",
    },
    {
      name: "Dr. Ahmed Hassan",
      title: "Chief Medical Data Officer",
      institution: "University of Florida Health",
      expertise: "Clinical Data Science",
      image:
        "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NDI2NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Gainesville, FL",
    },
    {
      name: "Dr. Lisa Park",
      title: "Director of Health Informatics",
      institution: "NIH National Institute",
      expertise: "Multi-omics & Biomarker Discovery",
      image:
        "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzY2llbnRpc3QlMjBsYWIlMjBjb2F0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQyNjc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Bethesda, MD",
    },
    {
      name: "Prof. Roberto Silva",
      title: "Director of Health AI Lab",
      institution: "Barcelona Institute for Global Health",
      expertise: "Population Health Analytics",
      image:
        "https://images.unsplash.com/photo-1735679356705-7c06b780c7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc2NpZW50aXN0JTIwdGVhbSUyMHJlc2VhcmNoZXJzJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTg0MjY3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Barcelona, Spain",
    },
  ];

  return (
    <Box
      as="section"
      id="speakers"
      py={20}
      px={4}
      bgGradient="linear(to-b, offWhite.50, rgba(158, 46, 74, 0.1))"
      position="relative"
    >
      {/* Art Deco Decorative Elements */}
      <Box
        position="absolute"
        top="10"
        left="10"
        w="20"
        h="20"
        border="4px solid"
        borderColor="rgba(212, 175, 55, 0.2)"
        transform="rotate(45deg)"
      />
      <Box
        position="absolute"
        bottom="10"
        right="10"
        w="16"
        h="16"
        bg="rgba(79, 23, 37, 0.1)"
        transform="rotate(12deg)"
      />

      <Container maxW="container.xl" position="relative" zIndex={10}>
        <VStack gap={16}>
          {/* Header Section */}
          <VStack gap={6} textAlign="center">
            <HStack gap={2} align="center">
              <Box w={12} h="2px" bg="maroon.900" />
              <Badge
                colorScheme="maroon"
                bg="maroon.900"
                color="offWhite.50"
                fontWeight="medium"
                fontSize="base"
                px={4}
                py={1}
                borderRadius="md"
              >
                Featured Speakers
              </Badge>
              <Box w={12} h="2px" bg="maroon.900" />
            </HStack>

            <Heading
              as="h2"
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="medium"
              color="maroon.900"
            >
              World-Class
              <Text as="span" color="pink.800">
                {" "}
                Experts
              </Text>
            </Heading>

            <Text
              fontSize="lg"
              color="rgba(79, 23, 37, 0.8)"
              maxW="3xl"
              lineHeight="relaxed"
            >
              Learn from healthcare innovators, AI pioneers, and data science
              leaders who are transforming medicine through cutting-edge
              technology and research.
            </Text>
          </VStack>

          {/* Speakers Grid */}
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {speakers.map((speaker, index) => (
              <CardRoot
                key={index}
                overflow="hidden"
                bg="rgba(255, 255, 255, 0.9)"
                backdropFilter="blur(12px)"
                borderColor="rgba(79, 23, 37, 0.2)"
                _hover={{
                  shadow: "2xl",
                  borderColor: "rgba(158, 46, 74, 0.5)",
                }}
                transition="all 0.3s"
                role="group"
              >
                <Box position="relative">
                  <ImageWithFallback
                    src={speaker.image}
                    alt={speaker.name}
                    style={{
                      width: "100%",
                      height: "256px",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                    }}
                  />
                  {speaker.keynote && (
                    <Badge
                      position="absolute"
                      top={4}
                      left={4}
                      bg="gold.500"
                      color="maroon.900"
                      fontWeight="medium"
                      fontSize="base"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Icon as={Award} boxSize={3} />
                      Keynote
                    </Badge>
                  )}
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(79, 23, 37, 0.6), transparent, transparent)"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                  />
                </Box>

                <CardBody p={6}>
                  <VStack gap={4} align="stretch">
                    <Box>
                      <Heading as="h3" size="md" color="maroon.900" mb={1}>
                        {speaker.name}
                      </Heading>
                      <Text color="pink.800" fontWeight="medium">
                        {speaker.title}
                      </Text>
                      <Text color="rgba(79, 23, 37, 0.7)" fontSize="sm">
                        {speaker.institution}
                      </Text>
                    </Box>

                    <HStack gap={2} color="rgba(79, 23, 37, 0.6)" fontSize="sm">
                      <Icon as={MapPin} boxSize={4} />
                      <Text>{speaker.location}</Text>
                    </HStack>

                    <Badge
                      variant="outline"
                      borderColor="pink.800"
                      color="pink.800"
                      fontWeight="medium"
                      alignSelf="flex-start"
                    >
                      {speaker.expertise}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      borderColor="maroon.900"
                      color="maroon.900"
                      _hover={{
                        bg: "maroon.900",
                        color: "offWhite.50",
                      }}
                    >
                      <Icon as={ExternalLink} boxSize={3} />
                      View Profile
                    </Button>
                  </VStack>
                </CardBody>
              </CardRoot>
            ))}
          </Grid>

          {/* View All Button */}
          <Button
            size="lg"
            bg="maroon.900"
            color="offWhite.50"
            _hover={{ bg: "pink.800" }}
            px={8}
            py={3}
            h="auto"
          >
            View All Speakers
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
