import { Database } from "@/lib/supabase/types";
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { CouponCreator } from "./CouponCreator";
import UserConfirm from "./UserConfirm";
import VideoUploader from "./VideoUploader";
import RawRegistrations from "./RawRegistrations";

type AdminPanelProps = {
  client: SupabaseClient<Database>;
};

export function AdminPanel({ client }: AdminPanelProps) {
  return (
    <TabPanel>
      <Tabs
        aria-label="Admin Tabs"
        isFitted
        variant="line"
        colorScheme="purple"
      >
        <TabList>
          <Tab>Registration Info</Tab>
          <Tab>Member Confirmation</Tab>
          <Tab>Content Update</Tab>
          <Tab>Coupon Creator</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" textAlign="center">
              Un-Authenticated Registrations
            </Heading>
            <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
              <RawRegistrations client={client} />
            </div>

            <Heading size="md" textAlign="center">
              Membership
            </Heading>
            <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
              <UserConfirm client={client} />
            </div>
          </TabPanel>

          <TabPanel>
            <Heading size="md" textAlign="center">
              User Account Confirmation
            </Heading>
            <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
              <UserConfirm client={client} />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="my-5 gap-3 mx-auto justify-center">
              <Heading size="md" textAlign="center">
                Add Conference Content
              </Heading>

              <div className="flex justify-center">
                <VideoUploader />
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <CouponCreator />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TabPanel>
  );
}
