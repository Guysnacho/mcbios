"use client";

import { ConfYears } from "@/lib";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

const footerLinks = {
  society: {
    title: "Society",
    links: [
      { label: "Leadership", href: "/leadership" },
      { label: "Objectives", href: "/about" },
      { label: "Chapters", href: "/about#chapters" },
      { label: "Bylaws", href: "/about#bylaws" },
    ],
  },
  conferences: {
    title: "Conferences",
    links: [...ConfYears]
      .reverse()
      .slice(0, 8)
      .map((conf) => ({
        label: `MCBIOS ${conf.year}`,
        href: conf.url,
        external: true,
      })),
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Publications", href: "/publications" },
      { label: "Forms", href: "/forms" },
      { label: "Events", href: "/events" },
      { label: "Member Portal", href: "/dashboard" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Us", href: "mailto:contact@mcbios.org" },
      { label: "FAQ", href: "/about#faq" },
      { label: "Sponsorship", href: "/about#sponsorship" },
    ],
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/midsouth-computational-biology-and-bioinformatics-society/",
    icon: (
      <svg fill="currentColor" viewBox="0 0 256 256" width="20" height="20">
        <path
          fillRule="evenodd"
          d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Guysnacho/mcbios",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mcbios",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <Stack gap={3}>
    <Text
      fontSize="xs"
      fontWeight={600}
      textTransform="uppercase"
      letterSpacing="wider"
      color="gray.500"
    >
      {title}
    </Text>
    <Stack gap={2}>
      {links.map((link) => (
        <Link
          key={link.label}
          asChild
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          _hover={{ color: "red.700", _dark: { color: "red.400" } }}
        >
          {link.external ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ) : (
            <NextLink href={link.href}>{link.label}</NextLink>
          )}
        </Link>
      ))}
    </Stack>
  </Stack>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="gray.50"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      borderTopWidth="1px"
      borderColor={{ base: "gray.200" }}
    >
      <Container maxW="7xl" py={16}>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "2fr repeat(4, 1fr)",
          }}
          gap={{ base: 8, lg: 12 }}
        >
          {/* Brand Column */}
          <GridItem colSpan={{ base: 1, sm: 2, md: 3, lg: 1 }}>
            <Stack gap={4}>
              <Link asChild _hover={{ textDecoration: "none" }}>
                <NextLink href="/">
                  <Flex align="center" gap={3}>
                    <Image
                      src="/images/logo.jpg"
                      alt="MCBIOS"
                      h="50px"
                      w="auto"
                      borderRadius="md"
                    />
                  </Flex>
                </NextLink>
              </Link>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                maxW="280px"
              >
                The MidSouth Computational Biology and Bioinformatics Society
                (MCBIOS) is a regional society of the International Society for
                Computational Biology.
              </Text>
              <Flex gap={3} mt={2}>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    p={2}
                    borderRadius="md"
                    color="gray.500"
                    _hover={{
                      color: "red.700",
                      bg: "gray.100",
                      _dark: { color: "red.400", bg: "gray.800" },
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </Flex>
            </Stack>
          </GridItem>

          {/* Link Columns */}
          <GridItem>
            <FooterLinkGroup {...footerLinks.society} />
          </GridItem>
          <GridItem>
            <FooterLinkGroup {...footerLinks.conferences} />
          </GridItem>
          <GridItem>
            <FooterLinkGroup {...footerLinks.resources} />
          </GridItem>
          <GridItem>
            <FooterLinkGroup {...footerLinks.support} />
          </GridItem>
        </Grid>

        {/* Bottom Bar */}
        <Flex
          mt={12}
          pt={8}
          borderTopWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.800" }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={4}
        >
          <Text
            fontSize="sm"
            color="gray.500"
            textAlign={{ base: "center", md: "left" }}
          >
            &copy; {currentYear} MidSouth Computational Biology and
            Bioinformatics Society. All rights reserved.
          </Text>
          <Flex gap={6}>
            <Link
              asChild
              fontSize="sm"
              color="gray.500"
              _hover={{ color: "gray.700", _dark: { color: "gray.300" } }}
            >
              <NextLink href="/privacy">Privacy Policy</NextLink>
            </Link>
            <Link
              asChild
              fontSize="sm"
              color="gray.500"
              _hover={{ color: "gray.700", _dark: { color: "gray.300" } }}
            >
              <NextLink href="/terms">Terms of Service</NextLink>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
