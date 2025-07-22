import { NAV_ITEMS } from "@/lib/constants";
import {
  Box,
  Heading,
  HStack,
  Link as ChakraLink,
  Separator,
} from "@chakra-ui/react";
import NextLink from "next/link";

type NavbarProps = {
  underConstruction?: boolean;
};

export default function Navbar({ underConstruction }: NavbarProps) {
  return (
    <Box
      w="full"
      py={4}
      px={[0, null, null, 5]}
      bgImage="linear-gradient(120deg, {colors.secondary.800}, {colors.secondary.600}, {colors.secondary.600}, {colors.accent.50})"
      color="text"
      spaceY={3}
    >
      <Heading
        size={["xl", null, "2xl", "3xl"]}
        textAlign={["center", null, null, "start"]}
        userSelect="none"
        backgroundClip="text"
        color="transparent"
        bgGradient="to-tl"
        gradientTo="secondary.500"
        gradientFrom="primary.200"
        _hover={
          {
            // gradientFrom: "accent.800",
            // gradientTo: "secondary.700",
          }
        }
      >
        MCBIOS 2026
      </Heading>
      <Separator colorPalette="white" ml={-3} />
      <HStack
        hidden={underConstruction}
        display="none"
        lg={{
          display: "flex",
        }}
        justifyContent="start"
        alignItems="start"
        gap={5}
      >
        {NAV_ITEMS.map((item, idx) => (
          <Heading key={idx} size={"md"}>
            <ChakraLink
              asChild
              // backgroundClip="text"
              // color="transparent"
              // bgGradient="to-tl"
              // gradientTo="primary.600"
              // gradientFrom="secondary.500"
              _hover={{
                textDecoration: "underline",
                // color: "secondary.300",
                backgroundClip: "text",
                color: "transparent",
                bgGradient: "to-tl",
                gradientTo: "primary.600",
                gradientFrom: "secondary.500",
                // textDecorationStyle: "solid",
                // textDecorationColor: "primary.600",
              }}
            >
              <NextLink href={item.path}>{item.name}</NextLink>
            </ChakraLink>
          </Heading>
        ))}
      </HStack>
    </Box>
  );
}
