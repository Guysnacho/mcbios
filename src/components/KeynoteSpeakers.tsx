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
  url: string;
  affiliation?: string;
}

const Speaker = ({ name, photo, url, affiliation }: SpeakerProps) => {
  return (
    <Card maxW="sm" _hover={{ shadow: 5 }} mb={1} mx="auto">
      <CardBody>
        <Image
          src={photo}
          alt={`${name} from ${affiliation}`}
          w={{ base: 40, extraSmall: 50, small: 55 }}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" color="blue.700">
            {name}
          </Heading>
          {affiliation && <Text>{affiliation}</Text>}
        </Stack>
      </CardBody>
      {url && (
        <CardFooter>
          <ButtonGroup spacing="2" mx="auto">
            <Button
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
    <Box p={4} mx="auto">
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
        <Speaker
          name="Samuel Adetunji"
          photo="https://media.licdn.com/dms/image/v2/C4E03AQFA4qZDyN1hsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1642438097060?e=1735171200&v=beta&t=vgBt253jgvc-0XqR__pHrGT2ZLq_gxp7AU7DtgLEwOs"
          url="https://tunjiproductions.com"
          affiliation="Texas Tech University"
        />
        <Speaker
          name="Samuel Adetunji"
          photo="https://media.licdn.com/dms/image/v2/C4E03AQFA4qZDyN1hsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1642438097060?e=1735171200&v=beta&t=vgBt253jgvc-0XqR__pHrGT2ZLq_gxp7AU7DtgLEwOs"
          url="https://tunjiproductions.com"
          affiliation="Texas Tech University"
        />
        <Speaker
          name="Samuel Adetunji"
          photo="https://media.licdn.com/dms/image/v2/C4E03AQFA4qZDyN1hsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1642438097060?e=1735171200&v=beta&t=vgBt253jgvc-0XqR__pHrGT2ZLq_gxp7AU7DtgLEwOs"
          url="https://tunjiproductions.com"
          affiliation="Texas Tech University"
        />
        <Speaker
          name="Samuel Adetunji"
          photo="https://media.licdn.com/dms/image/v2/C4E03AQFA4qZDyN1hsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1642438097060?e=1735171200&v=beta&t=vgBt253jgvc-0XqR__pHrGT2ZLq_gxp7AU7DtgLEwOs"
          url="https://tunjiproductions.com"
          affiliation="Texas Tech University"
        />
      </Stack>
    </Box>
  );
}
