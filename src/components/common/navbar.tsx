import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading, HStack, Link } from "@chakra-ui/react";

type NavbarProps = {
  underConstruction?: boolean;
};

export default function Navbar({ underConstruction }: NavbarProps) {
  return (
    <Box
      position="absolute"
      zIndex="max"
      w="full"
      py={8}
      bg="background.100"
      shadow="xs"
      borderBottomRadius="4xl"
      color="text"
      spaceY={5}
      bgGradient="to-tl"
      gradientFrom="secondary.100"
      gradientTo="primary.200"
    >
      <Heading
        // <p class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent ...">
        size={["xl", null, "2xl", "7xl"]}
        textAlign="center"
        userSelect="none"
        backgroundClip="text"
        color="transparent"
        bgGradient="to-tl"
        gradientFrom="primary.600"
        gradientTo="secondary.500"
        _hover={{
          gradientFrom: "accent.800",
          gradientTo: "secondary.700",
        }}
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
