import {
  PaymentHandler,
  PaymentHandlerType,
} from "@/components/dashboard/admin/PaymentHandler";
import CareerDev from "@/public/images/banners/career-development.jpg";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

const events = () => {
  return (
    <div className="container space-y-10 mx-auto">
      <Head>
        <title>MCBIOS Events</title>
        <meta content="Upcomming MCBIOS Events | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <h3 className="text-center my-10">Events</h3>
      <Tabs aria-label="Event Types" size="lg" isFitted variant="enclosed">
        <TabList>
          <Tab title="Upcoming Events">Upcoming Events</Tab>
          <Tab title="Career Development">Career Development</Tab>
          <Tab title="Working Groups">Working Groups</Tab>
        </TabList>
        <TabPanels>
          <ConferenceRegistration />
          <TabPanel>
            <Image
              src={CareerDev.src}
              alt="Career Development Series"
              className="mx-auto px-5 md:px-10 lg:px-20"
            />
            <Divider className="w-1/2 mx-auto mb-10" />
            <section>
              <div className="w-11/12 mx-auto gap-8 items-center space-y-6 md:space-y-5">
                <Divider className="w-1/2 mx-auto mb-10" />
                <p className="justify-center">
                  Career Development Seminars are workshops and presentations
                  free and open to all MCBIOS members, especially for trainees
                  and junior faculty on professional development, mentoring from
                  academia and industry leaders, grant and manuscript writing,
                  best practices and resources pertaining to build an impactful
                  career in biomedical data sciences. Seminars are offered
                  monthly as virtual seminar and an in-person session during the
                  MCBIOS Annual Conference.
                </p>
                <Divider className="w-1/2 mx-auto mb-10" />
                <h5 className="text-center text-primary">
                  Check in with us later for updates
                </h5>
              </div>
            </section>
          </TabPanel>
          <TabPanel>
            <Divider className="w-1/2 mx-auto mb-10" />
            <section>
              <div className="w-11/12 mx-auto gap-8 items-center space-y-6 md:space-y-5">
                <p className="text-lg">
                  MCBIOS encourages the formation of working groups. Groups
                  require:
                </p>

                <ul className="list-disc list-inside">
                  <li>At least three members</li>
                  <li>An elected chairman</li>
                  <li>
                    A regular meeting schedule, with a minimum of two meetings
                    per year
                  </li>
                  <li>A purpose for organizing</li>
                </ul>
                <p className="text-lg">
                  To apply for recognition as a MCBIOS working group, please
                  contact any Board Member or send us a message and provide the
                  information above, along with a copy of your bylaws, if
                  applicable.
                </p>
                <Divider className="w-1/2 mx-auto mb-10" />
                <h5 className="text-center text-primary">
                  Check in with us later for updates
                </h5>
              </div>
            </section>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
];
const ConferenceRegistration = () => {
  const [tier, setTier] = useState<PaymentHandlerType>();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
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
    !email ||
    !fname ||
    !lname;
  const toast = useToast();

  return (
    <TabPanel>
      <section>
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <Stack align={"center"} my={5} gap={3}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              MCBIOS 2025 Registration
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
            <Flex mx="auto" w={[null, "sm", "lg"]}>
              <Select
                variant="outline"
                placeholder="Select a membership level"
                onChange={(e) => {
                  setTier(e.currentTarget.value as PaymentHandlerType);
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
          )}
          {activeStep === 1 && (
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
          )}

          {tier && activeStep === 2 ? (
            <PaymentHandler
              tier={tier}
              email={email}
              fname={fname}
              lname={lname}
            />
          ) : undefined}
          {activeStep === 2 && (
            <Flex>
              <Button onClick={goToPrevious} className="mx-auto" w="70%">
                Back
              </Button>
            </Flex>
          )}
        </div>
      </section>
    </TabPanel>
  );
};

export default events;
