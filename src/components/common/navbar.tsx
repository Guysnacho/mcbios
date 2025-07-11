import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading, HStack, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box w="full" color="green" spaceY={5}>
      <Heading size={"3xl"} textAlign="center">
        MCBIOS 2026
      </Heading>
      <HStack justifyContent="center" alignItems="center" gap="10">
        {NAV_ITEMS.map((item, idx) => (
          <Heading key={idx} colorPalette="blue" size={"md"}>
            <Link variant="underline" href={item.path}>
              {item.name}
            </Link>
          </Heading>
        ))}
      </HStack>
    </Box>
  );
}
