import {
  Button,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  Cone,
  Globe,
  Handshake,
  Library,
  Medal,
  MicVocal,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Confirm = () => {
  const params = useSearchParams();
  const isValid = params?.has("token"); // Only Token is present for signups
  return (
    <>
      <Head>
        <title>SIgnup Confirmation</title>
        <meta content="MCBIOS Membership Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      <div className="container space-y-10 mx-auto">
        <div className="h-1/2 w-1/2 mx-auto">
          <Image
            src="/images/ConferenceRoom.avif"
            alt="Wood Conference Room, Photo by Aditya Sethia on Unsplash"
            className="mx-auto object-contain"
            width={800}
            height={700}
          />
        </div>
        {isValid ? (
          <section>
            <h3 className="text-center my-10">Thank you for joining MCBIOS</h3>
            <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
              <VStack gap={3}>
                <Heading size="md">
                  We appreciate your contribution and time!
                </Heading>
                <Text>We aim to return that value to you in the form of -</Text>
                <UnorderedList spacing={3}>
                  {perks.map((item, idx) => (
                    <ListItem key={idx} display="flex">
                      <item.icon size={25} strokeWidth={1} />
                      <div>
                        <Heading size="md">{item.heading}</Heading>
                        <Text>{item.blurb}</Text>
                      </div>
                    </ListItem>
                  ))}
                </UnorderedList>
              </VStack>
            </div>
          </section>
        ) : (
          <section>
            <h3 className="text-center my-10">Whoops, something went wrong!</h3>
            <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
              <VStack gap={3}>
                <Heading size="md">
                  If you were in the middle of a registration, please try again
                  later or reach out to us
                </Heading>
                <Text>
                  If you got here by accident no worries, you can return to our
                  home page at any time!
                </Text>
              </VStack>
            </div>
          </section>
        )}
        <section className="text-center space-y-3">
          <Button
            aria-label="return-home"
            type="button"
            leftIcon={<ChevronLeft />}
            colorScheme="purple"
          >
            Home
          </Button>
        </section>
      </div>
    </>
  );
};

export default Confirm;

const perks = [
  {
    icon: Globe,
    heading: "Global Research Network",
    blurb:
      "Connect with leading scientists, data analysts, and bioinformatics innovators from over 60 countries. Collaborate, exchange ideas, and build partnerships that move science forward.",
  },
  {
    icon: MicVocal,
    heading: " Priority Speaker Consideration",
    blurb:
      "Get early consideration for speaker slots at panels, lightning talks, and workshops across our events.",
  },
  {
    icon: Cone,
    heading: "Research Spotlight",
    blurb:
      "your publications, lab breakthroughs, or datasets in our monthly “Member Highlights” newsletter sent to thousands of professionals worldwide.",
  },
  {
    icon: Library,
    heading: "On-Demand Learning Hub",
    blurb:
      "Unlock a growing library of conference recordings, technical tutorials, and expert interviews—available anytime.",
  },
  {
    icon: Handshake,
    heading: "Mentorship & Collaboration Programs",
    blurb:
      "Join structured mentorship circles pairing early-career researchers with senior scientists and industry experts.",
  },
  {
    icon: Medal,
    heading: "Annual Awards & Recognition",
    blurb:
      "Be eligible for member-only awards celebrating innovation, leadership, and outstanding scientific contributions.",
  },
];
