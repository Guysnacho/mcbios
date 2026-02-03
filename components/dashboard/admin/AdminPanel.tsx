import { Database } from "@/lib/supabase/types";
import { Box, Flex, Heading, Stack, Tabs } from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { CouponCreator } from "./CouponCreator";
import Registrations from "./Registrations";
import UserConfirm from "./UserConfirm";
import VideoUploader from "./VideoUploader";

type AdminPanelProps = {
  client: SupabaseClient<Database>;
};

export function AdminPanel({ client }: AdminPanelProps) {
  return (
    <Tabs.Root
      aria-label="Admin Tabs"
      fitted
      variant="line"
      colorPalette="purple"
      defaultValue="registrations"
    >
      <Tabs.List>
        <Tabs.Trigger value="registrations">Registration Info</Tabs.Trigger>
        <Tabs.Trigger value="confirm">Member Confirmation</Tabs.Trigger>
        <Tabs.Trigger value="content">Content Update</Tabs.Trigger>
        <Tabs.Trigger value="coupon">Coupon Creator</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="registrations">
        <Stack gap="8" py="6" maxW="6xl" mx="auto">
          <Box>
            <Heading
              size="md"
              textAlign="center"
              color={{ base: "slate.900", _dark: "white" }}
              mb="4"
            >
              Authenticated Registrations
            </Heading>
            <Registrations currentMembers />
          </Box>

          <Box>
            <Heading
              size="md"
              textAlign="center"
              color={{ base: "slate.900", _dark: "white" }}
              mb="4"
            >
              Un-Authenticated Registrations
            </Heading>
            <Registrations />
          </Box>
        </Stack>
      </Tabs.Content>

      <Tabs.Content value="confirm">
        <Stack gap="6" py="6" maxW="4xl" mx="auto">
          <Heading
            size="md"
            textAlign="center"
            color={{ base: "slate.900", _dark: "white" }}
          >
            User Account Confirmation
          </Heading>
          <Flex justify="center">
            <UserConfirm client={client} />
          </Flex>
        </Stack>
      </Tabs.Content>

      <Tabs.Content value="content">
        <Stack gap="6" py="6" maxW="4xl" mx="auto">
          <Heading
            size="md"
            textAlign="center"
            color={{ base: "slate.900", _dark: "white" }}
          >
            Add Conference Content
          </Heading>

          <Flex justify="center">
            <VideoUploader />
          </Flex>
        </Stack>
      </Tabs.Content>

      <Tabs.Content value="coupon">
        <Box py="6">
          <CouponCreator />
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
}
