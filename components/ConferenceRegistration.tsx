"use client";

import { Field } from "@/components/ui/field";
import { Events, useAnalytics } from "@/lib";
import {
  isRegistrationOpen,
  registrationOptions,
  useRegistrationProducts,
} from "@/lib/registration";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Separator,
  Spinner,
  Stack,
  Steps,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { PaymentHandler, PaymentHandlerType } from "./dashboard/PaymentHandler";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", DATE_FORMAT);

/**
 * Conference registration. Whether it is open, and which levels exist, comes from
 * the Conference Suite: the org's registration window (Settings), subscription
 * and Stripe products. Nothing here is hardcoded per year.
 */
export const ConferenceRegistration = () => {
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const { trackEvent } = useAnalytics();

  const { data, error, isLoading } = useRegistrationProducts();
  const options = useMemo(
    () => registrationOptions(data?.products ?? []),
    [data],
  );
  const open = isRegistrationOpen(data, options);
  const today = new Date().toISOString().slice(0, 10);
  const startDate = data?.registration?.startDate ?? null;
  const endDate = data?.registration?.endDate ?? null;
  const notYetOpen = !!startDate && today < startDate;
  const passed = !!endDate && today > endDate;

  const goToNext = () => setActiveStep((prev) => prev + 1);
  const goToPrevious = () => setActiveStep((prev) => prev - 1);

  const isInvalid =
    email === "" ||
    !(email.includes("@") && email.includes(".")) ||
    fname === "" ||
    lname === "" ||
    institution === "";

  if (isLoading) {
    return (
      <Flex justify="center" py={10}>
        <Spinner />
      </Flex>
    );
  }

  if (error || !open) {
    return (
      <section>
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align="center" my={5} gap={3}>
            <Heading fontSize="4xl" textAlign="center">
              MCBIOS Conference Registration
            </Heading>
            <Separator />
            {passed ? (
              <Text color={{ base: "gray.600", _dark: "gray.300" }}>
                Thank you to everyone who contributed to the conference via
                registrations, poster submissions, volunteering, sponsorships,
                and everything in between. Registration closed on{" "}
                {formatDate(endDate!)}.
              </Text>
            ) : notYetOpen ? (
              <Text color={{ base: "gray.600", _dark: "gray.300" }}>
                Registration opens on {formatDate(startDate!)}. Check back
                then!
              </Text>
            ) : (
              <Text color={{ base: "gray.600", _dark: "gray.300" }}>
                Registration is not open right now. Please check back soon.
              </Text>
            )}
          </Stack>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
        <Stack align="center" my={5} gap={3}>
          <Heading fontSize="4xl" textAlign="center">
            MCBIOS Conference Registration
          </Heading>
          {endDate && <Text>Conference date: {formatDate(endDate)}</Text>}
          <Separator />
          <Text color={{ base: "gray.600", _dark: "gray.300" }}>
            If you haven&apos;t already and plan on attending this year&apos;s
            conference please pay your registration fees. Registration fees
            include access to all scientific sessions, meals, receptions,
            banquet, and 1 year of MCBIOS membership. Membership gives you
            access to past conference recordings, upcoming elections, and more!
          </Text>
        </Stack>

        <Steps.Root step={activeStep} count={3}>
          <Steps.List>
            <Steps.Item index={0} title="Contact Info" />
            <Steps.Item index={1} title="Registration Tier" />
            <Steps.Item index={2} title="Payment" />
          </Steps.List>
        </Steps.Root>

        {activeStep === 0 && (
          <Box rounded="lg" bg={{ base: "white", _dark: "black" }} p={8}>
            <Stack gap={4}>
              <Box
                bg={{ base: "blue.50", _dark: "blue.900" }}
                border="1px solid"
                borderColor={{ base: "blue.200", _dark: "blue.700" }}
                rounded="md"
                p={4}
              >
                <Text
                  fontSize="sm"
                  color={{ base: "blue.800", _dark: "blue.200" }}
                  fontWeight="medium"
                >
                  Important: Please enter the name and email address of the
                  person who will be attending the conference — not the
                  purchaser&apos;s information (if different). We use this
                  information to identify attendees, and registrations with
                  mismatched names or emails may not be found.
                </Text>
              </Box>
              <Stack direction={["column", null, "row"]} justify="space-evenly">
                <Box>
                  <Field label="First Name" required>
                    <Input
                      type="text"
                      inputMode="text"
                      autoComplete="given-name"
                      onChange={(e) => setFname(e.currentTarget.value)}
                      value={fname}
                    />
                  </Field>
                </Box>
                <Box>
                  <Field label="Last Name" required>
                    <Input
                      type="text"
                      inputMode="text"
                      autoComplete="family-name"
                      onChange={(e) => setLname(e.currentTarget.value)}
                      value={lname}
                    />
                  </Field>
                </Box>
              </Stack>
              <Field label="Email address" required>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  value={email}
                />
              </Field>
              <Field label="Institution" required>
                <Input
                  type="text"
                  inputMode="text"
                  onChange={(e) => setInstitution(e.currentTarget.value)}
                  value={institution}
                />
              </Field>
              <Flex justify="space-around" my={5}>
                <Button
                  type="submit"
                  onClick={() => {
                    trackEvent(Events.REGISTRATION.CONTACT_INFO_SUBMITTED, {
                      institution,
                      tier: "unknown",
                    });
                    goToNext();
                  }}
                  colorPalette="green"
                  disabled={isInvalid}
                  className="mx-auto"
                  w="50%"
                >
                  Next
                </Button>
              </Flex>
            </Stack>
          </Box>
        )}

        {activeStep === 1 && (
          <>
            <Flex mx="auto" w={[null, "sm", "lg"]}>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select a registration level"
                  value={tier ?? ""}
                  onChange={(e) => {
                    const selected = (e.currentTarget.value ||
                      undefined) as PaymentHandlerType;
                    setTier(selected);
                    if (selected) {
                      trackEvent(Events.REGISTRATION.TIER_SELECTED, {
                        tier: selected,
                      });
                    }
                  }}
                >
                  {options.map((option) => (
                    <option key={option.role} value={option.role}>
                      {option.price
                        ? `${option.label} | ${option.price}`
                        : option.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
            <Flex justify="center" gap={2} my={5}>
              <Button
                onClick={() => {
                  trackEvent(Events.REGISTRATION.BACK_FROM_TIER, {});
                  goToPrevious();
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  trackEvent(Events.REGISTRATION.TIER_STEP_SUBMITTED, {
                    tier: tier ?? "none",
                  });
                  goToNext();
                }}
                colorPalette="green"
                disabled={tier === undefined}
              >
                Next
              </Button>
            </Flex>
          </>
        )}

        {tier && activeStep === 2 && (
          <>
            <PaymentHandler
              tier={tier}
              email={email}
              fname={fname}
              lname={lname}
              institution={institution}
            />
            <Flex justify="space-around" my={5}>
              <Button
                onClick={() => {
                  trackEvent(Events.REGISTRATION.BACK_FROM_PAYMENT, {
                    tier: tier ?? "none",
                  });
                  goToPrevious();
                  setTier(undefined);
                }}
                className="mx-auto"
                w="50%"
              >
                Back
              </Button>
            </Flex>
          </>
        )}
      </div>
    </section>
  );
};
