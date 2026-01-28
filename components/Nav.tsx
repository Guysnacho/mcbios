"use client";

import { useUserStore } from "@/lib/store/userStore";
import useStore from "@/lib/store/useStore";
import { ConfYears } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronDown,
  ChevronRight,
  X,
  Menu as MenuIcon,
} from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Collapsible,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthModal } from "./AuthModal";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const path = usePathname();
  const store = useStore(useUserStore, (store) => store);

  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogout = () => {
    supabase.auth.signOut({ scope: "local" }).finally(() => {
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

  useEffect(() => {
    if (isAuthOpen === true) {
      const fetchUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (data && data.user) {
          store?.setId(data.user?.id);
          router.push("/dashboard", undefined, {
            shallow: false,
          });
        } else {
          console.debug("No user found");
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthOpen, path]);

  return (
    <Box as="nav">
      <AuthModal
        isSignUp={isSignUp}
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        setIsSignUp={setIsSignUp}
      />
      <Flex
        bg={{ base: "white", _dark: "gray.900" }}
        color={{ base: "gray.600", _dark: "gray.200" }}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom="1px"
        borderStyle="solid"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={12} /> : <MenuIcon size={20} />}
          </IconButton>
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Link
            asChild
            textAlign={{ base: "center", md: "left" }}
            fontFamily="heading"
            fontWeight={600}
            fontSize="x-large"
            color={{ base: "gray.800", _dark: "white" }}
          >
            <NextLink href="/">MCBIOS</NextLink>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {store && store.id ? (
          <Stack
            flex={{ base: 1, md: "auto" }}
            justify="flex-end"
            direction="row"
            gap={6}
          >
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  rounded="full"
                  variant="ghost"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar.Root size="sm">
                    <Avatar.Image
                      src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
                    />
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
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Log Out
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: "auto" }}
            justify="flex-end"
            direction="row"
            gap={6}
          >
            <Button
              fontSize="sm"
              fontWeight={400}
              variant="ghost"
              onClick={() => handleOpen(false)}
            >
              Sign In
            </Button>
            <Button
              display="inline-flex"
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="pink.400"
              onClick={() => handleOpen(true)}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <MobileNav />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction="row" justifyItems="stretch">
      <Stack direction="row" gap={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            {navItem.children ? (
              <Popover.Root positioning={{ placement: "bottom-start" }}>
                <Popover.Trigger asChild>
                  <Box
                    p={2}
                    fontSize="sm"
                    fontWeight={500}
                    cursor="pointer"
                    color={{ base: "gray.600", _dark: "gray.200" }}
                    _hover={{
                      textDecoration: "none",
                      color: { base: "gray.800", _dark: "white" },
                    }}
                  >
                    {navItem.label}
                    <Icon boxSize={4} ml={1}>
                      <ChevronDown />
                    </Icon>
                  </Box>
                </Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content
                    border={0}
                    boxShadow="xl"
                    bg={{ base: "white", _dark: "gray.800" }}
                    p={4}
                    rounded="xl"
                    minW="sm"
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            ) : (
              <Box
                p={2}
                fontSize="sm"
                fontWeight={500}
                color={{ base: "gray.600", _dark: "gray.200" }}
                _hover={{
                  textDecoration: "none",
                  color: { base: "gray.800", _dark: "white" },
                }}
              >
                <Link asChild>
                  <NextLink href={navItem.href ?? "#"}>{navItem.label}</NextLink>
                </Link>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      asChild
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{
        bg: { base: "pink.50", _dark: "pink.900" },
        textDecoration: "none",
      }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Stack direction="row" align="center">
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize="sm">{subLabel}</Text>
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: 1, transform: "translateX(0)" }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="pink.400" boxSize={5}>
              <ChevronRight />
            </Icon>
          </Flex>
        </Stack>
      </a>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={{ base: "white", _dark: "gray.900" }} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack gap={4} onClick={children ? () => setIsOpen(!isOpen) : undefined}>
      <Link
        asChild
        py={2}
        justifyContent="start"
        _hover={{
          textDecoration: "none",
        }}
      >
        <a
          href={href ?? "#"}
          target={label.includes("MCBIOS ") ? "_blank" : "_self"}
        >
          <Flex>
            <Text fontWeight={600} color={{ base: "gray.600", _dark: "gray.200" }}>
              {label}
            </Text>
            {children && (
              <Icon
                transition="all .25s ease-in-out"
                transform={isOpen ? "rotate(180deg)" : ""}
                boxSize={6}
              >
                <ChevronDown />
              </Icon>
            )}
          </Flex>
        </a>
      </Link>

      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <Stack
            mt={2}
            pl={4}
            borderLeft="1px"
            borderStyle="solid"
            borderColor={{ base: "gray.200", _dark: "gray.700" }}
            align="start"
          >
            {children &&
              children.map((child) => (
                <Link asChild key={child.label} py={2}>
                  <a href={child.href}>{child.label}</a>
                </Link>
              ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Leadership",
    href: "/leadership",
  },
  {
    label: "Membership",
    subLabel: "Gain access to past recordings, board votes and more!",
    href: "/membership",
  },
  {
    label: "Conferences",
    children: ConfYears.reverse().map((conference) => {
      return {
        label: "MCBIOS " + conference.year,
        href: conference.url,
      };
    }),
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Publications",
    href: "/publications",
  },
  {
    label: "About",
    href: "/about",
  },
];
