import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { toaster } from "@/components/ui/toaster";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Separator,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PartyPopper } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [currentTag, setTag] = useState(0);

  setTimeout(() => {
    if (router.query.error_description) {
      toaster.create({
        description: router.query.error_description,
        type: "warning",
        duration: 8000,
        closable: true,
      });
    } else if (router.query.token || router.query.code) {
      toaster.create({
        title: "Thank you for your verification",
        description:
          "You are free to continue with your conference registration or any other activities!",
        type: "success",
        duration: 8000,
        closable: true,
      });
    }
  }, 500);

  async function handleUpdate() {
    setTimeout(() => {
      if (currentTag >= Taglines.length) {
        setTag(0);
      } else {
        setTag(currentTag + 1);
      }
    }, 4000);
  }

  useEffect(() => {
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTag]);

  return (
    <div className="my-5 md:my-10 gap-10">
      <Head>
        <title>MCBIOS</title>
        <meta content="MCBIOS | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <HStack justify="center" maxW="100vw" mx="auto" px={9}>
        {/* DNS Strands */}
        <Box w={["xs"]} display={["none", null, null, "unset"]}>
          <Image
            className="mx-auto object-cover"
            src="/images/logo.jpg"
            // src="/images/logo_clippy_clean.png"
            alt="MCBIOS Logo"
            style={{
              maskImage:
                "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          />
        </Box>
        {/* MCBIOS + Join */}
        <Box className="space-y-4">
          <span className="md:hidden">
            <Image
              className="mx-auto object-cover"
              // src="/images/logo_clippy_clean.png"
              src="/images/logo.jpg"
              alt="MCBIOS Logo"
              h={200}
              style={{
                maskImage:
                  "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            />
          </span>{" "}
          <Heading size={["xl", "2xl"]} alignItems="end">
            {" "}
            {/* MCBIOS */}
          </Heading>
          {/* <Heading size={["sm", null, "md"]}>
            Midsouth Computational Biology & Informatics Society
          </Heading> */}
          <Heading size="sm" color="gray.600">
            {Taglines[currentTag || 0]}
          </Heading>
          <Button
            type="button"
            size="md"
            onClick={() => router.push("/membership")}
            colorScheme="pink"
          >
            Become a Member
          </Button>
        </Box>
      </HStack>

      <Separator as="hr" className="my-10 border-gray-500" />
      <Alert
        as="a"
        href="/events"
        _hover={{ shadow: "lg" }}
        borderRadius="xl"
        w={["80%", "fit-content"]}
        mx="auto"
        status="success"
        icon={<PartyPopper />}
      >
        Conference registration is now open!
      </Alert>
      <Separator as="hr" className="my-10 border-gray-500" />

      <section className="space-y-5 px-10 mx-auto md:w-5/6">
        <h3 className="text-center">Greetings from the MCBIOS President</h3>
        <div className="md:flex my-5 gap-5 space-y-10 mx-auto">
          <Card.Root
            shadow="md"
            w={{ base: "fit-content", md: "sm", xl: "lg" }}
          >
            <Card.Header>
              <Image
                src="/images/leadership/Aik-Choon-Tan.jpg"
                fallbackSrc="/images/leadership/Aik-Choon-Tan.jpg"
                alt="Aik Choon Tan, MCBIOS President"
                className="mx-auto"
              />
            </Card.Header>
            <Separator w="80%" mx="auto" />
            <Card.Footer>
              <Stack separator={<Separator />}>
                <Text className="text-md" fontWeight={600}>
                  Aik Choon Tan, Ph.D.
                </Text>
                <Text>
                  President, Mid-South Computational Biology & Bioinformatics
                  Society
                </Text>
                <Text>Professor | Senior Director of Data Science</Text>
                <Text>
                  Departments of Oncological Sciences and Biomedical Informatics
                </Text>
                <Text>University of Utah</Text>
              </Stack>
            </Card.Footer>
          </Card.Root>
          <AccordionRoot defaultValue={["intro"]} multiple w="70vw" mx="auto">
            <AccordionItem
              aria-label="Introduction and Gratitude"
              value="intro"
            >
              <AccordionItemTrigger>
                <h5>
                  <Span flex="1">Introduction and Gratitude</Span>
                </h5>
              </AccordionItemTrigger>
              <AccordionItemContent pb={4}>
                I am deeply honored and profoundly grateful to serve as the 20th
                President of the MidSouth Computational Biology and
                Bioinformatics Society (MCBIOS). This opportunity to lead our
                esteemed society is a testament to the trust and confidence you
                have placed in me. I extend my heartfelt thanks to the board of
                directors and past presidents for their unwavering support and
                guidance. This moment is not just a personal milestone but a
                reflection of our shared vision for the future of MCBIOS.
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem
              value="growth"
              aria-label="Embracing Growth and Diversity"
            >
              <AccordionItemTrigger>
                <h5>
                  <Span flex="1">Embracing Growth and Diversity</Span>
                </h5>
              </AccordionItemTrigger>
              <AccordionItemContent pb={4}>
                Our society is on an exhilarating journey of growth, with an
                expanding membership that brings a wealth of diverse
                perspectives and expertise. I am committed to nurturing this
                growth, reaching beyond the Mid-South to embrace members from
                all regions. Together, we are paving the way for greater
                collaboration and groundbreaking innovation in our field.
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem
              value="support"
              aria-label="Supporting Education and Mentorship"
            >
              <AccordionItemTrigger>
                <h5>
                  <Span flex="1">Supporting Education and Mentorship</Span>
                </h5>
              </AccordionItemTrigger>

              <AccordionItemContent pb={4}>
                At the core of our mission is the education and training of the
                next generation of bioinformaticians. I am passionate about
                enhancing our educational and mentoring initiatives, ensuring
                that every member has access to the resources and opportunities
                they need to excel. I urge our experienced members to step
                forward as mentors, guiding our trainees and serving as the role
                models they need to achieve their full potential.
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem
              value="announcements"
              aria-label="Announcing the 21st Annual Conference"
            >
              <AccordionItemTrigger>
                <h5>
                  <Span flex="1">Announcing the 21st Annual Conference</Span>
                </h5>
              </AccordionItemTrigger>

              <AccordionItemContent pb={4}>
                I am also thrilled to announce our upcoming 21st Annual
                Conference of MCBIOS, to be held from March 27-29, 2025, at the
                University of Utah in Salt Lake City. This conference marks a
                significant milestone as we expand our annual meeting to the
                Mountain West. Our conference remains the cornerstone of
                knowledge exchange and networking, and I encourage each of you
                to participate actively. Your contributions are the lifeblood of
                our society, making it vibrant and impactful.
              </AccordionItemContent>
            </AccordionItem>
            <AccordionItem value="vision" aria-label="A Vision for the Future">
              <AccordionItemTrigger>
                <h5>
                  <Span flex="1">A Vision for the Future</Span>
                </h5>
              </AccordionItemTrigger>
              <AccordionItemContent pb={4}>
                In closing, I want to express my deepest gratitude for your
                trust and support. Together, we will advance the frontiers of
                bioinformatics and make this journey remarkable. Let us unite in
                our shared mission and make a lasting impact on our field.
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </section>

      <Separator as="hr" className="my-10 border-gray-500" />

      {/* <ElectionHero />

      <Separator as="hr" className="my-10 border-gray-500" /> */}

      <div className="w-4/5 md:w-2/3 mx-auto">
        <h3 className="text-center">Objectives</h3>
        <ul className="list-disc space-y-1 list-inside">
          <li>
            Advance the understanding of bioinformatics and computational
            biology
          </li>
          <li>
            Bring together scientists of various backgrounds and disciplines
          </li>
          <li>
            Facilitate the collaboration of researchers with similar or
            complementary backgrounds to solve biological, health and/or medical
            problems
          </li>
          <li>Promote education in bioinformatics and computational biology</li>
          <li>
            Inform the general public on the results and implications of current
            research in bioinformatics and computational biology
          </li>
          <li>
            Promote other activities that will contribute to the development of
            bioinformatics and computational biology MCBIOS Bylaws Current
            version (Amended Feb 20, 2010)
          </li>
        </ul>
      </div>

      <Separator as="hr" className="my-10 border-gray-500" />

      <div className="columns-1 lg:columns-2 w-5/6 mx-auto">
        <div className="w-full items-center">
          <h4 className="text-center">Membership</h4>
          <p className="my-5">
            Membership in MCBIOS includes meeting registration for the annual
            Conference and access to workshops and collaborative projects hosted
            by MCBIOS through the year. Students receive a discount for
            membership and are eligible for student awards. MCBIOS encourages
            involvement at both the regional and state level.
          </p>
          {/* <div className="w-full flex justify-center">
            <Button
              size="md"
              onClick={() => router.push("/membership")}
              colorScheme="purple"
            >
              Registration
            </Button>
          </div> */}
        </div>
        <div className="w-full mb-11">
          <h4 className="text-center">Local Chapters</h4>
          <ul className="list-disc space-y-1 w-5/6 mx-auto list-inside">
            <li>
              MCBIOS encourages the formation of local chapters. Chapters
              require:
            </li>
            <li>At least three members </li>
            <li>An elected chairman </li>
            <li>
              A regular meeting schedule, with a minimum of two meetings per
              year
            </li>
            <li>A purpose for organizing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const Taglines = [
  "Connecting minds in computational biology.",
  "Advancing bioinformatics through collaboration and discovery.",
  "Fostering research, growth, and community in computational biology.",
  "Where science, data, and collaboration meet.",
  "Empowering scientists, advancing health.",
];
