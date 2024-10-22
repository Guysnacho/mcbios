"use client";

import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const path = usePathname();
  //   const routes = Object.entries(PathMap);

  return (
    <Box
      as="footer"
      bgColor="blue.900"
      className="border-double border-t-4 border-indigo-600 mt-20"
    >
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-4">
        <div
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {/* {routes.map(([route, label]) => (
            <div key={route} className="pb-6 flex flex-col">
              <Link
                as={NextLink}
                key={route}
                href={route}
                color={path == route ? "primary" : "foreground"}
                aria-current="page"
                target="_self"
                className="text-md underline underline-offset-2 leading-6 text-white hover:text-gray-300"
              >
                {label}
              </Link>
            </div>
          ))} */}
          <Box my={5} className="pb-6 flex flex-col">
            <Link
              as={NextLink}
              href="/"
              color={path == "/" ? "primary" : "foreground"}
              aria-current="page"
              target="_self"
              className="underline underline-offset-2 leading-6 text-white hover:text-gray-300"
              fontSize="xl"
            >
              Home
            </Link>
          </Box>
        </div>
        <Text color="white" className="text-center leading-5">
          &copy; 2025 MCBIOS, All rights reserved.
        </Text>
      </div>
    </Box>
  );
};
