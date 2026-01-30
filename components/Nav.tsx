"use client";

import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { ConfYears } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, X, Menu as MenuIcon, ArrowRight } from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Popover,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Leadership",
    href: "/leadership",
  },
  {
    label: "Membership",
    href: "/membership",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Conferences",
    children: [...ConfYears].reverse().map((conference) => ({
      label: "MCBIOS " + conference.year,
      href: conference.url,
    })),
  },
  {
    label: "Publications",
    href: "/publications",
  },
];

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const client = createClient();
  const router = useRouter();
  const path = usePathname();
  const store = useStore(useUserStore, (store) => store);

  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogout = () => {
    client.auth.signOut({ scope: "global" }).finally(() => {
      store?.setId();
      router.push("/");
    });
  };

  const handleOpen = (isSignUp: boolean) => {
    setIsSignUp(isSignUp);
    if (store?.id) {
      router.push("/dashboard");
    } else {
      setAuthOpen(true);
    }
  };

  const isActive = (href?: string) => {
    if (!href || !path) return false;
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      _dark={{ bg: "gray.900" }}
    >
      <AuthModal
        isSignUp={isSignUp}
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        setIsSignUp={setIsSignUp}
      />

      {/* Main Nav Bar */}
      <Container maxW="7xl">
        <Flex minH="70px" py={3} align="center" justify="space-between">
          {/* Logo */}
          <Link
            asChild
            fontFamily="heading"
            fontWeight={700}
            fontSize="xl"
            color="gray.900"
            _dark={{ color: "white" }}
            _hover={{ textDecoration: "none" }}
          >
            <NextLink href="/">
              <Flex align="center" gap={2}>
                <Image
                  src="/images/logo.jpg"
                  alt="MCBIOS"
                  h="40px"
                  w="auto"
                  borderRadius="md"
                />
              </Flex>
            </NextLink>
          </Link>

          {/* Desktop Navigation */}
          <Flex display={{ base: "none", lg: "flex" }} align="center" gap={1}>
            {NAV_ITEMS.map((navItem) => (
              <Box key={navItem.label}>
                {navItem.children ? (
                  <Popover.Root positioning={{ placement: "bottom-start" }}>
                    <Popover.Trigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        fontWeight={500}
                        color={isActive(navItem.href) ? "red.700" : "gray.700"}
                        _dark={{
                          color: isActive(navItem.href)
                            ? "red.400"
                            : "gray.200",
                        }}
                        _hover={{ bg: "gray.100", _dark: { bg: "gray.800" } }}
                      >
                        {navItem.label}
                        <Icon boxSize={4} ml={1}>
                          <ChevronDown />
                        </Icon>
                      </Button>
                    </Popover.Trigger>
                    <Popover.Positioner>
                      <Popover.Content
                        bg="white"
                        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                        borderRadius="lg"
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        p={2}
                        minW="200px"
                      >
                        <Stack gap={1}>
                          {navItem.children.map((child) => (
                            <Link
                              key={child.label}
                              asChild
                              display="block"
                              px={3}
                              py={2}
                              borderRadius="md"
                              fontSize="sm"
                              color="gray.700"
                              _dark={{ color: "gray.200" }}
                              _hover={{
                                bg: "red.50",
                                color: "red.700",
                                textDecoration: "none",
                                _dark: { bg: "red.900", color: "red.200" },
                              }}
                            >
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {child.label}
                              </a>
                            </Link>
                          ))}
                        </Stack>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Popover.Root>
                ) : (
                  <Link asChild>
                    <NextLink href={navItem.href ?? "#"}>
                      <Button
                        variant="ghost"
                        size="sm"
                        fontWeight={isActive(navItem.href) ? 600 : 500}
                        color={isActive(navItem.href) ? "red.700" : "gray.700"}
                        _dark={{
                          color: isActive(navItem.href)
                            ? "red.400"
                            : "gray.200",
                        }}
                        _hover={{ bg: "gray.100", _dark: { bg: "gray.800" } }}
                      >
                        {navItem.label}
                      </Button>
                    </NextLink>
                  </Link>
                )}
              </Box>
            ))}

            {/* User Menu */}
            {store && store.id ? (
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button
                    ml={2}
                    rounded="full"
                    variant="ghost"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar.Root size="sm">
                      <Avatar.Image src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75" />
                      <Avatar.Fallback>U</Avatar.Fallback>
                    </Avatar.Root>
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="dashboard" asChild>
                    <NextLink href="/dashboard">Dashboard</NextLink>
                  </MenuItem>
                  <MenuItem
                    value="logout"
                    onClick={handleLogout}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log Out
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            ) : (
              <Flex>
                <Button
                  ml={4}
                  size="sm"
                  bg="red.700"
                  color="white"
                  fontWeight={600}
                  _hover={{ bg: "red.800" }}
                  onClick={() => handleOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  ml={4}
                  size="sm"
                  bg="red.700"
                  color="white"
                  fontWeight={600}
                  _hover={{ bg: "red.800" }}
                  onClick={() => handleOpen(true)}
                >
                  Sign Up
                </Button>
              </Flex>
            )}
          </Flex>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={() => setIsOpen(true)}
            variant="ghost"
            aria-label="Open Navigation"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <MenuIcon size={24} />
          </IconButton>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="end"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            bg="white"
            _dark={{ bg: "gray.900" }}
            maxW="100vw"
            w="full"
          >
            <Drawer.Header
              borderBottomWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              <Flex justify="space-between" align="center" w="full">
                <Image
                  src="/images/logo.jpg"
                  alt="MCBIOS"
                  h="40px"
                  w="auto"
                  borderRadius="md"
                />
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    variant="ghost"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={24} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <Stack gap={0}>
                {NAV_ITEMS.map((navItem) => (
                  <MobileNavItem
                    key={navItem.label}
                    {...navItem}
                    isActive={isActive(navItem.href)}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </Stack>

              <Stack p={4} gap={3} mt={4}>
                {/* <Button
                  w="full"
                  size="lg"
                  bg="red.700"
                  color="white"
                  fontWeight={600}
                  _hover={{ bg: "red.800" }}
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/events");
                  }}
                >
                  Register Now
                </Button> */}

                {/* <Button
                  w="full"
                  size="lg"
                  bg="red.800"
                  color="white"
                  fontWeight={600}
                  _hover={{ bg: "red.900" }}
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/events");
                  }}
                >
                  Register for 2026
                  <ArrowRight size={18} />
                </Button> */}

                <Button
                  w="full"
                  size="lg"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.700"
                  _dark={{ borderColor: "gray.600", color: "gray.200" }}
                  fontWeight={500}
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/about");
                  }}
                >
                  Learn More
                </Button>

                {store && store.id ? (
                  <>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      color="red.600"
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        handleOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      w="full"
                      size="lg"
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        handleOpen(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

interface MobileNavItemProps extends NavItem {
  isActive: boolean;
  onClose: () => void;
}

const MobileNavItem = ({
  label,
  children,
  href,
  isActive,
  onClose,
}: MobileNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  if (children) {
    return (
      <Box>
        <Flex
          as="button"
          w="full"
          px={6}
          py={4}
          justify="space-between"
          align="center"
          bg={isExpanded ? "gray.50" : "transparent"}
          _dark={{
            bg: isExpanded ? "gray.800" : "transparent",
            borderColor: "gray.800",
          }}
          _hover={{ bg: "gray.50", _dark: { bg: "gray.800" } }}
          onClick={() => setIsExpanded(!isExpanded)}
          borderBottomWidth="1px"
          borderColor="gray.100"
        >
          <Text
            fontWeight={600}
            fontSize="md"
            textTransform="uppercase"
            letterSpacing="wide"
            color="gray.800"
            _dark={{ color: "gray.100" }}
          >
            {label}
          </Text>
          <Icon
            boxSize={5}
            color="gray.500"
            transition="transform 0.2s"
            transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <ChevronDown />
          </Icon>
        </Flex>
        {isExpanded && (
          <Stack gap={0} bg="gray.50" _dark={{ bg: "gray.800" }} pl={6}>
            {children.map((child) => (
              <Link
                key={child.label}
                asChild
                display="block"
                px={4}
                py={3}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.300", borderColor: "gray.700" }}
                _hover={{ color: "red.700", _dark: { color: "red.400" } }}
                borderBottomWidth="1px"
                borderColor="gray.100"
              >
                <a href={child.href} target="_blank" rel="noopener noreferrer">
                  {child.label}
                </a>
              </Link>
            ))}
          </Stack>
        )}
      </Box>
    );
  }

  return (
    <Flex
      as="button"
      w="full"
      px={6}
      py={4}
      justify="flex-start"
      align="center"
      bg={isActive ? "red.50" : "transparent"}
      _dark={{
        bg: isActive ? "red.900" : "transparent",
        borderColor: "gray.800",
      }}
      _hover={{ bg: "gray.50", _dark: { bg: "gray.800" } }}
      onClick={() => {
        onClose();
        if (href) router.push(href);
      }}
      borderBottomWidth="1px"
      borderColor="gray.100"
    >
      <Text
        fontWeight={600}
        fontSize="md"
        textTransform="uppercase"
        letterSpacing="wide"
        color={isActive ? "red.700" : "gray.800"}
        _dark={{ color: isActive ? "red.400" : "gray.100" }}
      >
        {label}
      </Text>
    </Flex>
  );
};
