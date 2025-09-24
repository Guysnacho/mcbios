import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  CardRoot,
  CardBody,
  Badge,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Check, Star, Users, Calendar } from "lucide-react";
import { Separator } from './figma/separator';

export function Registration() {
  const pricingTiers = [
    {
      name: "Student",
      price: "$299",
      originalPrice: "$399",
      description: "Perfect for students and early-career health tech researchers",
      features: [
        "Full conference access",
        "Welcome reception",
        "Coffee breaks included",
        "Digital proceedings",
        "Student networking events",
        "Poster session participation"
      ],
      badge: "Popular",
      badgeColor: { bg: "pink.800", color: "offWhite.50" },
      popular: false
    },
    {
      name: "Academic",
      price: "$599",
      originalPrice: "$799",
      description: "Ideal for faculty and healthcare AI researchers",
      features: [
        "Full conference access",
        "Welcome reception",
        "All meals included",
        "Digital & printed proceedings",
        "Workshop materials",
        "Networking dinner",
        "Certificate of attendance",
        "Priority seating"
      ],
      badge: "Best Value",
      badgeColor: { bg: "gold.500", color: "maroon.900" },
      popular: true
    },
    {
      name: "Industry",
      price: "$999",
      originalPrice: "$1299",
      description: "Comprehensive package for health tech industry professionals",
      features: [
        "Full conference access",
        "Welcome reception",
        "All meals included",
        "Digital & printed proceedings",
        "Premium workshop access",
        "VIP networking events",
        "Exhibition booth visits",
        "One-on-one speaker meetings",
        "Certificate of attendance",
        "Priority support"
      ],
      badge: "Premium",
      badgeColor: { bg: "maroon.900", color: "offWhite.50" },
      popular: false
    }
  ];

  const importantDates = [
    { date: "January 15, 2026", event: "Early Bird Registration Ends", urgent: true },
    { date: "February 1, 2026", event: "Abstract Submission Deadline", urgent: false },
    { date: "February 15, 2026", event: "Regular Registration Ends", urgent: false },
    { date: "March 1, 2026", event: "Late Registration Begins", urgent: false }
  ];

  return (
    <Box 
      as="section" 
      id="registration" 
      py={20} 
      px={4} 
      bgGradient="linear(to-b, rgba(158, 46, 74, 0.1), rgba(79, 23, 37, 0.05))" 
      position="relative"
    >
      {/* Art Deco Geometric Elements */}
      <Box
        position="absolute"
        top="20"
        left="25%"
        w="24"
        h="24"
        border="2px solid"
        borderColor="rgba(212, 175, 55, 0.2)"
        transform="rotate(45deg)"
      />
      <Box
        position="absolute"
        bottom="20"
        right="25%"
        w="32"
        h="32"
        border="2px solid"
        borderColor="rgba(79, 23, 37, 0.2)"
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
                Registration
              </Badge>
              <Box w={12} h="2px" bg="maroon.900" />
            </HStack>
            
            <Heading 
              as="h2" 
              fontSize={{ base: "4xl", lg: "5xl" }} 
              fontWeight="medium" 
              color="maroon.900"
            >
              Secure Your
              <Text as="span" color="pink.800"> Spot</Text>
            </Heading>
            
            <Text 
              fontSize="lg" 
              color="rgba(79, 23, 37, 0.8)" 
              maxW="3xl" 
              lineHeight="relaxed"
              mb={8}
            >
              Join the most prestigious gathering of healthcare AI and data science experts. 
              Early bird pricing available for a limited time.
            </Text>

            <HStack gap={2} color="maroon.900">
              <Icon as={Calendar} boxSize={5} color="pink.800" />
              <Text fontWeight="medium">Early Bird Ends: January 15, 2026</Text>
            </HStack>
          </VStack>

          {/* Pricing Cards */}
          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
            gap={8}
          >
            {pricingTiers.map((tier, index) => (
              <CardRoot 
                key={index}
                position="relative"
                bg="rgba(255, 255, 255, 0.95)"
                backdropFilter="blur(12px)"
                border="2px solid"
                borderColor={tier.popular ? "gold.500" : "rgba(79, 23, 37, 0.2)"}
                transform={tier.popular ? "scale(1.05)" : "scale(1)"}
                _hover={{
                  shadow: "2xl",
                  transform: tier.popular ? "scale(1.1)" : "scale(1.05)",
                  borderColor: tier.popular ? "gold.500" : "rgba(158, 46, 74, 0.5)",
                }}
                transition="all 0.3s"
              >
                {tier.popular && (
                  <Badge 
                    position="absolute"
                    top="-16px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={tier.badgeColor.bg}
                    color={tier.badgeColor.color}
                    fontWeight="medium"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Icon as={Star} boxSize={3} />
                    {tier.badge}
                  </Badge>
                )}
                
                <CardBody p={8}>
                  <VStack gap={6}>
                    {/* Header */}
                    <VStack gap={4} textAlign="center">
                      <Heading as="h3" size="lg" color="maroon.900">
                        {tier.name}
                      </Heading>
                      <Text color="rgba(79, 23, 37, 0.7)" fontSize="sm">
                        {tier.description}
                      </Text>
                      
                      <VStack gap={1}>
                        <HStack gap={2} justify="center">
                          <Text fontSize="4xl" fontWeight="medium" color="maroon.900">
                            {tier.price}
                          </Text>
                          <Text 
                            fontSize="lg" 
                            color="rgba(79, 23, 37, 0.6)" 
                            textDecoration="line-through"
                          >
                            {tier.originalPrice}
                          </Text>
                        </HStack>
                        <Text color="pink.800" fontWeight="medium" fontSize="sm">
                          Early Bird Price
                        </Text>
                      </VStack>
                    </VStack>

                    {/* Features */}
                    <VStack gap={3} align="stretch">
                      {tier.features.map((feature, featureIndex) => (
                        <HStack key={featureIndex} gap={3} align="flex-start">
                          <Icon as={Check} boxSize={5} color="pink.800" mt="2px" flexShrink={0} />
                          <Text color="rgba(79, 23, 37, 0.8)" fontSize="sm">
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* CTA Button */}
                    <Button 
                      w="full"
                      size="lg"
                      bg={tier.popular ? "gold.500" : "maroon.900"}
                      color={tier.popular ? "maroon.900" : "offWhite.50"}
                      _hover={{
                        bg: tier.popular ? "bronze.500" : "pink.800",
                      }}
                      fontWeight="medium"
                    >
                      Register Now
                    </Button>
                  </VStack>
                </CardBody>
              </CardRoot>
            ))}
          </Grid>

          {/* Important Dates and Group Discounts */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8} w="full">
            {/* Important Dates */}
            <CardRoot bg="rgba(255, 255, 255, 0.9)" backdropFilter="blur(12px)" borderColor="rgba(79, 23, 37, 0.2)">
              <CardBody p={8}>
                <VStack gap={6} align="stretch">
                  <HStack gap={2}>
                    <Icon as={Calendar} boxSize={5} color="pink.800" />
                    <Heading as="h3" size="md" color="maroon.900">
                      Important Dates
                    </Heading>
                  </HStack>
                  
                  <VStack gap={4} align="stretch">
                    {importantDates.map((item, index) => (
                      <Box key={index}>
                        <Flex justify="space-between" align="center" py={2}>
                          <Text color="rgba(79, 23, 37, 0.8)">
                            {item.event}
                          </Text>
                          <Badge 
                            variant={item.urgent ? "solid" : "outline"}
                            bg={item.urgent ? "pink.800" : undefined}
                            color={item.urgent ? "offWhite.50" : "maroon.900"}
                            borderColor={!item.urgent ? "maroon.900" : undefined}
                            fontWeight="medium"
                          >
                            {item.date}
                          </Badge>
                        </Flex>
                        {index < importantDates.length - 1 && (
                          <Separator borderColor="rgba(79, 23, 37, 0.1)" />
                        )}
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </CardRoot>

            {/* Group Discounts */}
            <CardRoot bg="rgba(255, 255, 255, 0.9)" backdropFilter="blur(12px)" borderColor="rgba(79, 23, 37, 0.2)">
              <CardBody p={8}>
                <VStack gap={6} align="stretch">
                  <HStack gap={2}>
                    <Icon as={Users} boxSize={5} color="pink.800" />
                    <Heading as="h3" size="md" color="maroon.900">
                      Group Discounts
                    </Heading>
                  </HStack>
                  
                  <VStack gap={4} align="stretch">
                    <Box p={4} bg="offWhite.50" borderRadius="lg" border="1px solid" borderColor="rgba(79, 23, 37, 0.1)">
                      <Heading as="h4" size="sm" color="maroon.900" mb={2}>
                        5+ Attendees
                      </Heading>
                      <Text color="rgba(79, 23, 37, 0.7)" fontSize="sm" mb={2}>
                        10% discount on all registration types
                      </Text>
                      <Badge variant="outline" borderColor="pink.800" color="pink.800" fontWeight="medium">
                        Contact Us
                      </Badge>
                    </Box>
                    
                    <Box p={4} bg="offWhite.50" borderRadius="lg" border="1px solid" borderColor="rgba(79, 23, 37, 0.1)">
                      <Heading as="h4" size="sm" color="maroon.900" mb={2}>
                        10+ Attendees
                      </Heading>
                      <Text color="rgba(79, 23, 37, 0.7)" fontSize="sm" mb={2}>
                        15% discount + complimentary workshop
                      </Text>
                      <Badge variant="outline" borderColor="pink.800" color="pink.800" fontWeight="medium">
                        Contact Us
                      </Badge>
                    </Box>
                    
                    <Button 
                      variant="outline"
                      borderColor="maroon.900"
                      color="maroon.900"
                      _hover={{
                        bg: "maroon.900",
                        color: "offWhite.50",
                      }}
                      fontWeight="medium"
                    >
                      Get Group Pricing
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </CardRoot>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}