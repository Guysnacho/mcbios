"use client";

import { Box, Center, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      bg="#3a1f47"
      as={Center}
      w="100%"
      h={150}
      color={"accent"}
      display="flex"
      justifyItems="center"
      alignItems="center"
      py="auto"
    >
      <Text color="white">© 2023 MCBIOS | All Rights Reserved</Text>
    </Box>
  );
};
