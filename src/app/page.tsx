"use client";

import ImageCard from "@/components/ImageCard";
import { KeyDate } from "@/components/KeyDates";
import KeynoteSpeakers from "@/components/KeynoteSpeakers";
import ScientificSessions from "@/components/ScientificSessions";
import TutorialSpeakers from "@/components/TutorialSpeakers";
import { Link } from "@chakra-ui/next-js";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  LinkOverlay,
  ListItem,
  OrderedList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import localFont from "next/font/local";
import NextLink from "next/link";
import { PiFlagBanner, PiFlagCheckeredFill } from "react-icons/pi";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sponsorList = [
  {
    url: "https://healthcare.utah.edu/huntsmancancerinstitute",
    src: "/sponsor/Huntsman.png",
  },
  {
    url: "https://medicine.utah.edu/population-health-sciences/divisions/biostatistics",
    src: "/sponsor/DivOfBio.png",
  },
  {
    url: "https://uofuhealth.utah.edu/delphi-data-science-initiative",
    src: "/sponsor/DELPHI.png",
  },
  {
    url: "https://healthcare.utah.edu",
    src: "/sponsor/UHHealth.png",
  },
  { url: "https://www.utah.edu", src: "/sponsor/UHLogo.png" },
  {
    url: "https://www.byu.edu",
    src: "/sponsor/Brigham.png",
  },
  {
    url: "https://www.frontiersin.org",
    src: "/sponsor/Frontiers.png",
  },
];

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Hero Section */}
        <Flex
          id="sunm"
          flexFlow="column"
          w={"full"}
          backgroundImage={"/campus_bg.jpg"}
          backgroundSize={"cover"}
          backgroundPosition={"top center"}
        >
          <VStack
            py="16"
            h="full"
            justifyContent="center"
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack
              maxW={["90%", "80%", "md", "xl"]}
              spacing={4}
              textAlign="center"
              borderRadius={10}
              py={6}
              bgColor={"blackAlpha.500"}
              justifySelf="center"
              mx="auto"
            >
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                textUnderlineOffset={4}
                textDecorationLine="underline"
                fontSize={["3xl", null, null, "4xl"]}
              >
                MCBIOS 2025
              </Text>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={["2xl", "3xl", null, "4xl"]}
              >
                Data-Driven Discovery: Harnessing the power of AI to transform
                health
              </Text>
              <Text
                mx="auto"
                w="90%"
                color={"white"}
                fontWeight={400}
                fontSize="lg"
              >
                The 21st Annual Meeting of the MidSouth Computational Biology
                and Bioinformatics Society
              </Text>
              <Divider />
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                University of Utah
              </Text>
              <Text
                mx="auto"
                color={"white"}
                fontWeight={700}
                fontSize="lg"
                className={geistMono.className}
              >
                March 27-29, 2025
              </Text>
              <Stack direction={["column", "row"]} mx="auto">
                <Button
                  as={NextLink}
                  href="/registration"
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Registration
                </Button>
                <Button
                  as={NextLink}
                  href="/program"
                  borderColor={"blue.300"}
                  rounded={"full"}
                  variant="outline"
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Conference Program
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>

        {/* Important Dates (sticky on mobile) */}
        {/* <KeyDates /> */}
        <Box className="mx-auto">
          <KeyDate
            icon={
              <Icon
                as={PiFlagCheckeredFill}
                w={[5, null, 10]}
                h={[5, null, 10]}
              />
            }
            title={"Registration Deadline"}
            deadline="March 17th, 2025"
            stack={{
              mt: "5",
              mb: "12",
              mx: "auto",
              width: [null, "sm", null, "lg"],
              direction: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderColor: "gold",
              borderRadius: "xl",
              shadow: "xl",
              _hover: {
                shadow: "2xl",
                borderColor: "goldenrod",
                borderWidth: "xl",
              },
            }}
          />
        </Box>
        <Divider />
        <ImageCard
          mx="auto"
          w={["85%", "75%", "45%", "lg"]}
          src="/home/MCBIOS2025_POSTER.jpg"
          title="Conference Poster"
        />
        <Divider />
        {/* Accomodation blurb */}
        <Stack
          gap={3}
          className="container mx-auto w-9/12 md:w-11/12 self-center place-content-center my-10 shadow-lg shadow-indigo-500/40 rounded-xl py-6"
        >
          <Heading size="lg" color="blue.700" textAlign="center">
            Conference Day Logistics
          </Heading>
          <p className="text-center mx-auto w-4/5 md:w-3/5">
            The conference will take place at the{" "}
            <a
              href="https://ecclesalumnihouse.utah.edu/"
              target="_blank"
              className="underline text-secondary-300"
            >
              Cleone Peterson Eccles Alumni House
            </a>
            . Directions, maps, and parking information can be found{" "}
            <a
              href="https://ecclesalumnihouse.utah.edu/directions-parking/"
              target="_blank"
              className="underline text-secondary-300"
            >
              here
            </a>
            . Parking is free on Saturday. We encourage you to take ride share
            to the conference
            {/* <a href="/accommodations" className="underline text-secondary-300">
              {" "}accommodations page
            </a> */}
            !
          </p>

          <Divider />

          <HStack w={["97%", "93%"]} mx="auto">
            <Text textAlign="center" w={["auto", "auto", "70%"]} mx="auto">
              Scan or click the QR Code to begin pinned navigation to
              <span className="font-bold">
                {" "}
                The University of Utah Alumni House{" "}
              </span>
              via Google Maps.
            </Text>
            <Box>
              <Link
                href="https://maps.app.goo.gl/VLZKu9Gkc4VTdXeV6"
                target="_blank"
              >
                <Image
                  src="/home/alumni_qr.png"
                  alt="Direction QR code"
                  m="auto"
                  w={[400, 180]}
                />
              </Link>
            </Box>
          </HStack>
          <ImageCard
            src="/home/directions.png"
            about="Direction QR code"
            blurb="Directions to the University of Utah Alumni House"
            isFull
          />

          {/* Routes */}

          <Accordion defaultIndex={3}>
            <AccordionItem>
              <h2>
                <AccordionButton color="green" gap={1}>
                  <span>
                    <PiFlagBanner />
                  </span>
                  <Box as="span" flex="1" textAlign="left">
                    Guest House Route
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>
                    Turn left onto Fort Douglas Blvd. and continue north to turn
                    left onto S 1900
                  </ListItem>
                  <ListItem>
                    Turn right onto S Wasatch Dr. at the intersection
                  </ListItem>
                  <ListItem>
                    Continue north along S Wasatch Dr., through the 2nd exit of
                    the traffic circle, to turn left onto Exploration Way
                  </ListItem>
                  <ListItem>
                    Continue west along Exploration Way to turn left onto S
                    Central Campus Dr.
                  </ListItem>
                  <ListItem>
                    Continue south along S Central Campus Dr. to Alumni House on
                    the left in .18 miles
                  </ListItem>
                  <ListItem>
                    For parking, continue to the visitor parking lot
                  </ListItem>
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton color="yellow.500" gap={1}>
                  <span>
                    <PiFlagBanner />
                  </span>
                  <Box as="span" flex="1" textAlign="left">
                    Foothill Route
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>
                    Travel north on Foothill Dr. to turn right onto Mario
                    Capecchi Dr.
                  </ListItem>
                  <ListItem>
                    Continue northeast along Mario Capecchi Dr. to turn left
                    onto S Wasatch Dr.
                  </ListItem>
                  <ListItem>
                    Continue north along S Wasatch Dr., through the 2nd exit of
                    the traffic circle, to turn left onto Exploration Way
                  </ListItem>
                  <ListItem>
                    Continue west along Exploration Way to turn left onto S
                    Central Campus Dr.
                  </ListItem>
                  <ListItem>
                    Continue south along S Central Campus Dr. to Alumni House on
                    the left in .18 miles
                  </ListItem>
                  <ListItem>
                    For parking, continue to the visitor parking lot
                  </ListItem>
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton color="blue.600" gap={1}>
                  <span>
                    <PiFlagBanner />
                  </span>
                  <Box as="span" flex="1" textAlign="left">
                    Guest House Route
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <OrderedList>
                  <ListItem>
                    Travel east along 400 S./University Blvd. to turn left onto
                    700 E.
                  </ListItem>
                  <ListItem>
                    Continue north along 700 E. to turn right onto 100 S.
                  </ListItem>
                  <ListItem>
                    Continue east along 100 S. (which becomes N Campus Dr.) to
                    turn right onto S Central Campus Dr.
                  </ListItem>
                  <ListItem>
                    Continue south along S Central Campus Dr. to the Alumni
                    House on the left in 1.2 miles
                  </ListItem>
                  <ListItem>
                    For parking, continue to the visitor parking lot
                  </ListItem>
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton gap={1}>
                  <span>
                    <PiFlagBanner />
                  </span>
                  <Box as="span" flex="1" textAlign="left">
                    <span className="underline">Alumni House Parking</span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  Visitor parking is available across the street from the Alumni
                  House and costs $2.00/hr. Monday - Friday. Parking is free on
                  Saturday.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
        <VStack w="full" align="center" gap={0}>
          {/* Keynote Speakers */}
          <KeynoteSpeakers />

          {/* Invited Speakers */}
          <TutorialSpeakers />
          <ScientificSessions />
          {/* <HStack as="marquee" justifyItems="space-evenly" my="3">
            <Heading
              size="lg"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              More invited speakers will be announced soon
            </Heading>
          </HStack> */}
        </VStack>
        <Heading
          size={["lg", null, "xl", "2xl"]}
          color="blue.700"
          textAlign="center"
          my="4"
          mx="auto"
        >
          Sponsors
        </Heading>
        <Stack
          w="full"
          my={10}
          gap={3}
          direction={["column", null, "row"]}
          flexWrap="wrap"
        >
          {sponsorList.map(({ src, url }, idx) => (
            <SponsorCard key={idx} src={src} url={url} />
          ))}
        </Stack>
      </main>
    </div>
  );
}

const SponsorCard = ({ url, src }: { src: string; url: string }) => {
  return (
    <Card
      m="auto"
      variant="elevated"
      borderColor="blue.400"
      borderWidth={1}
      backgroundColor="rgba(255, 255, 255, 0%)"
      mb={5}
      shadow="sm"
      _hover={{ shadow: "lg" }}
      w={["80%", "xs", "sm", "md", "lg"]}
    >
      <CardBody>
        <LinkOverlay href={url} target="_blank">
          <Image
            src={src}
            m="auto"
            alt="Sponsorship Logo"
            objectPosition="center"
            objectFit="contain"
            h={["7rem"]}
            htmlHeight={200}
          />
        </LinkOverlay>
      </CardBody>
    </Card>
  );
};
