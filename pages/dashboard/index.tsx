import { MemberContent } from "@/components/dashboard/admin/MemberContent";
import {
  PaymentHandler,
  PaymentHandlerType,
} from "@/components/dashboard/admin/PaymentHandler";
import UserConfirm from "@/components/dashboard/admin/UserConfirm";
import VideoUploader from "@/components/dashboard/admin/VideoUploader";
import { User } from "@/components/User";
import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { DUPLICATE_ROW } from "@/lib/utils/constants";
import { createClient as createCompoentClient } from "@/lib/utils/supabase/component";
import { authFetcher } from "@/lib/utils/swrFetchers";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import useSWR from "swr";

export default function Dashboard() {
  const client = createCompoentClient();
  const store = useStore(useUserStore, (store) => store);
  const toast = useToast();
  const [tier, setTier] = useState<PaymentHandlerType>();

  const { data, error } = useSWR("/auth/user", () => authFetcher(client));

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta content="Dashboard | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      <div className="container mx-auto justify-center">
        <div className="h-20 flex justify-center align-middle">
          <h3 className="text-center my-auto">
            {data?.user && data?.user.fname
              ? `Hey ${data?.user.fname}`
              : "Welcome"}
          </h3>
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
                {!data?.user ||
                  (!data?.user?.dues_paid_at && (
                    <>
                      <h4>Welcome to MCBIOS!</h4>
                      <p>
                        If you haven&apos;t already, please pay your dues to
                        finish MCBIOS onboarding and to gain you access to past
                        conference recordings, upcomming elections, and more!
                      </p>
                      <div className="container">
                        <p>
                          <span className="underline">
                            If you have paid your dues
                          </span>
                          , notify us here so we can confirm and grant access to
                          everything MCBIOS!
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
                      <Flex mx="auto" w={[null, "sm", "lg"]}>
                        {tier ? (
                          <Button
                            mx="auto"
                            leftIcon={<ChevronLeftIcon />}
                            onClick={() => setTier(undefined)}
                          >
                            Select a different tier
                          </Button>
                        ) : (
                          <Select
                            variant="outline"
                            placeholder="Select a membership level"
                            onChange={(e) => {
                              setTier(
                                e.currentTarget.value as PaymentHandlerType
                              );
                            }}
                          >
                            <option value="student">
                              Conference and Membership | Student | $200
                            </option>
                            <option value="postdoctorial">
                              Conference and Membership | Postdoctorial | $300
                            </option>
                            <option value="professional">
                              Conference and Membership | Professional | $400
                            </option>
                            <option value="member_only_student">
                              Membership | Student | $10
                            </option>
                            <option value="member_only_postdoctorial">
                              Membership | Postdoctorial | $20
                            </option>
                            <option value="member_only_professional">
                              Membership | Professional | $50
                            </option>
                          </Select>
                        )}
                      </Flex>
                      {tier ? (
                        <PaymentHandler
                          tier={tier}
                          userId={data.user.user_id}
                          email={data.user.email!}
                        />
                      ) : undefined}
                    </>
                  ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}
