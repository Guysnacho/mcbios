"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBriefcase, FaSchool } from "react-icons/fa";
import { PiLink, PiReadCvLogo, PiStudent } from "react-icons/pi";

interface SpeakerProps {
  title?: string;
  program?: string[];
  name: string;
  photo: string;
  url?: string;
  affiliation?: string;
  professional?: boolean;
}

export const Speaker = ({
  title,
  program,
  name,
  photo,
  url,
  affiliation,
  professional,
}: SpeakerProps) => {
  return (
    <Card
      maxW={["90%", "sm", "md", "xl"]}
      _hover={{ shadow: "xl", borderColor: "blue.600" }}
      mb={1}
      mx="auto"
      justifySelf="center"
      borderColor="blue.400"
      borderWidth={1}
    >
      <CardBody>
        <Image
          src={photo}
          fallbackSrc="/User.png"
          alt={`${name} from ${affiliation}`}
          w={{ base: 40, extraSmall: 50, small: 55, md: 70 }}
          boxSize="250px"
          borderRadius="lg"
          shadow="lg"
          objectFit="cover"
          mx="auto"
        />
        <Stack mt="6" spacing="3">
          <Heading
            size="md"
            color="blue.700"
            textAlign="center"
            textDecoration="underline"
          >
            {name}
          </Heading>
          {title && (
            <HStack gap={3}>
              <Icon as={PiStudent} boxSize={5} />
              <Text fontWeight={300}>{title}</Text>
            </HStack>
          )}
          {program &&
            program.map((item, idx) => (
              <HStack key={idx} gap={3}>
                <Icon as={PiReadCvLogo} boxSize={5} />
                <Text fontWeight={300}>{item}</Text>
              </HStack>
            ))}
          {affiliation && (
            <HStack gap={3}>
              <Icon as={professional ? FaBriefcase : FaSchool} boxSize={5} />
              <Text fontWeight={300}>{affiliation}</Text>
            </HStack>
          )}
        </Stack>
      </CardBody>
      {url && (
        <CardFooter>
          <ButtonGroup spacing="2" mx="auto">
            <Button
              as="a"
              href={url}
              target="_blank"
              color={"white"}
              rounded={"full"}
              alignItems="center"
              leftIcon={<PiLink />}
              bg={"blue.600"}
            >
              Link
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  );
};

export default function KeynoteSpeakers() {
  return (
    <Box
      w="full"
      py="20"
      bgGradient="linear(to-tl, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
    >
      <Heading size="2xl" mb={38} color="blue.700" textAlign="center">
        Keynote Speakers
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        spacing={10}
        mx="auto"
        justifyItems="center"
        alignItems="start"
        alignContent="center"
        alignSelf="center"
      >
        <Speaker
          name="Xihong Lin, Ph.D."
          photo="/keynote/XihongLin.png"
          title="Professor of Biostatistics"
          program={[
            "Coordinating Director",
            "Program in Quantitative Genomics",
          ]}
          affiliation="Harvard T.H. Chan School of Public Health"
        />
        <Speaker
          professional
          name="Imran Haque, Ph.D."
          photo="/keynote/ImranHaque.jpg"
          program={["Senior Vice President AI & Digital Sciences"]}
          affiliation="Recursion Pharmaceuticals"
          url="https://www.recursion.com/team-members/imran-haque"
        />

        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
      </Stack>
    </Box>
  );
}
