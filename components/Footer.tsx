import { ConfYears, PathMap } from "@/lib/utils";
import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

const social = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/midsouth-computational-biology-and-bioinformatics-society/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 256 256" {...props}>
        <path
          fillRule="evenodd"
          d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Guysnacho/mcbios",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <Box
      // py={10}
      bgImage="linear-gradient(300deg, {colors.secondary.800}, {colors.secondary.300}, {colors.accent.100}, {colors.accent.50})"
    >
      <Center minH="28" width="full">
        <Stack
          direction={["column", null, null, "row"]}
          mx={[3, null, 10, 16, 20]}
          alignSelf="center"
          gap={[null, null, null, 10]}
          justifyContent="space-between"
        >
          {/* Heading Box Start */}
          <Stack
            align="center"
            justify="space-evenly"
            justifyContent="start"
            gap={10}
          >
            <Image
              width={450}
              height={250}
              // width={300}
              overflow="hidden"
              mx="auto"
              src="/images/logo.jpg"
              alt="MCBIOS Logo"
              style={{
                maskImage:
                  "linear-gradient(to left, transparent 0%, black 5%, black 95%, transparent 100%)",
              }}
            />
            <HStack
              justify="space-evenly"
              width="full"
              pb={[10, null, null, 0]}
            >
              {/* {social.map((item) => (
                <a key={item.name} href={item.href} target="_blank">
                  <Box>
                    <span className="sr-only">{item.name}</span>
                    <item.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                      color="blue.400"
                    />
                  </Box>
                </a>
              ))} */}
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black-800 hover:text-grey-600 my-auto"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </HStack>
          </Stack>
          {/* Heading Box End */}

          <Stack
            direction={["column", null, null, "row"]}
            gap={[5, null, null, 10]}
            mx="auto"
          >
            {Object.values(PathMap).map((item) =>
              item.path === "/conferences" ? (
                <Box key={item.name} pb={6}>
                  <Text mb={3}>Conferences</Text>
                  <Stack>
                    {ConfYears.map((conference) => (
                      <Link
                        as={NextLink}
                        href={conference.url}
                        key={conference.year}
                        target="_blank"
                        color="black"
                        _hover={{
                          textDecoration: "underline",
                          backgroundClip: "text",
                          color: "transparent",
                          bgGradient: "to-tl",
                          gradientTo: "primary.500",
                          gradientFrom: "secondary.600",
                        }}
                      >
                        MCBIOS {conference.year}
                      </Link>
                    ))}
                  </Stack>
                </Box>
              ) : (
                <Box key={item.name}>
                  <Link
                    as={NextLink}
                    href={item.path}
                    color="black"
                    _hover={{
                      textDecoration: "underline",
                      backgroundClip: "text",
                      color: "transparent",
                      bgGradient: "to-tl",
                      gradientTo: "primary.500",
                      gradientFrom: "secondary.800",
                    }}
                  >
                    <Text textAlign="center">{item.name}</Text>
                  </Link>
                </Box>
              )
            )}
          </Stack>

          {/* Copywrite on bottom */}
        </Stack>
      </Center>
      <Text color="black" textAlign="center">
        &copy; 2025 MidSouth Computational Biology and Bioinformatics Society.
        All rights reserved.
      </Text>
    </Box>
  );
}
