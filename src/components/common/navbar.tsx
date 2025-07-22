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
        gradientTo="secondary.300"
        gradientFrom="primary.50"
        animation="ease"
        _hover={{
          gradientTo: "secondary.600",
          gradientFrom: "primary.50",
        }}
        transition="colors 0.2s ease-in-out"
      >
        <NextLink href="/" target="_self">
          MCBIOS 2026
        </NextLink>
      </Heading>
      <Separator color="white" size="xs" borderColor="whiteAlpha.300" />
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
