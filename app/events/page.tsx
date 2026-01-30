import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import CareerDev from "@/public/images/banners/career-development.jpg";
import {
  Box,
  Container,
  Heading,
  Image,
  List,
  Separator,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>MCBIOS Events</title>
        <meta
          name="description"
          content="Upcoming MCBIOS Events | MidSouth Computational Biology and Bioinformatics Society"
        />
      </Head>

      <Container maxW="6xl" py={10}>
        <Stack gap={10}>
          <Heading textAlign="center">Events</Heading>

          <Tabs.Root
            aria-label="Event Types"
            size="lg"
            fitted
            variant="enclosed"
            defaultValue="upcoming"
          >
            <Tabs.List>
              <Tabs.Trigger value="upcoming">Upcoming Events</Tabs.Trigger>
              <Tabs.Trigger value="career">Career Development</Tabs.Trigger>
              <Tabs.Trigger value="working">Working Groups</Tabs.Trigger>
            </Tabs.List>

            {/* Upcoming Events */}
            <Tabs.Content value="upcoming">
              <ConferenceRegistration />
            </Tabs.Content>

            {/* Career Development */}
            <Tabs.Content value="career">
              <Stack spacing={8}>
                <Box>
                  <Image
                    src={CareerDev.src}
                    alt="Career Development Series"
                    className="mx-auto px-5 md:px-10 lg:px-20"
                  />
                </Box>

                <Separator />

                <Text>
                  Career Development Seminars are workshops and presentations
                  free and open to all MCBIOS members, especially for trainees
                  and junior faculty. Topics include professional development,
                  mentoring from academia and industry leaders, grant and
                  manuscript writing, and best practices for building an
                  impactful career in biomedical data sciences. Seminars are
                  offered monthly as virtual sessions, with in-person offerings
                  during the MCBIOS Annual Conference.
                </Text>

                <Separator />

                <Text textAlign="center" fontWeight="medium" color="primary">
                  Check in with us later for updates
                </Text>
              </Stack>
            </Tabs.Content>

            {/* Working Groups */}
            <Tabs.Content value="working">
              <Stack gap={6}>
                <Separator />

                <Text fontSize="lg">
                  MCBIOS encourages the formation of working groups. Groups
                  require:
                </Text>

                <List.Root pl={4} listStyle="disc">
                  <List.Item>At least three members</List.Item>
                  <List.Item>An elected chairman</List.Item>
                  <List.Item>
                    A regular meeting schedule, with a minimum of two meetings
                    per year
                  </List.Item>
                  <List.Item>A purpose for organizing</List.Item>
                </List.Root>

                <Text fontSize="lg">
                  To apply for recognition as an MCBIOS working group, please
                  contact any Board Member or send us a message with the
                  information above, along with a copy of your bylaws if
                  applicable.
                </Text>

                <Separator />

                <Text textAlign="center" fontWeight="medium" color="primary">
                  Check in with us later for updates
                </Text>
              </Stack>
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
      </Container>
    </>
  );
}
