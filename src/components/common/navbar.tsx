import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading, HStack, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box w="full" color="green">
      <Heading size={"3xl"}>MCBIOS 2026</Heading>
      <HStack justifyContent="center" alignItems="center" gap="10">
        {NAV_ITEMS.concat(
          NAV_ITEMS,
          NAV_ITEMS,
          NAV_ITEMS
        ).map((item, idx) => (
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
