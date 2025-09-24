import {
  Badge,
  Box,
  Card,
  CardBody,
  CardRoot,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react';
import { Brain, Database, Microscope, Network } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Microscope,
      title: "Healthcare Innovation",
      description: "Discover breakthrough applications of AI and data science transforming patient care and medical research.",
      badge: "Innovation"
    },
    {
      icon: Brain,
      title: "AI in Medicine",
      description: "Explore how artificial intelligence is revolutionizing diagnostics, treatment, and drug discovery.",
      badge: "AI/ML"
    },
    {
      icon: Database,
      title: "Health Data Analytics",
      description: "Learn about advanced approaches to clinical data analysis and population health insights.",
      badge: "Data"
    },
    {
      icon: Network,
      title: "Collaborative Health Tech",
      description: "Build connections across healthcare, technology, and research communities worldwide.",
      badge: "Networking"
    }
  ];

  return (
    <Box 
      as="section" 
      id="about" 
      py={20} 
      px={4} 
      bg="offWhite.50" 
      position="relative"
    >
      {/* Art Deco Pattern */}
      <Box position="absolute" inset={0} opacity={0.05}>
        <Box 
          h="full" 
          w="full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #4f1725 25%, transparent 25%),
              linear-gradient(-45deg, #4f1725 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #4f1725 75%),
              linear-gradient(-45deg, transparent 75%, #4f1725 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
          }}
        />
      </Box>

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
                About MCBios 2026
              </Badge>
              <Box w={12} h="2px" bg="maroon.900" />
            </HStack>
            
            <Heading 
              as="h2" 
              fontSize={{ base: "4xl", lg: "5xl" }} 
              fontWeight="medium" 
              color="maroon.900"
            >
              Where Science Meets
              <Text as="span" color="pink.800"> Innovation</Text>
            </Heading>
            
            <Text 
              fontSize="lg" 
              color="rgba(79, 23, 37, 0.8)" 
              maxW="3xl" 
              lineHeight="relaxed"
            >
              MCBios 2026 unites visionary researchers, clinicians, and technologists who are bridging 
              data, AI, and innovation to transform health. Experience the convergence of computational 
              biology, artificial intelligence, and healthcare innovation in the vibrant setting of Florida.
            </Text>
          </VStack>

          {/* Features Grid */}
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
            gap={6}
          >
            {features.map((feature, index) => (
              <CardRoot
                key={index}
                bg="rgba(255, 255, 255, 0.8)"
                backdropFilter="blur(12px)"
                borderColor="rgba(79, 23, 37, 0.2)"
                _hover={{
                  shadow: "xl",
                  borderColor: "rgba(158, 46, 74, 0.5)",
                }}
                transition="all 0.3s"
                role="group"
              >
                <CardBody p={6}>
                  <VStack gap={4} textAlign="center">
                    <Box
                      p={3}
                      bgGradient="linear(to-br, maroon.900, pink.800)"
                      color="offWhite.50"
                      borderRadius="lg"
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="transform 0.3s"
                    >
                      <Icon as={feature.icon} boxSize={8} />
                    </Box>
                    <Badge 
                      variant="outline" 
                      borderColor="pink.800" 
                      color="pink.800" 
                      fontWeight="medium" 
                      fontSize="base"
                    >
                      {feature.badge}
                    </Badge>
                    <Heading as="h3" size="md" color="maroon.900">
                      {feature.title}
                    </Heading>
                    <Text color="rgba(79, 23, 37, 0.7)" lineHeight="relaxed">
                      {feature.description}
                    </Text>
                  </VStack>
                </CardBody>
              </CardRoot>
            ))}
          </Grid>

          {/* Conference Stats */}
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6} textAlign="center">
            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="medium" color="pink.800">500+</Text>
              <Text color="rgba(79, 23, 37, 0.7)">Attendees</Text>
            </VStack>
            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="medium" color="pink.800">50+</Text>
              <Text color="rgba(79, 23, 37, 0.7)">Speakers</Text>
            </VStack>
            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="medium" color="pink.800">3</Text>
              <Text color="rgba(79, 23, 37, 0.7)">Days</Text>
            </VStack>
            <VStack gap={2}>
              <Text fontSize="3xl" fontWeight="medium" color="pink.800">25+</Text>
              <Text color="rgba(79, 23, 37, 0.7)">Sessions</Text>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}