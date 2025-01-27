"use client";

import { Box, Heading, Stack } from "@chakra-ui/react";
import { Speaker } from "./KeynoteSpeakers";

export default function TutorialSpeakers() {
  return (
    <Box
      w="full"
      py="20"
      bgGradient="linear(to-bl, whiteAlpha.200, whiteAlpha.400, orange.100, blue.300)"
    >
      <Heading size="2xl" mb={38} color="blue.700" textAlign="center">
        Tutorial Speakers
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        spacing={10}
        mx="auto"
        justifyItems="center"
        alignItems="start"
        alignContent="center"
        justifyContent="center"
      >
        <Speaker
          name="Rebecca Barter, Ph.D."
          photo="/tutorial/Rebecca.jpg"
          title="Research Assistant Professor"
          program={["Topic: Using AI to Code"]}
          affiliation="Division of Epidemiology, Department of Internal Medicine, University of Utah"
          url="https://rebeccabarter.com/"
        />
        <Speaker
          name="Devin Lange, Ph.D."
          photo="/tutorial/Devin.jpg"
          title="Research Fellow"
          program={["Topic: Interactive Visualization of Complex Data"]}
          affiliation="Biomedical Informatics Harvard Medical School"
          url="https://www.devinlange.com/"
        />
      </Stack>
    </Box>
  );
}
