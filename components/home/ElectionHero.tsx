import {
  Box,
  Button,
  Container,
  createIcon,
  Flex,
  Heading,
  Icon,
  IconProps,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ElectionNominee, { ElectionProps } from "./ElectionNominee";

const nominees: ElectionProps[] = [
  {
    avatar: "/images/election/DrAikChoonTan.jpg",
    name: "Dr. Aik Choon Tan",
    isPrez: true,
    recording:
      "https://drive.google.com/file/d/1RnGVmTZSE-FN8J8xwEakJSEyfYqbk6LW/preview",
    plans: [
      "Mentoring and Career Development: Dr. Tan plans to establish an Education sub-committee within MCBIOS to support the career growth of junior faculty, post-docs, and graduate students by recruiting diverse mentors and providing career development feedback.",
      "National Membership Expansion: He aims to broaden MCBIOS’s reach beyond the traditional Mid-South region by increasing membership across the USA, leveraging recent conference trends to attract a wider audience.",
      "Conference Leadership: Dr. Tan intends to capitalize on the success of recent MCBIOS conferences by bringing the 2025 conference to Salt Lake City, Utah, to enhance regional engagement and showcase national expertise.",
    ],
    overview: [
      {
        heading: "Scientific Leadership",
        content:
          "Dr. Aik Choon Tan has advanced the field of cancer bioinformatics through his role as Senior Director of Data Science at the Huntsman Cancer Institute and his development of computational methods for cancer data analysis. He has also mentored numerous junior researchers and published over 220 peer-reviewed papers.",
      },
      {
        heading: "MCBIOS Involvement",
        content:
          "Dr. Tan has been an active MCBIOS Board member since 2021, organizing webinars, co-chairing workshops, and contributing to conference committees, including his current role as Program Chair for MCBIOS 2025 Conference.",
      },
    ],
  },
  {
    avatar: "/images/election/PelumiAbimbola.jpg",
    name: "Pelumi Abimbola",
    recording:
      "https://drive.google.com/file/d/1LO_FoXe4DzhuQktFcUPlmGbnV9JVZDn0/preview",
    plans: [
      "Scientific and Professional Experience: As a Graduate Research Assistant at Mississippi State University, Pelumi has over six years of experience in NLP and Big Data, with two published papers and one in progress. Her background includes roles such as NLP Research Assistant in India and Data Analyst for a humanitarian project in Nigeria, showcasing a strong track record in cutting-edge research and analytics.",
      "Leadership and Mentorship: Pelumi is a current MCBIOS member. She has demonstrated leadership both professionally and personally, including roles as Program Director for the African Students Association and Academic Director during undergraduate studies. She has also mentored interns and graduate trainees, reflecting a commitment to developing new talent.",
    ],
    overview: [
      {
        heading: "Establishing a Student Chapter",
        content:
          "Pelumi plans to create a student chapter of MCBIOS at Mississippi State University, which will enhance community engagement and provide support for peers in bioinformatics and computational biology.",
      },
      {
        heading: "Promoting Bioinformatics Activities",
        content:
          "Pelumi is a current MCBIOS member. She has demonstrated leadership both professionally and personally, including roles as Program Director for the African Students Association and Academic Director during undergraduate studies. She has also mentored interns and graduate trainees, reflecting a commitment to developing new talent.",
      },
      {
        heading: "Fostering Collaboration amongst trainee members",
        content:
          "By facilitating collaboration and engagement, Pelumi seeks to strengthen the MCBIOS trainee network and amplify its influence within the academic and scientific communities.",
      },
    ],
  },
];

export default function ElectionHero() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "pink.400",
                zIndex: -1,
              }}
            >
              2024 Board Elections
            </Text>
            <br />
            <Text as={"span"} color={"pink.400"}>
              Its time to vote!
            </Text>
          </Heading>
          <Stack gap={3}>
            <Text color={"gray.500"}>
              The MCBIOS board member elections will take place in September
              2024. According to the MCBIOS Bylaws, every member is entitled to
              one vote. This is a great chance for you to help shape the future
              of our organization.
            </Text>
            <Text color={"gray.500"}>
              This year, we have one candidate for the position of President
              Elect and one candidate for the Student Board Member position.
              Detailed information about each candidate is provided below. The
              election will be conducted electronically. Please keep an eye on
              your email for notifications, candidate speeches, and instructions
              on how to cast your vote.
            </Text>
          </Stack>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              //   as={NextLink}
              //   href="https://x3yn84lm.forms.app/elections-2024"
              //   target="_blank"
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              mx="auto"
              disabled
              colorScheme={"pink"}
              bg={"pink.200"}
              _hover={{ bg: "pink.200" }}
            >
              Form Available Soon
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          overflowX="clip"
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "red.400")}
          />
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            width={"full"}
            overflow={"hidden"}
          ></Box>
        </Flex>
      </Stack>
      <Stack
        maxW="5xl"
        mx="auto"
        px={7}
        gap={5}
        direction={["column", "column", "column", "row"]}
      >
        {nominees.map((nominee) => (
          <ElectionNominee
            key={nominee.name}
            isPrez={nominee.isPrez}
            avatar={nominee.avatar}
            name={nominee.name}
            overview={nominee.overview}
            plans={nominee.plans}
            recording={nominee.recording}
          />
        ))}
      </Stack>
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
