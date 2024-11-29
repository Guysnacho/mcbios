"use client";

import { PathMap } from "@/lib/constants";
import { Box, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  const routes = Object.entries(PathMap);

  return (
    <Box
      as="footer"
      bgColor="blue.900"
      className="border-double border-t-4 border-indigo-600"
    >
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-7 sm:py-10 lg:px-4">
        {/* <Stack
          aria-label="Footer"
          justifyContent="center"
          direction="row"
          gap={10}
        >
          {routes.map(([route, label]) => (
            <div key={route} className="pb-6 flex flex-col">
              <Link
                as={NextLink}
                key={route}
                href={route}
                fontSize="xl"
                color={path == route ? "primary" : "foreground"}
                aria-current="page"
                target="_self"
                className="text-md underline underline-offset-2 leading-6 text-white hover:text-gray-300"
              >
                {label}
              </Link>
            </div>
          ))}
        </Stack> */}
        <Text color="white" className="text-center leading-5">
          &copy; 2025 MCBIOS, All rights reserved.
        </Text>
      </div>
    </Box>
  );
};
