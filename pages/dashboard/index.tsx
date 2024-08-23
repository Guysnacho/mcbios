import { MemberContent } from "@/components/dashboard/admin/MemberContent";
import UserConfirm from "@/components/dashboard/admin/UserConfirm";
import VideoUploader from "@/components/dashboard/admin/VideoUploader";
import { createClient as createCompoentClient } from "@/lib/utils/supabase/component";
import { createClient } from "@/lib/utils/supabase/server-props";
import { Database } from "@/lib/utils/supabase/types";
import { useUserStore } from "@/providers/UserStateProvider";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Script from "next/script";

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  // Fetch data from external API
  const client = createClient(context);
  const { data } = await client.from("member").select("*").single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .order("date", { ascending: false });

  if (data) {
    if (videos) {
      return { props: { user: data, videos } };
    }
    return { props: { user: data, videos: [] } };
  }
  return { props: { user: undefined, videos: [] } };
}) satisfies GetServerSideProps<{
  user: Database["public"]["Tables"]["member"]["Row"] | undefined;
  videos: Database["public"]["Tables"]["videos"]["Row"][];
}>;

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

export default function Dashboard(props: {
  user: Database["public"]["Tables"]["member"]["Row"];
  videos: Database["public"]["Tables"]["videos"]["Row"][];
}) {
  // const [currYear, setCurrYear] = useState<string>("");

  // const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   console.debug("event ");
  //   console.debug(e);
  //   setCurrYear(e.target.value);
  //   console.debug("Current year " + currYear);
  // };
  // let formatter = useDateFormatter({ dateStyle: "full" });
  const client = createCompoentClient();
  const store = useUserStore((store) => store);

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
            <Tab title="Conference Content">Conference Content</Tab>
            <Tab title="Admin">Admin</Tab>
            <Tab title="Profile">Profile</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {props.user.dues_paid_at ? (
                <MemberContent videos={props.videos} />
              ) : undefined}
            </TabPanel>

            {props.user?.role === "admin" ? (
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
              <div className="my-5 flex gap-3 mx-auto justify-center">
                <div>
                  <h5 className="text-center">Your Member Info</h5>
                  <Flex>
                    <Avatar src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75" />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {props.user?.fname} {props.user?.lname}
                      </Text>
                      <Text fontSize="sm">
                        {props.user?.role === "admin"
                          ? "MCBIOS Admin"
                          : "MCBIOS Member"}
                      </Text>
                    </Box>
                  </Flex>
                </div>
              </div>
              <Divider />
              <div className="container text-center space-y-4">
                {!props.user.dues_paid_at ? (
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
                            .insert({ user_id: store.id })
                            .then(({ error }) => {
                              if (error) {
                                alert(
                                  "Something went wrong while we submitting your membership request - " +
                                    error.message
                                );
                                console.error(error);
                              } else {
                                alert(
                                  "Thank you for letting us know, we'll confirm your membership status ASAP!"
                                );
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
