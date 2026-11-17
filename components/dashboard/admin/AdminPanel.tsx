import { getBaseServiceURL } from "@/lib";
import { Database } from "@/lib/supabase/types";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { ChevronLeft, Ticket, Upload, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import Registrations from "./Registrations";
import UserConfirm from "./UserConfirm";
import VideoUploader from "./VideoUploader";

type AdminPanelProps = {
  client: SupabaseClient<Database>;
};

type AdminSection =
  | "overview"
  | "registrations"
  | "confirm"
  | "content"
  | "coupon";

const adminCards = [
  {
    key: "registrations" as const,
    title: "Registrations",
    description: "View everyone registered for the conference",
    icon: Users,
    color: "blue",
  },
  {
    key: "confirm" as const,
    title: "Member Confirmation",
    description: "Confirm user memberships and re-apply missed registration payments",
    icon: UserCheck,
    color: "green",
  },
  {
    key: "content" as const,
    title: "Content Update",
    description: "Add conference session recordings",
    icon: Upload,
    color: "purple",
  },
  {
    key: "coupon" as const,
    title: "Promotions",
    description: "Create and manage discount codes in the Conference Suite",
    icon: Ticket,
    color: "orange",
  },
];

export function AdminPanel({ client }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  if (activeSection !== "overview") {
    return (
      <Stack gap="6" py="6">
        <Flex align="center" gap="3">
          <Box
            as="button"
            onClick={() => setActiveSection("overview")}
            display="flex"
            alignItems="center"
            gap="2"
            px="3"
            py="2"
            rounded="md"
            fontSize="sm"
            fontWeight="medium"
            color={{ base: "blue.600", _dark: "blue.400" }}
            _hover={{ bg: { base: "gray.100", _dark: "gray.800" } }}
            transition="background 0.2s"
          >
            <Icon boxSize="4">
              <ChevronLeft />
            </Icon>
            Back to Admin
          </Box>
          <Heading size="lg" color={{ base: "gray.900", _dark: "white" }}>
            {adminCards.find((c) => c.key === activeSection)?.title}
          </Heading>
        </Flex>

        {activeSection === "registrations" && (
          <Stack gap="8" maxW="6xl" mx="auto" w="full">
            <Card.Root
              variant="outline"
              borderColor={{ base: "gray.200", _dark: "gray.700" }}
            >
              <Card.Header>
                <Card.Title
                  fontSize="md"
                  color={{ base: "gray.900", _dark: "white" }}
                >
                  Registrations
                </Card.Title>
              </Card.Header>
              <Card.Body pt="0">
                <Registrations />
              </Card.Body>
            </Card.Root>
          </Stack>
        )}

        {activeSection === "confirm" && (
          <Card.Root
            variant="outline"
            maxW="4xl"
            mx="auto"
            w="full"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
          >
            <Card.Header>
              <Card.Title
                fontSize="md"
                color={{ base: "gray.900", _dark: "white" }}
              >
                User Account Confirmation
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <UserConfirm client={client} />
            </Card.Body>
          </Card.Root>
        )}

        {activeSection === "content" && (
          <Card.Root
            variant="outline"
            maxW="4xl"
            mx="auto"
            w="full"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
          >
            <Card.Header>
              <Card.Title
                fontSize="md"
                color={{ base: "gray.900", _dark: "white" }}
              >
                Add Conference Content
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Flex justify="center">
                <VideoUploader />
              </Flex>
            </Card.Body>
          </Card.Root>
        )}

        {activeSection === "coupon" && (
          <Card.Root
            variant="outline"
            maxW="4xl"
            mx="auto"
            w="full"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
          >
            <Card.Header>
              <Card.Title
                fontSize="md"
                color={{ base: "gray.900", _dark: "white" }}
              >
                Manage promotions in the Conference Suite
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" align="start">
                <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.300" }}>
                  Discount codes for registration are created and managed in the
                  Conference Suite, so they apply to this conference&apos;s checkout.
                </Text>
                <Button asChild colorPalette="blue">
                  <a
                    href={`${getBaseServiceURL()}/dashboard/${process.env.NEXT_PUBLIC_ORG_ID}/promotions`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Promotions
                  </a>
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>
    );
  }

  return (
    <Stack gap="6" py="6">
      <Box>
        <Heading size="lg" color={{ base: "gray.900", _dark: "white" }} mb="1">
          Admin Dashboard
        </Heading>
        <Text fontSize="sm" color={{ base: "gray.500", _dark: "gray.400" }}>
          Manage registrations, memberships, content, and promotions
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="4">
        {adminCards.map((card) => (
          <Card.Root
            key={card.key}
            as="button"
            onClick={() => setActiveSection(card.key)}
            variant="outline"
            cursor="pointer"
            transition="all 0.2s"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
            _hover={{
              borderColor: {
                base: `${card.color}.300`,
                _dark: `${card.color}.600`,
              },
              shadow: "md",
              transform: "translateY(-2px)",
            }}
            textAlign="left"
          >
            <Card.Body>
              <Flex gap="4" align="start">
                <Flex
                  w="12"
                  h="12"
                  rounded="lg"
                  align="center"
                  justify="center"
                  bg={{ base: `${card.color}.50`, _dark: `${card.color}.950` }}
                  flexShrink={0}
                >
                  <Icon
                    boxSize="6"
                    color={{
                      base: `${card.color}.600`,
                      _dark: `${card.color}.400`,
                    }}
                  >
                    <card.icon />
                  </Icon>
                </Flex>
                <Box>
                  <Text
                    fontWeight="semibold"
                    fontSize="md"
                    color={{ base: "gray.900", _dark: "white" }}
                    mb="1"
                  >
                    {card.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.500", _dark: "gray.400" }}
                  >
                    {card.description}
                  </Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Stack>
  );
}
