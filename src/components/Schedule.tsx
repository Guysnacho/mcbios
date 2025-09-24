import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Icon,
  Flex,
  Tabs,
  CardRoot,
} from "@chakra-ui/react";
import { Clock, MapPin, Users } from "lucide-react";

export function Schedule() {
  const scheduleData = {
    "Day 1": {
      date: "March 15, 2026",
      title: "Opening & Keynotes",
      events: [
        {
          time: "8:00 AM",
          title: "Registration & Coffee",
          type: "networking",
          location: "Main Lobby",
          duration: "60 min",
        },
        {
          time: "9:00 AM",
          title: "Opening Ceremony",
          speaker: "Conference Committee",
          type: "ceremony",
          location: "Grand Ballroom",
          duration: "30 min",
        },
        {
          time: "9:30 AM",
          title: "Keynote: AI Transforming Clinical Decision Making",
          speaker: "Dr. Maria Rodriguez",
          type: "keynote",
          location: "Grand Ballroom",
          duration: "60 min",
        },
        {
          time: "10:30 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min",
        },
        {
          time: "11:00 AM",
          title: "Session: AI in Healthcare Applications",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Conference Room A",
          duration: "90 min",
        },
        {
          time: "12:30 PM",
          title: "Lunch & Networking",
          type: "networking",
          location: "Restaurant Terrace",
          duration: "90 min",
        },
        {
          time: "2:00 PM",
          title: "Workshop: Clinical Data Science Fundamentals",
          speaker: "Dr. Ahmed Hassan",
          type: "workshop",
          location: "Lab Suite 1",
          duration: "2 hours",
        },
        {
          time: "4:00 PM",
          title: "Poster Session",
          type: "poster",
          location: "Exhibition Hall",
          duration: "2 hours",
        },
      ],
    },
    "Day 2": {
      date: "March 16, 2026",
      title: "Research & Innovation",
      events: [
        {
          time: "9:00 AM",
          title: "Keynote: AI for Drug Discovery & Diagnostics",
          speaker: "Dr. Sarah Johnson",
          type: "keynote",
          location: "Grand Ballroom",
          duration: "60 min",
        },
        {
          time: "10:00 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min",
        },
        {
          time: "10:30 AM",
          title: "Session: Precision Medicine & Multi-omics",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Conference Room A",
          duration: "90 min",
        },
        {
          time: "12:00 PM",
          title: "Lunch & Vendor Demos",
          type: "networking",
          location: "Exhibition Hall",
          duration: "90 min",
        },
        {
          time: "1:30 PM",
          title: "Panel: Ethics in Healthcare AI",
          speaker: "Expert Panel",
          type: "panel",
          location: "Grand Ballroom",
          duration: "75 min",
        },
        {
          time: "3:00 PM",
          title: "Workshop: Biomarker Discovery with Multi-omics",
          speaker: "Dr. Lisa Park",
          type: "workshop",
          location: "Lab Suite 2",
          duration: "2 hours",
        },
        {
          time: "6:00 PM",
          title: "Gala Dinner",
          type: "social",
          location: "Oceanview Terrace",
          duration: "3 hours",
        },
      ],
    },
    "Day 3": {
      date: "March 17, 2026",
      title: "Future Directions",
      events: [
        {
          time: "9:00 AM",
          title: "Session: Population Health Analytics",
          speaker: "Prof. Roberto Silva",
          type: "session",
          location: "Conference Room A",
          duration: "90 min",
        },
        {
          time: "10:30 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min",
        },
        {
          time: "11:00 AM",
          title: "Lightning Talks",
          speaker: "Young Researchers",
          type: "talks",
          location: "Conference Room B",
          duration: "60 min",
        },
        {
          time: "12:00 PM",
          title: "Lunch & Career Fair",
          type: "networking",
          location: "Exhibition Hall",
          duration: "90 min",
        },
        {
          time: "1:30 PM",
          title: "Session: Future of Health Technology",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Grand Ballroom",
          duration: "90 min",
        },
        {
          time: "3:00 PM",
          title: "Closing Ceremony & Awards",
          speaker: "Conference Committee",
          type: "ceremony",
          location: "Grand Ballroom",
          duration: "60 min",
        },
        {
          time: "4:00 PM",
          title: "Farewell Reception",
          type: "networking",
          location: "Main Lobby",
          duration: "60 min",
        },
      ],
    },
  };

  const getTypeColor = (
    type: string
  ): { bg: string; color: string; border?: string } => {
    const colors = {
      keynote: { bg: "gold.500", color: "maroon.900" },
      session: { bg: "maroon.900", color: "offWhite.50" },
      workshop: { bg: "pink.800", color: "offWhite.50" },
      networking: {
        bg: "offWhite.50",
        color: "maroon.900",
        border: "maroon.900",
      },
      break: { bg: "gray.100", color: "gray.600" },
      ceremony: { bg: "gold.500", color: "maroon.900" },
      poster: { bg: "rgba(158, 46, 74, 0.8)", color: "offWhite.50" },
      panel: { bg: "rgba(79, 23, 37, 0.8)", color: "offWhite.50" },
      social: { bg: "pink.800", color: "offWhite.50" },
      talks: { bg: "rgba(158, 46, 74, 0.6)", color: "offWhite.50" },
    };
    return (
      colors[type as keyof typeof colors] || {
        bg: "gray.200",
        color: "gray.800",
      }
    );
  };

  return (
    <Box
      as="section"
      id="schedule"
      py={20}
      px={4}
      bg="offWhite.50"
      position="relative"
    >
      {/* Art Deco Background Pattern */}
      <Box position="absolute" inset={0} opacity={0.05}>
        <Box
          h="full"
          w="full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #4f1725 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #9e2e4a 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
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
                Conference Schedule
              </Badge>
              <Box w={12} h="2px" bg="maroon.900" />
            </HStack>

            <Heading
              as="h2"
              fontSize={{ base: "4xl", lg: "5xl" }}
              fontWeight="medium"
              color="maroon.900"
            >
              Three Days of
              <Text as="span" color="pink.800">
                {" "}
                Discovery
              </Text>
            </Heading>

            <Text
              fontSize="lg"
              color="rgba(79, 23, 37, 0.8)"
              maxW="3xl"
              lineHeight="relaxed"
            >
              Immerse yourself in transformative healthcare AI research,
              hands-on workshops, and meaningful connections over three
              intensive days bridging data, AI, and innovation.
            </Text>
          </VStack>

          {/* Schedule Tabs */}
          <Box w="full">
            <Tabs.Root variant="enclosed" colorScheme="maroon">
              <Tabs.List bg="rgba(79, 23, 37, 0.1)" borderRadius="lg" mb={8}>
                {Object.keys(scheduleData).map((day) => (
                  <Tabs.Trigger
                    key={day}
                    value={day}
                    flex={1}
                    _selected={{
                      bg: "maroon.900",
                      color: "offWhite.50",
                    }}
                    fontWeight="medium"
                  >
                    {day}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {Object.entries(scheduleData).map(([day, data]) => (
                <Tabs.Content key={day} value={day} px={0}>
                  <VStack gap={6}>
                    {/* Day Header */}
                    <VStack gap={2} textAlign="center">
                      <Heading as="h3" size="lg" color="maroon.900">
                        {data.title}
                      </Heading>
                      <Text color="rgba(79, 23, 37, 0.7)">{data.date}</Text>
                    </VStack>

                    {/* Events List */}
                    <VStack gap={4} w="full">
                      {data.events.map((event, index) => (
                        <CardRoot
                          key={index}
                          w="full"
                          bg="rgba(255, 255, 255, 0.9)"
                          backdropFilter="blur(12px)"
                          borderColor="rgba(79, 23, 37, 0.2)"
                          _hover={{ shadow: "lg" }}
                          transition="all 0.3s"
                        >
                          <CardBody p={6}>
                            <Flex
                              direction={{ base: "column", md: "row" }}
                              align={{ md: "center" }}
                              gap={4}
                            >
                              {/* Time and Duration */}
                              <Box w={{ md: "25%" }}>
                                <Flex align="center" gap={4}>
                                  <Text
                                    fontSize="2xl"
                                    fontWeight="medium"
                                    color="maroon.900"
                                  >
                                    {event.time}
                                  </Text>
                                  <HStack
                                    gap={1}
                                    color="rgba(79, 23, 37, 0.6)"
                                    fontSize="sm"
                                  >
                                    <Icon as={Clock} boxSize={4} />
                                    <Text>{event.duration}</Text>
                                  </HStack>
                                </Flex>
                              </Box>

                              {/* Event Details */}
                              <Box flex={1}>
                                <VStack align="flex-start" gap={2}>
                                  <Flex wrap="wrap" align="center" gap={2}>
                                    <Heading
                                      as="h4"
                                      size="md"
                                      color="maroon.900"
                                    >
                                      {event.title}
                                    </Heading>
                                    <Badge
                                      bg={getTypeColor(event.type).bg}
                                      color={getTypeColor(event.type).color}
                                      borderColor={
                                        getTypeColor(event.type).border
                                      }
                                      variant={
                                        getTypeColor(event.type).border
                                          ? "outline"
                                          : "solid"
                                      }
                                      fontWeight="medium"
                                    >
                                      {event.type.charAt(0).toUpperCase() +
                                        event.type.slice(1)}
                                    </Badge>
                                  </Flex>

                                  {event.speaker && (
                                    <HStack gap={1} color="pink.800">
                                      <Icon as={Users} boxSize={4} />
                                      <Text>{event.speaker}</Text>
                                    </HStack>
                                  )}

                                  <HStack gap={1} color="rgba(79, 23, 37, 0.6)">
                                    <Icon as={MapPin} boxSize={4} />
                                    <Text>{event.location}</Text>
                                  </HStack>
                                </VStack>
                              </Box>
                            </Flex>
                          </CardBody>
                        </CardRoot>
                      ))}
                    </VStack>
                  </VStack>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
