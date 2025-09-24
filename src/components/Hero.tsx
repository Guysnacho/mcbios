import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Grid, 
  GridItem, 
  Heading, 
  Text,
  VStack,
  HStack
} from '@chakra-ui/react';
import { Calendar, MapPin, Users } from "lucide-react";
import { WordCloud } from "./WordCloud";

export function Hero() {
  return (
    <Box
      as="section"
      pt={24}
      pb={16}
      px={4}
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {/* Art Deco Background Pattern */}
      <Box position="absolute" inset={0} opacity={0.1}>
        <Box position="absolute" top={0} left={0} w="full" h="full">
          {/* Geometric patterns */}
          <Box
            position="absolute"
            top="20"
            left="10"
            w="32"
            h="32"
            border="2px solid"
            borderColor="gold.500"
            transform="rotate(45deg)"
            opacity={0.3}
          />
          <Box
            position="absolute"
            bottom="20"
            right="10"
            w="24"
            h="24"
            border="2px solid"
            borderColor="gold.500"
            transform="rotate(12deg)"
            opacity={0.3}
          />
          <Box
            position="absolute"
            top="50%"
            left="25%"
            w="16"
            h="16"
            bg="gold.500"
            opacity={0.2}
            clipPath="polygon(50% 0%, 0% 100%, 100% 100%)"
          />
        </Box>
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={10}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
          {/* Main Content */}
          <GridItem>
            <VStack align="flex-start" gap={8}>
              <VStack align="flex-start" gap={4}>
                <HStack gap={2} color="rgba(249, 242, 235, 0.8)">
                  <Box w={2} h={2} bg="gold.500" borderRadius="full" />
                  <Text fontSize="sm" lettergap="wider" textTransform="uppercase">
                    Annual Conference
                  </Text>
                </HStack>
                
                <Box>
                  <Heading
                    as="h1"
                    fontSize={{ base: "5xl", lg: "7xl" }}
                    fontWeight="bold"
                    lineHeight="tight"
                  >
                    <Text as="span" color="offWhite.50">
                      MCBios
                    </Text>
                    <br />
                    <Text 
                      as="span" 
                      color="gold.500" 
                      position="relative"
                      _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "-8px",
                        left: 0,
                        width: "96px",
                        height: "4px",
                        bgGradient: "linear(to-r, gold.500, transparent)",
                      }}
                    >
                      2026
                    </Text>
                  </Heading>
                </Box>
                
                <Text 
                  fontSize="xl" 
                  color="rgba(249, 242, 235, 0.9)" 
                  maxW="xl" 
                  lineHeight="relaxed"
                >
                  Bridging Data, AI, and Innovation to Transform Health. Join leading researchers 
                  and industry pioneers shaping the future of healthcare through computational biology.
                </Text>
              </VStack>

              {/* Event Details */}
              <Flex wrap="wrap" gap={6} color="offWhite.50">
                <HStack gap={2}>
                  <Calendar size={20} color="#d4af37" />
                  <Text>March 15-17, 2026</Text>
                </HStack>
                <HStack gap={2}>
                  <MapPin size={20} color="#d4af37" />
                  <Text>Miami, Florida</Text>
                </HStack>
                <HStack gap={2}>
                  <Users size={20} color="#d4af37" />
                  <Text>500+ Attendees</Text>
                </HStack>
              </Flex>

              {/* CTA Buttons */}
              <Flex wrap="wrap" gap={4}>
                <Button 
                  size="lg"
                  bg="gold.500"
                  color="maroon.900"
                  _hover={{ bg: "bronze.500" }}
                  fontWeight="medium"
                  fontSize="base"
                  px={8}
                  py={3}
                  h="auto"
                >
                  Register Now
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  borderColor="offWhite.50"
                  color="offWhite.50"
                  _hover={{
                    bg: "offWhite.50",
                    color: "maroon.900",
                  }}
                  fontWeight="medium"
                  fontSize="base"
                  px={8}
                  py={3}
                  h="auto"
                >
                  View Schedule
                </Button>
              </Flex>
            </VStack>
          </GridItem>

          {/* Word Cloud */}
          <GridItem>
            <Flex justify={{ base: "center", lg: "flex-end" }}>
              <WordCloud />
            </Flex>
          </GridItem>
        </Grid>
      </Container>

      {/* Decorative Elements */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        w="full"
        h="32"
        bgGradient="linear(to-t, rgba(249, 242, 235, 0.2), transparent)"
      />
    </Box>
  );
}