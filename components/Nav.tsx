"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const path = usePathname();
  const pathMap = {
    "/": 0, // home
    "/leadership": 1,
    "/membership": 2,
    "/conferences": 3,
    "/events": 4,
    "/publications": 5,
    "/about": 6,
  };
  const [largeScreen] = useMediaQuery("(min-width: 875px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      w="90%"
      h={75}
      my={10}
      mx="auto"
      as={Flex}
      shadow="lg"
      boxShadow={10}
      justify="space-between"
      align="center"
    >
      <Link href="/">
        <Heading as="h4">MCBIOS</Heading>
      </Link>

      {largeScreen ? (
        <Tabs position="relative" variant="unstyled">
          <TabList gap={15}>
            <Tab>
              <Link href="/">
                <Heading as="h6">HOME</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">LEADERSHIP</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">MEMBERSHIP</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">CONFERENCES</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">EVENTS</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">PUBLICATIONS</Heading>
              </Link>
            </Tab>
            <Tab>
              <Link href="/">
                <Heading as="h6">ABOUT</Heading>
              </Link>
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue"
            borderRadius="1px"
            defaultValue={pathMap[path] || 0}
          />
        </Tabs>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="nav-menu"
            _expanded={{ shadow: "lg" }}
          >
            <HamburgerIcon fontSize="x-large" />
          </MenuButton>
          <MenuList gap={5} py={5} px={10} rounded={10} bgColor="#d3b8e0">
            <MenuItem my={6} as="a" href="/">
              HOME
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              LEADERSHIP
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              MEMBERSHIP
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              CONFERENCES
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              EVENTS
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              PUBLICATIONS
            </MenuItem>
            <Divider orientation="horizontal" />
            <MenuItem my={6} as="a" href="/">
              ABOUT
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};
