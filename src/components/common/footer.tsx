"use client";
import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading, HStack, Link } from "@chakra-ui/react";

type NavbarProps = {
  underConstruction?: boolean;
};

export default function Footer({ underConstruction }: NavbarProps) {
  return (
    <Box
      position="absolute"
      zIndex="skipNav"
      mt={10}
      w="full"
      py={8}
      bg="background.100"
      shadow="xs"
      borderTopRadius="4xl"
      color="text"
      spaceY={5}
    >
      <Heading
        size={["xl", null, "2xl", "4xl"]}
        textAlign="center"
        userSelect="none"
        color="text"
      >
        Footer
      </Heading>
      <Heading
        size={["xl", null, "2xl", "4xl"]}
        textAlign="center"
        userSelect="none"
        color="text"
      >
        Footer
      </Heading>
      <Heading
        size={["xl", null, "2xl", "4xl"]}
        textAlign="center"
        userSelect="none"
        color="text"
      >
        Footer
      </Heading>
    </Box>
  );
}
