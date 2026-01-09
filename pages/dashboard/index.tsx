import { AdminPanel } from "@/components/dashboard/admin/AdminPanel";
import { MemberContent } from "@/components/dashboard/admin/MemberContent";
import {
  PaymentHandler,
  PaymentHandlerType,
} from "@/components/dashboard/PaymentHandler";
import { User } from "@/components/User";
import { authFetcher, DUPLICATE_ROW } from "@/lib";
import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { createClient as createCompoentClient } from "@/lib/supabase/component";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Select,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

export default function Dashboard() {
  const client = createCompoentClient();
  const store = useStore(useUserStore, (store) => store);
  const toast = useToast();
  const [tier, setTier] = useState<PaymentHandlerType>();

  const { data, error } = useSWR("/auth/user", () => authFetcher(client), {
    onSuccess(data) {
      store?.setId(data.user!.user_id);
      store?.setRole(data.user!.role);
    },
  });

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
        {error && (
          <div className="my-5 flex gap-3 mx-auto justify-center">
            <div>
              <h5 className="text-center">We ran into an issue</h5>
              <p>
                There was an error fetching your account information. If an
                issue persists, please reach out to{" "}
                <a
                  className="underline text-blue-800"
                  href="mailto:team@tunjiproductions.com"
                >
                  team@tunjiproductions.com
                </a>
                .
              </p>
            </div>
          </div>
        )}
        <Tabs
          aria-label="Dashboard Tabs"
          size="lg"
          isFitted
          variant="line"
          colorScheme="blue"
          display={error ? "none" : undefined}
        >
          <TabList>
            {data?.user && data.user.role === "admin" ? (
              <Tab title="Admin">Admin</Tab>
            ) : undefined}
            {data?.user && data?.user.fees_paid_at && (
              <Tab title="Conference Content">Conference Content</Tab>
            )}
            <Tab title="Profile">Profile</Tab>
          </TabList>
          <TabPanels>
            {data?.user && data?.user.role === "admin" ? (
              <AdminPanel client={client} />
            ) : undefined}

            {data?.user && data?.user.fees_paid_at && (
              <TabPanel>
                <MemberContent videos={data?.videos} />
              </TabPanel>
            )}

            <TabPanel>
              <div className="my-5 flex gap-3 mx-auto justify-center">
                <div>
                  <h5 className="text-center">Membership Info</h5>
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
                  (!data?.user?.fees_paid_at && (
                    <>
                      <h4>Welcome to MCBIOS Registration!</h4>

                      {/* Registration Tiers */}
                      <TableContainer
                        overflowX="auto"
                        w={["90%", "sm", "lg", "2xl"]}
                        mx="auto"
                      >
                        <Table variant="striped" colorScheme="green">
                          <TableCaption>Registration Pricing</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Membership Level</Th>
                              <Th>
                                Early Bird
                                <br />
                                (Until Jan. 15th, 2026)
                              </Th>
                              <Th>Standard</Th>
                              {/* <Th>Membership Only</Th> */}
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>Student</Td>
                              <Td>$200</Td>
                              <Td>$250</Td>
                              {/* <Td>$10</Td> */}
                            </Tr>
                            <Tr>
                              <Td>Postdoctorial</Td>
                              <Td>$300</Td>
                              <Td>$350</Td>
                              {/* <Td>$20</Td> */}
                            </Tr>
                            <Tr>
                              <Td>Professional</Td>
                              <Td>$400</Td>
                              <Td>$450</Td>
                              {/* <Td>$50</Td> */}
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>

                      <p>
                        If you haven&apos;t already, please pay your
                        registration fees to finish MCBIOS onboarding.
                        Registration fees include access to all scientific
                        sessions, meals, receptions, banquet, and 1 year of
                        MCBIOS membership. Membership gives you access to past
                        conference recordings, upcomming elections, and more!
                      </p>
                      <div className="container">
                        <p>
                          <span className="underline">
                            If you have paid the required fees
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
                          My fees are paid
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
                              Conference and Membership | Early Bird Student |
                              $200
                            </option>
                            <option value="postdoctorial">
                              Conference and Membership | Early Bird
                              Postdoctorial | $300
                            </option>
                            <option value="professional">
                              Conference and Membership | Early Bird
                              Professional | $400
                            </option>
                            {/* <option value="student">
                              Conference and Membership | Student | $250
                            </option>
                            <option value="postdoctorial">
                              Conference and Membership | Postdoctorial | $350
                            </option>
                            <option value="professional">
                              Conference and Membership | Professional | $450
                            </option>
                            <option value="member_only_student">
                              Membership | Student | $10
                            </option>
                            <option value="member_only_postdoctorial">
                              Membership | Postdoctorial | $20
                            </option>
                            <option value="member_only_professional">
                              Membership | Professional | $50
                            </option> */}
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
