"use client";

import AikChoonTan from "@/public/images/leadership/Aik-Choon-Tan.jpg";
import BernieDaigle from "@/public/images/leadership/Bernie-Daigle.jpg";
import ChangSu from "@/public/images/leadership/Chang-Su.jpg";
import JinchengShen from "@/public/images/leadership/Jincheng-Shen.png";
import JonathanSheridan from "@/public/images/leadership/Jonathan-Sheridan.jpg";
import NishaPillai from "@/public/images/leadership/Nisha-Pillai.jpg";
import PelumiAbimbola from "@/public/images/leadership/Pelumi-Abimbola.jpg";
import QianqianSong from "@/public/images/leadership/Qianqian-Song.jpg";
import VinayRaj from "@/public/images/leadership/Vinay-Raj.jpg";
import XuefengWang from "@/public/images/leadership/Xuefeng-Wang.png";
import ZongliangYue from "@/public/images/leadership/Zongliang-Yue.png";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuHistory, LuQuote, LuTrophy, LuUsers } from "react-icons/lu";

// President greeting sections
const greetingSections = [
  {
    title: "Introduction and Gratitude",
    content:
      "I am deeply honored and profoundly grateful to serve as the 20th President of the MidSouth Computational Biology and Bioinformatics Society (MCBIOS). This opportunity to lead our esteemed society is a testament to the trust and confidence you have placed in me.",
  },
  {
    title: "Embracing Growth and Diversity",
    content:
      "We are committed to expanding our reach, ensuring that scientists from all backgrounds find a home within MCBIOS. Diversity in perspective leads to diversity in solutions.",
  },
  {
    title: "Supporting Education and Mentorship",
    content:
      "Our focus remains on the students and early-career researchers who will lead this field tomorrow. We are building robust mentorship programs and training opportunities.",
  },
  {
    title: "Vision for the Future",
    content:
      "The future of bioinformatics is at the intersection of AI and precision medicine. MCBIOS will be at the forefront of this revolution in the MidSouth region.",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [boardView, setBoardView] = useState<"current" | "past">("current");

  return (
    <Box bg={{ base: "white", _dark: "gray.950" }}>
      {/* Leadership Hero */}
      <Box
        as="section"
        pt="40"
        pb="20"
        bg={{ base: "slate.50", _dark: "gray.900" }}
        borderBottomWidth="1px"
        borderColor={{ base: "slate.200", _dark: "gray.700" }}
      >
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box maxW="3xl">
            <Heading
              as="h1"
              fontSize="6xl"
              fontWeight="black"
              color={{ base: "slate.900", _dark: "white" }}
              mb="6"
            >
              Our Leadership
            </Heading>
            <Text
              fontSize="xl"
              color={{ base: "slate.600", _dark: "gray.300" }}
              lineHeight="relaxed"
            >
              Guided by the vision of leading computational biologists and
              bioinformaticians from across the MidSouth region and beyond.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8" mt="16">
            {/* Current Board Card */}
            <Flex
              bg={{ base: "white", _dark: "gray.800" }}
              p="8"
              rounded="3xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
              align="flex-start"
              gap="4"
            >
              <Flex p="3" bg="indigo.50" rounded="2xl" color="indigo.600">
                <Icon boxSize="6">
                  <LuUsers />
                </Icon>
              </Flex>
              <Box>
                <Text
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Current Board
                </Text>
                <Text
                  fontSize="sm"
                  color={{ base: "slate.500", _dark: "gray.400" }}
                >
                  {boardMembers.length} Distinguished members
                </Text>
              </Box>
            </Flex>

            {/* Past Leadership Card */}
            <Flex
              bg={{ base: "white", _dark: "gray.800" }}
              p="8"
              rounded="3xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
              align="flex-start"
              gap="4"
            >
              <Flex p="3" bg="indigo.50" rounded="2xl" color="indigo.600">
                <Icon boxSize="6">
                  <LuHistory />
                </Icon>
              </Flex>
              <Box>
                <Text
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Past Leadership
                </Text>
                <Text
                  fontSize="sm"
                  color={{ base: "slate.500", _dark: "gray.400" }}
                >
                  {pastPrez.length} Years of guidance
                </Text>
              </Box>
            </Flex>

            {/* Society Awards Card */}
            <Flex
              bg={{ base: "white", _dark: "gray.800" }}
              p="8"
              rounded="3xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
              align="flex-start"
              gap="4"
            >
              <Flex p="3" bg="indigo.50" rounded="2xl" color="indigo.600">
                <Icon boxSize="6">
                  <LuTrophy />
                </Icon>
              </Flex>
              <Box>
                <Text
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Society Awards
                </Text>
                <Text
                  fontSize="sm"
                  color={{ base: "slate.500", _dark: "gray.400" }}
                >
                  Honoring excellence
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* President Greeting */}
      <Box
        as="section"
        py="24"
        bg="#1a1a1a"
        color="white"
        overflow="hidden"
        position="relative"
        borderY="1px solid"
        borderColor="slate.800"
      >
        {/* Background image overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          opacity="0.05"
          pointerEvents="none"
          filter="grayscale(100%)"
        >
          <Image
            src="https://images.unsplash.com/photo-1678845530864-18a666ca9762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt=""
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>

        <Container
          maxW="7xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "2fr 3fr" }}
            gap="20"
            alignItems="center"
          >
            {/* Left column - President photo and info */}
            <GridItem>
              <Box position="relative" display="inline-block">
                <Box
                  w="72"
                  h="96"
                  rounded="40px"
                  overflow="hidden"
                  borderWidth="8px"
                  borderColor="whiteAlpha.100"
                >
                  <Image
                    src={AikChoonTan.src}
                    alt="President Aik Choon Tan"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                <Flex
                  position="absolute"
                  bottom="-6"
                  right="-6"
                  bg="#800000"
                  p="6"
                  rounded="2xl"
                  shadow="2xl"
                >
                  <Icon boxSize="10" color="white">
                    <LuQuote />
                  </Icon>
                </Flex>
              </Box>
              <Box mt="12">
                <Heading
                  as="h3"
                  fontSize="3xl"
                  fontWeight="black"
                  letterSpacing="tight"
                >
                  Aik Choon Tan, Ph.D.
                </Heading>
                <Text
                  color="red.500"
                  fontWeight="black"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  fontSize="xs"
                  mt="2"
                >
                  MCBIOS President (2024-2025)
                </Text>
                <Stack
                  mt="6"
                  gap="1"
                  color="slate.400"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  <Text>Professor | Senior Director of Data Science</Text>
                  <Text>Huntsman Cancer Institute</Text>
                  <Text>University of Utah</Text>
                </Stack>
              </Box>
            </GridItem>

            {/* Right column - Greeting content */}
            <GridItem>
              <Heading
                as="h2"
                fontSize="5xl"
                fontWeight="black"
                mb="10"
                letterSpacing="tight"
                lineHeight="tight"
              >
                Greetings from the{" "}
                <Text as="span" color="#800000">
                  President
                </Text>
              </Heading>

              <Stack gap="6">
                {greetingSections.map((section, idx) => (
                  <Box
                    key={idx}
                    p="8"
                    rounded="32px"
                    transition="all 0.2s"
                    cursor="pointer"
                    borderWidth="2px"
                    borderColor={activeTab === idx ? "#800000" : "transparent"}
                    bg={activeTab === idx ? "whiteAlpha.100" : "transparent"}
                    _hover={{ bg: "whiteAlpha.100" }}
                    onClick={() => setActiveTab(idx)}
                  >
                    <Heading
                      as="h4"
                      fontSize="xl"
                      fontWeight="black"
                      mb="4"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      color={activeTab === idx ? "white" : "slate.500"}
                    >
                      {section.title}
                    </Heading>
                    {activeTab === idx && (
                      <Text
                        color="slate.300"
                        lineHeight="relaxed"
                        fontWeight="medium"
                        fontSize="lg"
                      >
                        {section.content}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Board Members */}
      <Box as="section" py="24" bg={{ base: "slate.50", _dark: "gray.900" }}>
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            mb="16"
            gap="6"
          >
            <Box maxW="2xl">
              <Text
                color="indigo.600"
                fontWeight="bold"
                letterSpacing="wider"
                textTransform="uppercase"
                fontSize="sm"
                mb="4"
              >
                Leadership
              </Text>
              <Heading
                as="h3"
                fontSize="4xl"
                fontWeight="bold"
                color={{ base: "slate.900", _dark: "white" }}
                mb="6"
              >
                Board of Directors
              </Heading>
              <Text
                fontSize="lg"
                color={{ base: "slate.600", _dark: "gray.300" }}
              >
                Our leadership team comprises distinguished researchers and
                educators dedicated to steering the society towards excellence
                in computational biology.
              </Text>
            </Box>
            <Flex
              gap="2"
              p="1"
              bg={{ base: "white", _dark: "gray.800" }}
              rounded="xl"
              shadow="sm"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
            >
              <Button
                px="4"
                py="2"
                rounded="lg"
                fontWeight="bold"
                fontSize="sm"
                bg={boardView === "current" ? "indigo.600" : "transparent"}
                color={{
                  _light: boardView === "current" ? "slate.500" : "blackAlpha.800",
                  _dark: boardView === "current" ? "slate.500" : "white",
                }}
                _hover={{
                  bg: boardView === "current" ? "indigo.700" : "slate.50",
                }}
                onClick={() => setBoardView("current")}
              >
                Current Board
              </Button>
              <Button
                px="4"
                py="2"
                rounded="lg"
                fontWeight="bold"
                fontSize="sm"
                bg={boardView === "past" ? "indigo.600" : "transparent"}
                color={{
                  _light: boardView === "past" ? "white" : "blackAlpha.800",
                  _dark: boardView === "past" ? "slate.500" : "white",
                }}
                _hover={{
                  bg: boardView === "past" ? "indigo.700" : "slate.50",
                }}
                onClick={() => setBoardView("past")}
              >
                Past Presidents
              </Button>
            </Flex>
          </Flex>

          {boardView === "current" ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
              {boardMembers.map((member, index) => (
                <Box
                  key={index}
                  bg={{ base: "white", _dark: "gray.800" }}
                  p="6"
                  rounded="3xl"
                  borderWidth="1px"
                  borderColor={{ base: "slate.200", _dark: "gray.700" }}
                  transition="all 0.2s"
                  _hover={{ borderColor: "indigo.600" }}
                  role="group"
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      w="16"
                      h="16"
                      rounded="2xl"
                      objectFit="cover"
                      mb="6"
                    />
                  ) : (
                    <Flex
                      w="16"
                      h="16"
                      rounded="2xl"
                      bg={{ base: "slate.100", _dark: "gray.700" }}
                      mb="6"
                      align="center"
                      justify="center"
                      transition="all 0.2s"
                      _groupHover={{ bg: "indigo.50" }}
                    >
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="slate.400"
                        _groupHover={{ color: "indigo.600" }}
                        transition="all 0.2s"
                      >
                        {member.name[0]}
                      </Text>
                    </Flex>
                  )}
                  <Heading
                    as="h4"
                    fontSize="lg"
                    fontWeight="bold"
                    color={{ base: "slate.900", _dark: "white" }}
                    mb="1"
                    _groupHover={{ color: "indigo.600" }}
                    transition="all 0.2s"
                  >
                    {member.name}
                  </Heading>
                  <Text
                    color="indigo.600"
                    fontSize="sm"
                    fontWeight="semibold"
                    mb="2"
                  >
                    {member.title}
                  </Text>
                  {member.department && (
                    <Text
                      color={{ base: "slate.500", _dark: "gray.400" }}
                      fontSize="xs"
                      mb="1"
                    >
                      {member.department}
                    </Text>
                  )}
                  <Text
                    color={{ base: "slate.500", _dark: "gray.400" }}
                    fontSize="xs"
                    mb="6"
                  >
                    {member.affiliation}
                  </Text>

                  {/* <Flex pt="6" borderTopWidth="1px" borderColor="slate.100" align="center" gap="3">
                    <Box
                      as="button"
                      color="slate.400"
                      _hover={{ color: "indigo.600" }}
                      transition="all 0.2s"
                    >
                      <Icon boxSize="4">
                        <LuLinkedin />
                      </Icon>
                    </Box>
                    <Box
                      as="button"
                      color="slate.400"
                      _hover={{ color: "indigo.600" }}
                      transition="all 0.2s"
                    >
                      <Icon boxSize="4">
                        <LuMail />
                      </Icon>
                    </Box>
                  </Flex> */}
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
              {pastPrez.map((member, index) => (
                <Box
                  key={index}
                  bg={{ base: "white", _dark: "gray.800" }}
                  p="6"
                  rounded="3xl"
                  borderWidth="1px"
                  borderColor={{ base: "slate.200", _dark: "gray.700" }}
                  transition="all 0.2s"
                  _hover={{ borderColor: "indigo.600" }}
                  role="group"
                >
                  <Flex
                    w="16"
                    h="16"
                    rounded="2xl"
                    bg="slate.100"
                    mb="6"
                    align="center"
                    justify="center"
                    transition="all 0.2s"
                    _groupHover={{ bg: "indigo.50" }}
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="slate.400"
                      _groupHover={{ color: "indigo.600" }}
                      transition="all 0.2s"
                    >
                      #{pastPrez.length - index}
                    </Text>
                  </Flex>
                  <Heading
                    as="h4"
                    fontSize="lg"
                    fontWeight="bold"
                    color={{ base: "slate.900", _dark: "white" }}
                    mb="1"
                    _groupHover={{ color: "indigo.600" }}
                    transition="all 0.2s"
                  >
                    {member.name}
                  </Heading>
                  <Text
                    color="indigo.600"
                    fontSize="sm"
                    fontWeight="semibold"
                    mb="2"
                  >
                    {member.title}
                  </Text>
                  {member.department && (
                    <Text
                      color={{ base: "slate.500", _dark: "gray.400" }}
                      fontSize="xs"
                      mb="1"
                    >
                      {member.department}
                    </Text>
                  )}
                  <Text
                    color={{ base: "slate.500", _dark: "gray.400" }}
                    fontSize="xs"
                    mb="6"
                  >
                    {member.affiliation}
                  </Text>

                  {/* <Flex pt="6" borderTopWidth="1px" borderColor="slate.100" align="center" gap="3">
                    <Box
                      as="button"
                      color="slate.400"
                      _hover={{ color: "indigo.600" }}
                      transition="all 0.2s"
                    >
                      <Icon boxSize="4">
                        <LuLinkedin />
                      </Icon>
                    </Box>
                    <Box
                      as="button"
                      color="slate.400"
                      _hover={{ color: "indigo.600" }}
                      transition="all 0.2s"
                    >
                      <Icon boxSize="4">
                        <LuMail />
                      </Icon>
                    </Box>
                  </Flex> */}
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

const boardMembers = [
  {
    name: "Aik Choon Tan, Ph.D.",
    image: AikChoonTan.src,
    title: "Professor | Senior Director of Data Science",
    department: "Department of Oncological Sciences",
    affiliation: "University of Utah School of Medicine",
  },
  {
    name: "Jincheng Shen, Ph.D",
    image: JinchengShen.src,
    title: "Assistant Professor",
    department: "Division of Biostatistics",
    affiliation: "University of Utah",
  },
  {
    name: "Qianqian Song, Ph.D.",
    image: QianqianSong.src,
    title: "Assistant professor | Director of Translational Bioinformatics",
    department: "Health Outcomes & Biomedical Informatics",
    affiliation: "University of Florida",
  },
  {
    name: "Xuefeng Wang, Ph.D.",
    image: XuefengWang.src,
    title: "Chair & Professor",
    department: "Department of Biostatistics and Bioinformatics",
    affiliation: "Moffitt Cancer Center",
  },
  {
    name: "Pelumi Abimbola",
    image: PelumiAbimbola.src,
    title: "Student",
    affiliation: "Mississippi State University",
  },
  {
    name: "Bernie J. Daigle, Jr., Ph.D.",
    image: BernieDaigle.src,
    title: "Associate Professor",
    department: "Department of Biological Sciences, Computer Science",
    affiliation: "University of Memphis",
  },
  {
    name: "Nisha Pillai, Ph.D.",
    image: NishaPillai.src,
    title: "Research Scientist",
    department: "Department of Computer Science, Engineering",
    affiliation: "Mississippi State University",
  },
  {
    name: "Vinay Raj, Ph.D.",
    image: VinayRaj.src,
    title: "Assistant professor",
    department: "Department of Biology",
    affiliation: "University of Arkansas at Pine Bluff",
  },
  {
    name: "Jonathan Sheridan",
    image: JonathanSheridan.src,
    title: "Board Member",
    affiliation: "University of Mississippi",
  },
  {
    name: "Chang Su, Ph.D.",
    image: ChangSu.src,
    title: "Assistant Professor",
    department: "Department of Biostatistics and Bioinformatics",
    affiliation: "Emory University",
  },
  {
    name: "Zongliang Yue, Ph.D.",
    image: ZongliangYue.src,
    title: "Assistant Research Professor",
    department: "Health Outcomes Research and Policy",
    affiliation: "Auburn University",
  },
];

const pastPrez = [
  {
    name: 'Zhaohui "Steve" Qin, Ph.D.',
    title: "Professor",
    department: "Department of Biostatistics, Bioinformatics",
    affiliation: "Emory University",
  },
  {
    name: "Inimary Toby, Ph.D.",
    title: "Assistant Professor",
    department:
      "Department of Biology, Community Assistance Research-affiliated Faculty",
    affiliation: "University of Dallas",
  },
  {
    name: "Jake Chen, Ph.D.",
    title: "Chief Bioinformatics Officer",
    department: "Chief Bioinformatics Officer, Professor of Genetics",
    affiliation: "Emory University",
  },
  {
    name: "Inimary Toby, Ph.D.",
    title: "Assistant Professor",
    department:
      "Department of Biology, Community Assistance Research-affiliated Faculty",
    affiliation: "University of Dallas",
  },
  {
    name: "Weida Tong, Ph.D.",
    title: "Division Director",
    department: "Bioinformatics & Biostatistics",
    affiliation: "NCTR FDA",
  },
  {
    name: "Ramin Homayouni, Ph.D.",
    title: "Director of Bioinformatics",
    department: "Biology, Bioinformatics",
    affiliation: "University of Memphis",
  },
  {
    name: "Bindu Nanduri, Ph.D.",
    title: "Associate Professor",
    department: "College of Veterinary Medicine",
    affiliation: "Mississippi State University",
  },
  {
    name: "Cesar M. Compadre, Ph.D.",
    title: "Professor",
    department: "Medical Sciences",
    affiliation: "University of Arkansas",
  },
  {
    name: "Chaoyang (Joe) Zhang, Ph.D.",
    title: "Professor",
    affiliation: "University of Southern Mississippi",
  },
  {
    name: "Andy D. Perkins, Ph.D.",
    title: "Associate Professor",
    department: "Department of Computer Science and Engineering",
    affiliation: "Mississippi State University",
  },
  {
    name: "Ed Perkins, Ph.D.",
    title: "Senior Research Scientist",
    department: "Engineer Research and Development Center",
    affiliation: "US Army Corps of Engineers",
  },
  {
    name: "Doris M. Kupfer, Ph.D.",
    title: "Research Scientist",
    department: "Functional Genomics Civil Aerospace Medical Institute",
    affiliation: "FAA",
  },
  {
    name: "Ulisses Braga-Neto, Ph.D.",
    title: "Assistant Professor",
    department: "Department of Electrical and Computer Engineering",
    affiliation: "Texas A&M University",
  },
  {
    name: "Daniel Berleant, Ph.D.",
    title: "Assistant Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
  {
    name: "Dawn Wilkins Ph.D.",
    title: "Associate Professor",
    department: "Department of Computer and Information Science",
    affiliation: "University of Mississippi",
  },
  {
    name: "Jonathan Wren, Ph.D.",
    title: "Assistant Member",
    affiliation:
      "Arthritis & Immunology Department Oklahoma Medical Research Foundation",
  },
  {
    name: "Stephen Winters-Hilt, Ph.D.",
    title: "PhD Candidate",
    department: "Department of Computer Science",
    affiliation: "University of New Orleans",
  },
  {
    name: "William Slikker, Jr., Ph.D.",
    title: "Director",
    affiliation: "U.S. Food and Drug Administration",
  },
  {
    name: "Steven F. Jennings, Ph.D.",
    title: "Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
];
