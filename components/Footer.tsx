"use client";

import { Box, Center, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <div
      className="w-full flex justify-center align-center bg-purp"
      style={{ height: 150 }}
    >
      <p className="text-center my-auto text-white">
        © 2023 MCBIOS | All Rights Reserved
      </p>
    </div>
  );
};
