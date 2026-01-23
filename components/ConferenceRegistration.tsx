import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useColorModeValue,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { PaymentHandler, PaymentHandlerType } from "./dashboard/PaymentHandler";

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
];
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
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  // email check
  const isInvalid =
    email === "" ||
    !(email.includes("@") && email.includes(".")) ||
    fname === "" ||
    lname === "" ||
    email === "" ||
    institution === "";
  const toast = useToast();

  return (
    <section>
      {registrationPassed ? (
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align={"center"} my={5} gap={3}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              MCBIOS 2026
            </Heading>
            <Text>March 26-29, 2026</Text>
            <Divider />
            <Text color={"gray.600"}>
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
          <Stack align={"center"} my={5} gap={3}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              MCBIOS 2026 Registration
            </Heading>
            <Divider />
            <Text color={"gray.600"}>
              If you haven&apos;t already and plan on attending this year&apos;s
              conference please pay your registration fees. Registration fees
              include access to all scientific sessions, meals, receptions,
              banquet, and 1 year of MCBIOS membership. Membership gives you
              access to past conference recordings, upcomming elections, and
              more!
            </Text>
            {/* <Text>The deadline for registration is March 17th, 2025.</Text> */}
          </Stack>
          <Stepper index={activeStep}>
            <Step>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>Contact Info</StepTitle>
                {/* <StepDescription>{step.description}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>

            {/* Tier Selection Step */}

            <Step>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>Registration Tier</StepTitle>
                {/* <StepDescription>{step.description}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>

            {/* Payment Step */}

            <Step>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>Payment</StepTitle>
                {/* <StepDescription>{step.description}</StepDescription> */}
              </Box>

              <StepSeparator />
            </Step>
          </Stepper>
          {activeStep === 0 && (
            <Box
              rounded={"lg"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "gray.700")}
              p={8}
            >
              {/* Form fields */}
              <Stack spacing={4}>
                <HStack justify="space-evenly">
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        inputMode="text"
                        autoComplete="given-name"
                        onChange={(e) => setFname(e.currentTarget.value)}
                        value={fname}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        inputMode="text"
                        autoComplete="family-name"
                        onChange={(e) => setLname(e.currentTarget.value)}
                        value={lname}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Institution</FormLabel>
                  <Input
                    type="text"
                    inputMode="text"
                    onChange={(e) => setInstitution(e.currentTarget.value)}
                    value={institution}
                  />
                </FormControl>
                <Button
                  type="submit"
                  onClick={goToNext}
                  colorScheme="green"
                  isDisabled={isInvalid}
                >
                  Next
                </Button>
              </Stack>
            </Box>
          )}

          {activeStep === 1 && (
            <>
              <Flex mx="auto" w={[null, "sm", "lg"]}>
                <Select
                  variant="outline"
                  placeholder="Select a membership level"
                  onChange={(e) => {
                    setTier(e.currentTarget.value as PaymentHandlerType);
                  }}
                >
                  {/* <option value="student">
                    Conference and Membership | Early Bird Student | $200
                  </option>
                  <option value="postdoctorial">
                    Conference and Membership | Early Bird Postdoctorial | $300
                  </option>
                  <option value="professional">
                    Conference and Membership | Early Bird Professional | $400
                  </option> */}
                  <option value="student">
                    Conference and Membership | Student | $250
                  </option>
                  <option value="postdoctorial">
                    Conference and Membership | Postdoctorial | $350
                  </option>
                  <option value="professional">
                    Conference and Membership | Professional | $450
                  </option>
                  {/* <option value="member_only_student">
                    Membership | Student | $10
                  </option>
                  <option value="member_only_postdoctorial">
                    Membership | Postdoctorial | $20
                  </option>
                  <option value="member_only_professional">
                    Membership | Professional | $50
                  </option> */}
                </Select>
              </Flex>
              <Flex justify="center">
                <Button onClick={goToPrevious} className="mr-3">
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={goToNext}
                  colorScheme="green"
                  isDisabled={tier === undefined}
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
