import ElectionHero from "@/components/home/ElectionHero";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="my-10 gap-10">
      <Head>
        <title>MCBIOS</title>
        <meta content="MCBIOS | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <section className="flex flex-col w-5/6 lg:w-1/2 space-y-8 px-10 items-center mx-auto">
        <Image
          className="mx-auto object-cover"
          src="/images/logo.jpg"
          fallbackSrc="/images/logo.jpg"
          alt="MCBIOS Logo"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <Button
          type="button"
          size="md"
          onClick={() => router.push("/membership")}
          colorScheme="pink"
        >
          Become a Member
        </Button>
      </section>

      <Divider as="hr" className="my-10 border-gray-500" />

      <section className="space-y-5 px-10 mx-auto md:w-5/6">
        <h3 className="underline underline-offset-4 text-center">
          Greeting from the MCBIOS President:
        </h3>
        <div className="md:flex my-5 gap-5 mx-auto">
          <div className="20vw">
            <Card shadow="md">
              <CardHeader>
                <Image
                  src="/images/leadership/Qin-Steve.jpg"
                  fallbackSrc="/images/leadership/Qin-Steve.jpg"
                  alt="Qin Steve, MCBIOS President"
                  className="mx-auto"
                />
              </CardHeader>
              <Divider w="80%" mx="auto" />
              <CardFooter>
                <p className="text-sm">
                  <strong className="mx-auto">Zhaohui “Steve” Qin, PhD</strong>
                  <br />
                  President, Mid-South Computational Biology & Bioinformatics
                  Society
                  <br />
                  Professor
                  <br />
                  Department of Biostatistics, Bioinformatics
                  <br />
                  Emory University
                </p>
              </CardFooter>
            </Card>
          </div>
          <Accordion defaultIndex={[0]} allowMultiple w="60vw">
            <AccordionItem aria-label="Introduction and Gratitude">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Introduction and Gratitude
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                It is my great honor to serve as the 19th president of MidSouth
                Computational Biology and Bioinformatics Society (MCBIOS). I
                want to thank members of the society for trusting me and giving
                me this opportunity to lead a regional bioinformatics
                powerhouse. I also want to thank the board of directors and past
                presidents for their unwavering support and guidance.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem aria-label="Personal Journey">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Personal Journey
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Reflecting my own professional journey, I can&lsquo;t emphasize
                more on the importance of professional organization for a
                trainee and junior professionals. I didn&lsquo;t discover
                bioinformatics until in my postdoc years. Joining ISCB and
                attending my first ISMB conference really made a difference. I
                felt that I found the community of like-minded people,
                especially young professionals, that I belong. Therefore, I
                encourage colleagues, especially trainees, no matter where you
                are located, to please consider joining us.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem aria-label="Future Events: Upcomming Conference">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Future Events: Upcomming Conference
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                I considered myself very lucky to be introduced to MCBIOS and
                attended my first MCBIOS annual conference in 2019. Over the
                years, I found MCBIOS to be a very welcoming community consist
                of energetic professionals working in all aspects of
                bioinformatics. Because of the pandemic, for the past three
                years, we have to either postpone or move the annual conferences
                online. I am really pleased that we are able to get back to
                normal earlier this year in the 2023 Conference. Looking forward
                to next year, I sincerely hope that you can join us for our 20th
                annual conference to be held in Atlanta, GA on March 22-24,
                2024. <br />
                <br />
                Additionally, I encourage and welcome the scientific community
                to join us and connect with us via social media to stay updated
                on upcoming events such as the career development webinar series
                and our 2024 annual conference. Over the coming months, we will
                be sharing more information on upcoming webinar dates, 2024
                conference call for session proposals, abstract deadlines and
                more. Many thanks for all of your continued support and well
                wishes!
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Divider as="hr" className="my-10 border-gray-500" />

      <ElectionHero />

      <Divider as="hr" className="my-10 border-gray-500" />

      <div className="w-4/5 md:w-2/3 mx-auto">
        <h3 className="underline underline-offset-4 text-center">Objectives</h3>
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

      <Divider as="hr" className="my-10 border-gray-500" />

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
          <div className="w-full flex justify-center">
            <Button
              size="md"
              onClick={() => router.push("/membership")}
              colorScheme="purple"
            >
              Registration
            </Button>
          </div>
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
