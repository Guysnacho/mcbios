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
      mt={12}
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
        MCBIOS 2026
      </Heading>
      <HStack
        hidden={underConstruction}
        display="none"
        lg={{
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
        gap="10"
      >
        {NAV_ITEMS.map((item, idx) => (
          <Heading
            key={idx}
            colorPalette="blue"
            size={"md"}
            _hover={{
              textDecoration: "none",
              shadow: "lg",
            }}
          >
            <Link variant="underline" href={item.path}>
              {item.name}
            </Link>
          </Heading>
        ))}
      </HStack>
    </Box>
  );
}
