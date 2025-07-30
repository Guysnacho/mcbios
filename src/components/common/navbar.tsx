import { NAV_ITEMS } from "@/lib/constants";
import {
  Box,
  Link as ChakraLink,
  Heading,
  HStack,
  IconButton,
  Separator,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { PiList } from "react-icons/pi";
import { DrawerContent, DrawerRoot, DrawerTrigger } from "../ui/drawer";

type NavbarProps = {
  underConstruction?: boolean;
};

export default function Navbar({ underConstruction }: NavbarProps) {
  return (
    <Box
      w="full"
      pt={[0, null, null, 4]}
      px={[0, null, null, 5]}
      py={5}
      bgImage="linear-gradient(120deg, {colors.secondary.800}, {colors.secondary.600}, {colors.secondary.600}, {colors.accent.50})"
      color="text"
      spaceY={[null, null, null, 3]}
    >
      <Heading
        display={["none", null, null, "block"]}
        size={["xl", null, "2xl", "3xl"]}
        textAlign={["center", null, null, "start"]}
        backgroundClip="text"
        color="transparent"
        bgGradient="to-tl"
        gradientTo="secondary.300"
        gradientFrom="primary.50"
        _hover={{
          gradientTo: "secondary.600",
          gradientFrom: "primary.50",
        }}
      >
        <NextLink href="/" target="_self">
          MCBIOS 2026
        </NextLink>
      </Heading>
      <Separator
        display={["none", null, null, "flex"]}
        color="white"
        size="xs"
        borderColor="whiteAlpha.300"
      />
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
              _hover={{
                textDecoration: "underline",
                backgroundClip: "text",
                color: "transparent",
                bgGradient: "to-tl",
                gradientTo: "primary.200",
                gradientFrom: "secondary.400",
              }}
            >
              <NextLink href={item.path}>{item.name}</NextLink>
            </ChakraLink>
          </Heading>
        ))}
      </HStack>

      <HStack
        display={["flex", null, null, "none"]}
        justifyContent="space-evenly"
        gap={10}
        m="auto"
      >
        <Text opacity={0}>_</Text>
        <Heading
          display={["unset", null, null, "none"]}
          size={["xl", null, "2xl"]}
          textAlign={["center", null, null, "start"]}
          backgroundClip="text"
          color="transparent"
          bgGradient="to-tl"
          gradientTo="secondary.300"
          gradientFrom="primary.50"
          _hover={{
            gradientTo: "secondary.600",
            gradientFrom: "primary.50",
          }}
        >
          <NextLink href="/" target="_self">
            MCBIOS 2026
          </NextLink>
        </Heading>
        <MobileDrawer />
      </HStack>
    </Box>
  );
}

const MobileDrawer = () => {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild display={["block", null, null, "none"]}>
        <IconButton
          aria-label="mobile-menu"
          size="md"
          colorPalette="pink"
          variant="subtle"
          shadow="xs"
          borderRadius="lg"
        >
          <PiList style={{ margin: "auto" }} />
        </IconButton>
      </DrawerTrigger>

      <DrawerContent></DrawerContent>
    </DrawerRoot>
  );
};
