import { MemberContent } from "@/components/dashboard/admin/MemberContent";
import UserConfirm from "@/components/dashboard/admin/UserConfirm";
import VideoUploader from "@/components/dashboard/admin/VideoUploader";
import { User } from "@/components/User";
import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { DUPLICATE_ROW } from "@/lib/utils/constants";
import { createClient as createCompoentClient } from "@/lib/utils/supabase/component";
import { authFetcher } from "@/lib/utils/swrFetchers";
import {
  Button,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import useSWR from "swr";

let tabs = [
  {
    id: "content",
    label: "Conference Content",
  },
  {
    id: "user",
    label: "Profile",
  },
];

export default function Dashboard() {
  const client = createCompoentClient();
  const store = useStore(useUserStore, (store) => store);
  const toast = useToast();

  const { data, error } = useSWR("/auth/user", () => authFetcher(client));

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta content="Dashboard | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <div className="container mx-auto justify-center">
        <div className="h-20 flex justify-center align-middle">
          <h3 className="text-center my-auto">Welcome</h3>
        </div>
        <Tabs
          aria-label="Dashboard Tabs"
          size="lg"
          // isFitted
          variant="enclosed"
        >
          <TabList>
            {data?.user && data.user.role === "admin" ? (
              <Tab title="Admin">Admin</Tab>
            ) : undefined}
            <Tab title="Conference Content">Conference Content</Tab>
            <Tab title="Profile">Profile</Tab>
          </TabList>
          <TabPanels>
          {data?.user && data?.user.role === "admin" ? (
              <TabPanel>
                <div className="my-5 flex gap-3 mx-auto justify-center">
                  <VideoUploader />
                </div>
                <Divider className="my-5" />
                <div className="max-w-[500]px my-5 flex gap-3 mx-auto justify-center">
                  <UserConfirm client={client} />
                </div>
              </TabPanel>
            ) : undefined}

            <TabPanel>
              {data?.user && data?.user.dues_paid_at ? (
                <MemberContent videos={data?.videos} />
              ) : undefined}
            </TabPanel>

            <TabPanel>
              <div className="my-5 flex gap-3 mx-auto justify-center">
                <div>
                  <h5 className="text-center">Your Member Info</h5>
                  <User
                    fname={data?.user?.fname}
                    lname={data?.user?.lname}
                    role={data?.user?.role}
                  />
                </div>
              </div>
              <Divider />
              <div className="container text-center space-y-4">
                {!data?.user || !data?.user?.dues_paid_at ? (
                  <>
                    <h4>Welcome to MCBIOS!</h4>
                    <p>
                      If you haven&apos;t already, please pay your dues to
                      finish MCBIOS onboarding and to gain access to past
                      conference recordings, upcomming elections, and more
                      coming soon!
                    </p>
                    <div className="container">
                      <p>
                        If you have paid your dues, notify us here so we can
                        confirm and grant access to everything MCBIOS!
                      </p>
                      <Button
                        colorScheme="green"
                        className="my-5"
                        onClick={() => {
                          client
                            .from("confirm_request")
                            .insert({ user_id: store?.id })
                            .then(({ error }) => {
                              if (error) {
                                if (error?.code === DUPLICATE_ROW) {
                                  toast({
                                    status: "error",
                                    duration: 6000,
                                    isClosable: true,
                                    description:
                                      "Gotcha, we'll update your access as soon as we confirm.",
                                  });
                                } else {
                                  toast({
                                    status: "error",
                                    duration: 6000,
                                    isClosable: true,
                                    description:
                                      "Something went wrong while we submitting your membership request - " +
                                      error.message,
                                  });
                                  console.error(error);
                                }
                              } else {
                                toast({
                                  status: "success",
                                  duration: 6000,
                                  isClosable: true,
                                  description:
                                    "Thank you for letting us know, we'll confirm your membership status ASAP!",
                                });
                              }
                            });
                        }}
                      >
                        My dues are paid
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <Script
                        src="https://www.paypal.com/sdk/js?client-id=BAAaWKKJH9d9_1A9lYbo-zc52pLBBTCR9boQNSGOQk7OR76lLHGsUvjZDTAm4ONcsLFqflVbaKH-ylGe-0&components=hosted-buttons&enable-funding=venmo&currency=USD"
                        onReady={() => {
                          // @ts-expect-error Baaaaahhhhh issokay
                          paypal
                            .HostedButtons({
                              hostedButtonId: "VEMTS2QGYVFQ8",
                            })
                            .render("#paypal-container-VEMTS2QGYVFQ8");
                        }}
                      ></Script>
                      <div id="paypal-container-VEMTS2QGYVFQ8"></div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}
