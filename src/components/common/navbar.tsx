import { ConfYears, NAV_ITEMS } from "@/lib/constants";
import {
  Box,
  Link as ChakraLink,
  Heading,
  HStack,
  IconButton,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { PiList } from "react-icons/pi";
import {
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

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
              color="white"
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
        <MobileDrawer underConstruction={underConstruction} />
      </HStack>
    </Box>
  );
}

const MobileDrawer = ({ underConstruction }: NavbarProps) => {
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

      <DrawerContent background="blackAlpha.950">
        <DrawerCloseTrigger />

        <DrawerHeader>
          <DrawerTitle color="white">
            MidSouth Computational Biology and Bioinformatics Society
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody spaceY={3}>
          {(underConstruction
            ? NAV_ITEMS.filter(
                (item) =>
                  item.name.toLowerCase().includes("home") ||
                  item.name.toLowerCase().includes("conference")
              )
            : NAV_ITEMS
          ).map((item) =>
            item.path === "/conferences" ? (
              <Box key={item.name} pb={6}>
                <Heading mb={3} color="white">
                  Conferences
                </Heading>
                <Stack
                  as="ul"
                  listStyleType="circle"
                  listStylePosition="inside"
                >
                  {ConfYears.map((conference) => (
                    <Link
                      asChild
                      color="white"
                      key={conference.year}
                      _marker={{ color: "white" }}
                      _hover={{
                        textDecoration: "underline",
                        backgroundClip: "text",
                        color: "transparent",
                        bgGradient: "to-tl",
                        gradientTo: "primary.200",
                        gradientFrom: "secondary.400",
                      }}
                    >
                      <NextLink href={conference.url} target="_blank">
                        <li>MCBIOS {conference.year}</li>
                      </NextLink>
                    </Link>
                  ))}
                </Stack>
              </Box>
            ) : (
              <Box key={item.name}>
                <Link
                  asChild
                  color="white"
                  _hover={{
                    textDecoration: "underline",
                    backgroundClip: "text",
                    color: "transparent",
                    bgGradient: "to-tl",
                    gradientTo: "primary.200",
                    gradientFrom: "secondary.400",
                  }}
                >
                  <NextLink href={item.path}>
                    <Heading textAlign="center">{item.name}</Heading>
                  </NextLink>
                </Link>
              </Box>
            )
          )}
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};
