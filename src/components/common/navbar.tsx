"use client";
import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading, HStack, Link } from "@chakra-ui/react";

type NavbarProps = {
  underConstruction?: boolean;
};

export default function Navbar({ underConstruction }: NavbarProps) {
  return (
    <Box w="full" py={8} bg="#7a84df" color="green" spaceY={5}>
      <Heading size={["xl", null, "2xl", "4xl"]} textAlign="center">
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
