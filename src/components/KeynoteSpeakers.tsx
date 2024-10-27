"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PiLink } from "react-icons/pi";

interface SpeakerProps {
  name: string;
  photo: string;
  url?: string;
  affiliation?: string;
}

const Speaker = ({ name, photo, url, affiliation }: SpeakerProps) => {
  return (
    <Card maxW="sm" _hover={{ shadow: 5 }} mb={1} mx="auto">
      <CardBody>
        <Image
          src={photo}
          fallbackSrc="/User.png"
          alt={`${name} from ${affiliation}`}
          w={{ base: 40, extraSmall: 50, small: 55, md: 70 }}
          boxSize="xxs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" color="blue.700" textAlign="center">
            {name}
          </Heading>
          {affiliation && <Text>{affiliation}</Text>}
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
              rightIcon={<PiLink />}
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
      mx="auto"
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
        alignItems="center"
        alignContent="center"
        alignSelf="center"
      >
        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
        <Speaker name="Speaker coming soon" photo="/User.png" affiliation="" />
      </Stack>
    </Box>
  );
}
