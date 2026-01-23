"use client";

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
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";
import {
  Button,
  Flex,
  NativeSelect,
  Separator,
  Table,
  Tabs,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

export default function Dashboard() {
  const client = createClient();
  const store = useStore(useUserStore, (store) => store);
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
        <Tabs.Root
          aria-label="Dashboard Tabs"
          size="lg"
          fitted
          variant="line"
          colorPalette="blue"
          display={error ? "none" : undefined}
          defaultValue={data?.user && data.user.role === "admin" ? "admin" : "profile"}
        >
          <Tabs.List>
            {data?.user && data.user.role === "admin" && (
              <Tabs.Trigger value="admin">Admin</Tabs.Trigger>
            )}
            {data?.user && data?.user.fees_paid_at && (
              <Tabs.Trigger value="content">Conference Content</Tabs.Trigger>
            )}
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          </Tabs.List>

          {data?.user && data?.user.role === "admin" && (
            <Tabs.Content value="admin">
              <AdminPanel client={client} />
            </Tabs.Content>
          )}

          {data?.user && data?.user.fees_paid_at && (
            <Tabs.Content value="content">
              <MemberContent videos={data?.videos} />
            </Tabs.Content>
          )}

          <Tabs.Content value="profile">
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
            <Separator />
            <div className="container text-center space-y-4">
              {!data?.user ||
                (!data?.user?.fees_paid_at && (
                  <>
                    <h4>Welcome to MCBIOS Registration!</h4>

                    {/* Registration Tiers */}
                    <Table.ScrollArea
                      overflowX="auto"
                      w={["90%", "sm", "lg", "2xl"]}
                      mx="auto"
                    >
                      <Table.Root striped colorPalette="green">
                        <Table.Caption>Registration Pricing</Table.Caption>
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Membership Level</Table.ColumnHeader>
                            <Table.ColumnHeader>
                              Early Bird
                              <br />
                              (Until Jan. 15th, 2026)
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>Standard</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>Student</Table.Cell>
                            <Table.Cell>$200</Table.Cell>
                            <Table.Cell>$250</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Postdoctorial</Table.Cell>
                            <Table.Cell>$300</Table.Cell>
                            <Table.Cell>$350</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Professional</Table.Cell>
                            <Table.Cell>$400</Table.Cell>
                            <Table.Cell>$450</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table.Root>
                    </Table.ScrollArea>

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
                        colorPalette="green"
                        className="my-5"
                        onClick={() => {
                          client
                            .from("confirm_request")
                            .insert({ user_id: store?.id })
                            .then(({ error }) => {
                              if (error) {
                                if (error?.code === DUPLICATE_ROW) {
                                  toaster.error({
                                    description:
                                      "Gotcha, we'll update your access as soon as we confirm.",
                                    duration: 6000,
                                  });
                                } else {
                                  toaster.error({
                                    description:
                                      "Something went wrong while we submitting your membership request - " +
                                      error.message,
                                    duration: 6000,
                                  });
                                  console.error(error);
                                }
                              } else {
                                toaster.success({
                                  description:
                                    "Thank you for letting us know, we'll confirm your membership status ASAP!",
                                  duration: 6000,
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
                          onClick={() => setTier(undefined)}
                        >
                          <ChevronLeft />
                          Select a different tier
                        </Button>
                      ) : (
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            placeholder="Select a membership level"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
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
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
