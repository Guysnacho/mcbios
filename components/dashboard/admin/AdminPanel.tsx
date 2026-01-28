import { Database } from "@/lib/supabase/types";
import {
  Heading,
  Tabs,
} from "@chakra-ui/react";
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
        <div className="max-w-[500]px my-5 space-y-5 mx-auto justify-center">
          <div>
            <Heading size="md" textAlign="center">
              Authenticated Registrations
            </Heading>
            <Registrations currentMembers />
          </div>

          <div>
            <Heading size="md" textAlign="center">
              Un-Authenticated Registrations
            </Heading>
            <Registrations />
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="confirm">
        <Heading size="md" textAlign="center">
          User Account Confirmation
        </Heading>
        <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
          <UserConfirm client={client} />
        </div>
      </Tabs.Content>

      <Tabs.Content value="content">
        <div className="my-5 gap-3 mx-auto justify-center">
          <Heading size="md" textAlign="center">
            Add Conference Content
          </Heading>

          <div className="flex justify-center">
            <VideoUploader />
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="coupon">
        <CouponCreator />
      </Tabs.Content>
    </Tabs.Root>
  );
}
