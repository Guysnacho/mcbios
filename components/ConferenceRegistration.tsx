"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Separator,
  Stack,
  Steps,
  Text,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { PaymentHandler, PaymentHandlerType } from "./dashboard/PaymentHandler";

export const ConferenceRegistration = ({
  registrationPassed,
}: {
  registrationPassed?: boolean;
}) => {
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [institution, setInstitution] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const goToNext = () => setActiveStep((prev) => prev + 1);
  const goToPrevious = () => setActiveStep((prev) => prev - 1);

  // email check
  const isInvalid =
    email === "" ||
    !(email.includes("@") && email.includes(".")) ||
    fname === "" ||
    lname === "" ||
    institution === "";

  return (
    <section>
      {registrationPassed ? (
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align="center" my={5} gap={3}>
            <Heading fontSize="4xl" textAlign="center">
              MCBIOS 2026
            </Heading>
            <Text>March 26-29, 2026</Text>
            <Separator />
            <Text color="gray.600">
              We want to thank everyone whose contributed to the conference via
              registrations, poster submissions, volunteering, sponsorships, and
              everything in between. As a reminder, registration fees include
              access to all scientific sessions, meals, receptions, banquet, and
              1 year of MCBIOS membership. Membership gives you access to past
              conference recordings, upcomming elections, and more!
            </Text>
            <Text>The deadline for registration was March 17th, 2025.</Text>
          </Stack>
        </div>
      ) : (
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align="center" my={5} gap={3}>
            <Heading fontSize="4xl" textAlign="center">
              MCBIOS 2026 Registration
            </Heading>
            <Separator />
            <Text color="gray.600">
              If you haven&apos;t already and plan on attending this year&apos;s
              conference please pay your registration fees. Registration fees
              include access to all scientific sessions, meals, receptions,
              banquet, and 1 year of MCBIOS membership. Membership gives you
              access to past conference recordings, upcomming elections, and
              more!
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
            <Box rounded="lg" bg="white" p={8}>
              {/* Form fields */}
              <Stack gap={4}>
                <HStack justify="space-evenly">
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
                    <Field label="Last Name">
                      <Input
                        type="text"
                        inputMode="text"
                        autoComplete="family-name"
                        onChange={(e) => setLname(e.currentTarget.value)}
                        value={lname}
                      />
                    </Field>
                  </Box>
                </HStack>
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
                <Button
                  type="submit"
                  onClick={goToNext}
                  colorPalette="green"
                  disabled={isInvalid}
                >
                  Next
                </Button>
              </Stack>
            </Box>
          )}

          {activeStep === 1 && (
            <>
              <Flex mx="auto" w={[null, "sm", "lg"]}>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="Select a membership level"
                    onChange={(e) => {
                      setTier(e.currentTarget.value as PaymentHandlerType);
                    }}
                  >
                    <option value="student">
                      Conference and Membership | Early Bird Student | $200
                    </option>
                    <option value="postdoctorial">
                      Conference and Membership | Early Bird Postdoctorial | $300
                    </option>
                    <option value="professional">
                      Conference and Membership | Early Bird Professional | $400
                    </option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Flex>
              <Flex justify="center">
                <Button onClick={goToPrevious} className="mr-3">
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={goToNext}
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
                tier={tier!}
                email={email!}
                fname={fname!}
                lname={lname!}
                institution={institution!}
              />
              <Flex>
                <Button
                  onClick={() => {
                    goToPrevious();
                    setTier(undefined);
                  }}
                  className="mx-auto"
                  w="70%"
                >
                  Back
                </Button>
              </Flex>
            </>
          )}
        </div>
      )}
    </section>
  );
};
