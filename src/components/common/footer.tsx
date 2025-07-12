import { NAV_ITEMS } from "@/lib/constants";
import { Box, Heading } from "@chakra-ui/react";

export default function Footer() {
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
      {NAV_ITEMS.map((item) => (
        <Heading
          key={item.name}
          size={["xl", null, "2xl", "4xl"]}
          textAlign="center"
          userSelect="none"
          color="text"
        >
          {item.path}
        </Heading>
      ))}
    </Box>
  );
}
