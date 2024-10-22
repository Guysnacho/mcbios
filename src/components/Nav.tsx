"use client";

import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Nav() {
  const { isOpen } = useDisclosure();
  //   const supabase = createClient();
  //   const router = useRouter();
  //   const store = useStore(useUserStore, (store) => store);

  //   const [isAuthOpen, setAuthOpen] = useState(false);
  //   const [isSignUp, setIsSignUp] = useState(false);

  //   const handleLogout = () => {
  //     supabase.auth.signOut({ scope: "local" }).finally(() => {
  //       store?.setId();
  //       router.push("/");
  //     });
  //   };

  //   const handleOpen = (isSignUp: boolean) => {
  //     setIsSignUp(isSignUp);
  //     if (store?.id) {
  //       router.push("/dashboard", undefined, {
  //         shallow: false,
  //       });
  //     } else {
  //       setAuthOpen(true);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isAuthOpen === true) {
  //       const fetchUser = async () => {
  //         const { data } = await supabase.auth.getUser();
  //         if (data) {
  //           store?.setId(data.user?.id);
  //           router.push("/dashboard", undefined, {
  //             shallow: false,
  //           });
  //         } else {
  //           console.log("No user found");
  //         }
  //       };
  //       fetchUser();
  //     }
  //   }, [isAuthOpen]);

  return (
    <Box as="nav">
      {/* <AuthModal
        isSignUp={isSignUp}
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
      /> */}
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        {/* <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex> */}
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Link
            as={NextLink}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontWeight={600}
            fontSize="x-large"
            href="/"
            color={useColorModeValue("gray.800", "white")}
          >
            MCBIOS
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* {store && store.id ? (
          <Stack
            flex={{ base: 1, md: "auto" }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} href="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: "auto" }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={() => handleOpen(false)}
            >
              Sign In
            </Button>
            <Button
              display="inline-flex"
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              onClick={() => handleOpen(true)}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )} */}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} justifyItems="stretch">
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  <Link as={NextLink} href={navItem.href ?? "#"}>
                    {navItem.label}
                  </Link>
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as={Link}
      href={href}
      target="_blank"
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{
        bg: useColorModeValue("pink.50", "gray.900"),
        textDecoration: "none",
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        target={label.includes("MCBIOS ") ? "_blank" : "_self"}
        justifyContent="start"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [];
// const NAV_ITEMS: Array<NavItem> = Object.entries(PathMap).map(
//   ([route, label]) => ({ label, href: route })
// );
