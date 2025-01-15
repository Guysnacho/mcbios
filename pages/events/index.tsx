import {
  PaymentHandler,
  PaymentHandlerType,
} from "@/components/dashboard/admin/PaymentHandler";
import CareerDev from "@/public/images/banners/career-development.jpg";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Select,
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
  useSteps,
  VStack,
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
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <TabPanel>
      <section>
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
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
          <VStack>
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
              )}
            </Flex>
            {tier ? (
              <PaymentHandler
                tier={tier}
                // userId={data.user.user_id}
                // email={data.user.email!}
              />
            ) : undefined}
          </VStack>
        </div>
      </section>
    </TabPanel>
  );
};

export default events;
