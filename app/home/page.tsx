import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function HomeV2() {
  return (
    <Box
      w="80%"
      mx="auto"
      my={20}
      as={Stack}
      divider={<StackDivider borderColor="gray.500" />}
      rowGap={50}
    >
      <Stack w={["90%", null, null, "50%"]} mx="auto">
        <Image
          mx="auto"
          src="/images/logo.jpg"
          alt="MCBIOS Logo"
          objectFit="cover"
          sx={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <Button
          size="md"
          href="#"
          as={Link}
          color="primary"
          variant="ghost"
          className="mx-auto mt-12"
        >
          Become a Member
        </Button>
      </Stack>
      <Box as={Stack} gap={5} mx="auto" w={[null, null, "90%"]}>
        <Heading as="h6">Greeting from the MCBIOS President:</Heading>
        <Stack
          direction={["column", null, null, "row"]}
          gap={10}
          my={5}
          justify="center"
          align="center"
        >
          <Image
            src="/images/leadership/Qin-Steve.jpg"
            alt="Qin Steve, MCBIOS President"
            w={["50%", null, null, "20%"]}
            objectFit="cover"
          />
          <Box as={Card} boxShadow="xl">
            <Accordion allowToggle defaultIndex={0}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Introduction and Gratitude
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  It is my great honor to serve as the 19th president of
                  MidSouth Computational Biology and Bioinformatics Society
                  (MCBIOS). I want to thank members of the society for trusting
                  me and giving me this opportunity to lead a regional
                  bioinformatics powerhouse. I also want to thank the board of
                  directors and past presidents for their unwavering support and
                  guidance.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Personal Journey
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Reflecting my own professional journey, I can’t emphasize more
                  on the importance of professional organization for a trainee
                  and junior professionals. I didn’t discover bioinformatics
                  until in my postdoc years. Joining ISCB and attending my first
                  ISMB conference really made a difference. I felt that I found
                  the community of like-minded people, especially young
                  professionals, that I belong. Therefore, I encourage
                  colleagues, especially trainees, no matter where you are
                  located, to please consider joining us.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Future Events: Upcomming Conference
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text as="p">
                    I considered myself very lucky to be introduced to MCBIOS
                    and attended my first MCBIOS annual conference in 2019. Over
                    the years, I found MCBIOS to be a very welcoming community
                    consist of energetic professionals working in all aspects of
                    bioinformatics. Because of the pandemic, for the past three
                    years, we have to either postpone or move the annual
                    conferences online. I am really pleased that we are able to
                    get back to normal earlier this year in the 2023 Conference.
                    Looking forward to next year, I sincerely hope that you can
                    join us for our 20th annual conference to be held in
                    Atlanta, GA on March 22-24, 2024.
                  </Text>
                  <Text as="p" mt={5}>
                    Additionally, I encourage and welcome the scientific
                    community to join us and connect with us via social media to
                    stay updated on upcoming events such as the career
                    development webinar series and our 2024 annual conference.
                    Over the coming months, we will be sharing more information
                    on upcoming webinar dates, 2024 conference call for session
                    proposals, abstract deadlines and more. Many thanks for all
                    of your continued support and well wishes!
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Stack>
        <Text as="p">
          Sincerely, Zhaohui “Steve” Qin, PhD
          <br />
          President, Mid-South Computational Biology & Bioinformatics Society
          <br />
          Professor
          <br />
          Department of Biostatistics, Bioinformatics
          <br />
          Emory University
        </Text>
      </Box>
      <Box mx="auto" w={[null, null, "90%"]}>
        <Heading as="h6">Objectives</Heading>
        <UnorderedList my={5}>
          <ListItem>
            Advance the understanding of bioinformatics and computational
            biology
          </ListItem>
          <ListItem>
            Bring together scientists of various backgrounds and disciplines
          </ListItem>
          <ListItem>
            Facilitate the collaboration of researchers with similar or
            complementary backgrounds to solve biological, health and/or medical
            problems
          </ListItem>
          <ListItem>
            Promote education in bioinformatics and computational biology
          </ListItem>
          <ListItem>
            Inform the general public on the results and implications of current
            research in bioinformatics and computational biology
          </ListItem>
          <ListItem>
            Promote other activities that will contribute to the development of
            bioinformatics and computational biology MCBIOS Bylaws Current
            version (Amended Feb 20, 2010)
          </ListItem>
        </UnorderedList>
      </Box>
      <SimpleGrid
        columns={[1, null, null, 2]}
        gap={5}
        mx="auto"
        w={[null, null, "90%"]}
      >
        <Box px={3}>
          <Heading as="h6">Membership</Heading>
          <Text as="p" my={5}>
            Membership in MBIOS includes meeting registration for the annual
            Conference and access to workshops and collaborative projects hosted
            by MCBIOS through the year. Students receive a discount for
            membership and are eligible for student awards. MCBIOS encourages
            involvement at both the regional and state level.
          </Text>
          <Box
            my={15}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              size="md"
              href="#"
              as={Link}
              color="primary"
              variant="ghost"
              className="mx-auto mt-12"
            >
              Registration
            </Button>
          </Box>
        </Box>
        <Box px={3}>
          <Heading as="h6">Local Chapters</Heading>
          <UnorderedList my={5} as="p">
            <ListItem>
              MCBIOS encourages the formation of local chapters. Chapters
              require:
            </ListItem>
            <ListItem>At least three members </ListItem>
            <ListItem>An elected chairman </ListItem>
            <ListItem>
              A regular meeting schedule, with a minimum of two meetings per
              year
            </ListItem>
            <ListItem>A purpose for organizing</ListItem>
          </UnorderedList>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
