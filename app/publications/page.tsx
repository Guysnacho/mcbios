import { DnaHelix } from "@/components/svg/DnaHelix";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Metadata } from "next";
import { LuBookOpen, LuFileText, LuTrendingUp } from "react-icons/lu";

export const metadata: Metadata = {
  title:
    "MCBIOS Publications | MidSouth Computational Biology and Bioinformatics Society",
  description:
    "MCBIOS is a non-profit organization founded in 2003. Here you can find an archive of our publications.",
};

export default function Page() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        as="section"
        pt="40"
        pb="16"
        bg={{ base: "slate.50", _dark: "gray.900" }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          right="-80px"
          top="50%"
          transform="translateY(-50%) rotate(-10deg)"
          opacity="0.03"
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="w-48 h-100" color="#800000" opacity="1" />
        </Box>

        <Container
          maxW="4xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Flex align="center" gap="3" mb="4">
            <Flex
              p="3"
              bg="red.100"
              rounded="xl"
              align="center"
              justify="center"
            >
              <Icon color="red.700" boxSize="6">
                <LuBookOpen />
              </Icon>
            </Flex>
            <Text
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="red.700"
            >
              Research
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="black"
            color={{ base: "slate.900", _dark: "white" }}
            mb="4"
            lineHeight="tight"
          >
            Publications
          </Heading>
          <Text
            fontSize="lg"
            color={{ base: "slate.600", _dark: "gray.300" }}
            lineHeight="relaxed"
          >
            MCBIOS society has entering a strategic partnership with{" "}
            <Link
              href="https://bioinform.jmir.org"
              target="_blank"
              textDecorationLine="underline"
            >
              JMIR
            </Link>{" "}
            Bioinformatics and Biotechnology journal to formally designates JMIR
            Bioinformatics and Biotechnology as the official journal of MCBIOS,
            effective as of October 10, 2025. Learn more here at{" "}
            <Link
              href="https://bioinform.jmir.org/announcements/625"
              target="_blank"
              textDecorationLine="underline"
            >
              this press release
            </Link>
            .
          </Text>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        as="section"
        pb="8"
        bg={{ base: "white", _dark: "gray.950" }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="-60px"
          bottom="100px"
          opacity="0.02"
          transform="rotate(15deg)"
          display={{ base: "none", xl: "block" }}
        >
          <DnaHelix className="w-48 h-100" color="#800000" opacity="1" />
        </Box>

        <Container
          maxW="4xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          position="relative"
          zIndex="10"
        >
          <Stack gap="12">
            {/* About Publications */}
            <Box
              p={{ base: 6, md: 8 }}
              bg={{ base: "slate.50", _dark: "gray.800" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
            >
              <Flex align="center" gap="3" mb="4">
                <Icon color="red.700" boxSize="5">
                  <LuFileText />
                </Icon>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Conference Proceedings
                </Heading>
              </Flex>
              <Text
                color={{ base: "slate.700", _dark: "gray.300" }}
                lineHeight="relaxed"
              >
                Individuals whose poster or platform abstracts are accepted for
                presentation at the MCBIOS conference are eligible to submit a
                full paper to be considered for formal, peer-reviewed
                publication in the conference proceedings. Prior to the recent
                partnership with JMIR Bioinformatics and Biotechnology,
                proceedings have appeared in{" "}
                <Link
                  href="http://www.biomedcentral.com/bmcbioinformatics/"
                  color="red.700"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  special issues of BMC Bioinformatics
                </Link>
                .
              </Text>
            </Box>

            {/* Google Scholar */}
            <Box
              p={{ base: 6, md: 8 }}
              bg={{ base: "slate.50", _dark: "gray.800" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
            >
              <Flex align="center" gap="3" mb="4">
                <Icon color="red.700" boxSize="5">
                  <LuTrendingUp />
                </Icon>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  MCBIOS on Google Scholar
                </Heading>
              </Flex>
              <Text
                color={{ base: "slate.700", _dark: "gray.300" }}
                lineHeight="relaxed"
              >
                Proceedings papers for all previous MCBIOS meetings are now
                available on Google Scholar. For a listing of the papers and
                citation metrics,{" "}
                <Link
                  href="https://scholar.google.com/citations?user=UX8w0_MAAAAJ&hl=en"
                  color="red.700"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                  {/* <Icon as={LuExternalLink} boxSize="3" ml="1" /> */}
                </Link>
                .
              </Text>
            </Box>

            {/* Archive */}
            <Box>
              <Flex align="center" gap="3" mb="6">
                <Icon color="red.700" boxSize="5">
                  <LuBookOpen />
                </Icon>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Archive
                </Heading>
              </Flex>
              <Text color={{ base: "slate.600", _dark: "gray.300" }} mb="6">
                Browse through past MCBIOS conference proceedings at the{" "}
                <Text as="span" fontStyle="italic">
                  BMC Bioinformatics
                </Text>{" "}
                publication archive:
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                }}
                gap="3"
              >
                {[...publications].reverse().map((pub) => (
                  <GridItem key={pub.year}>
                    <Link
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      display="block"
                      p="4"
                      bg={{ base: "slate.50", _dark: "gray.800" }}
                      rounded="xl"
                      borderWidth="1px"
                      borderColor={{ base: "slate.200", _dark: "gray.700" }}
                      textAlign="center"
                      fontWeight="bold"
                      color={{ base: "red.700", _dark: "red.400" }}
                      transition="all 0.2s"
                      _hover={{
                        bg: { base: "red.50", _dark: "red.950" },
                        borderColor: { base: "red.200", _dark: "red.800" },
                        transform: "translateY(-2px)",
                        shadow: "sm",
                      }}
                    >
                      {pub.year}
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </Box>

            {/* Impact Factors */}
            <Box
              p={{ base: 6, md: 8 }}
              bg={{ base: "slate.50", _dark: "gray.800" }}
              rounded="2xl"
              borderWidth="1px"
              borderColor={{ base: "slate.200", _dark: "gray.700" }}
            >
              <Flex align="center" gap="3" mb="4">
                <Icon color="red.700" boxSize="5">
                  <LuTrendingUp />
                </Icon>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight="bold"
                  color={{ base: "slate.900", _dark: "white" }}
                >
                  Impact Factors
                </Heading>
              </Flex>
              <Text color={{ base: "slate.600", _dark: "gray.300" }} mb="4">
                BMC Bioinformatics special issue journal impact factors:
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                }}
                gap="3"
              >
                {impactFactors.map((item) => (
                  <Flex
                    key={item.year}
                    p="4"
                    bg={{ base: "white", _dark: "gray.900" }}
                    rounded="xl"
                    borderWidth="1px"
                    borderColor={{ base: "slate.200", _dark: "gray.700" }}
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      color={{ base: "slate.600", _dark: "gray.300" }}
                      fontWeight="medium"
                    >
                      {item.year}
                    </Text>
                    <Text
                      color={{ base: "red.700", _dark: "red.400" }}
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {item.factor}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

const publications = [
  { year: 2004, url: "https://www.liebertpub.com/toc/dna/23/10" },
  {
    year: 2005,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-6-S2-S1",
  },
  {
    year: 2006,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-7-S2-S1",
  },
  {
    year: 2007,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-8-S7-S1",
  },
  {
    year: 2008,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-9-S9-S1",
  },
  {
    year: 2009,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-10-supplement-11",
  },
  {
    year: 2010,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-S6-S1",
  },
  {
    year: 2011,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-12-S10-S1",
  },
  {
    year: 2012,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-13-S15-S1",
  },
  {
    year: 2013,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-14-supplement-14",
  },
  {
    year: 2014,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-15-supplement-11",
  },
  {
    year: 2015,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-16-supplement-13",
  },
  {
    year: 2016,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-17-supplement-13",
  },
  {
    year: 2017,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-18-supplement-14",
  },
  {
    year: 2018,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2618-7",
  },
  {
    year: 2019,
    url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-020-03580-9",
  },
];

const impactFactors = [
  { year: 2004, factor: "6.0" },
  { year: 2006, factor: "6.2" },
  { year: 2007, factor: "5.35" },
  { year: 2008, factor: "5.35" },
  { year: 2009, factor: "5.5" },
  { year: 2010, factor: "4.45" },
];
