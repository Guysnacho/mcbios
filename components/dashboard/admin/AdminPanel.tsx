import { Database } from "@/lib/supabase/types";
import {
  TabPanel,
  Divider,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from "@chakra-ui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { CouponCreator } from "./CouponCreator";
import UserConfirm from "./UserConfirm";
import VideoUploader from "./VideoUploader";

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
          <Tab title="Video Upload">Video Upload</Tab>
          <Tab title="Member Confirmation">Member Confirmation</Tab>
          <Tab title="Coupon Creator">Coupon Creator</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="my-5 gap-3 mx-auto justify-center">
              <Heading size="md" textAlign="center">
                User Account Confirmation
              </Heading>

              <div className="flex justify-center">
                <VideoUploader />
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <Heading size="md" textAlign="center">
              User Account Confirmation
            </Heading>
            <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
              {/* Add coupon */}
              <UserConfirm client={client} />
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
