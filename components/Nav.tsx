"use client";

import { ConfYears, PathMap } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthModal } from "./AuthModal";

export const Nav = () => {
  const supabase = createClient();
  const router = useRouter();
  const path = usePathname();
  const keys = Object.keys(PathMap);
  const values = Object.values(PathMap);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    supabase.auth.signOut({ scope: "local" }).finally(() => {
      setLoading(false);
      setUser(null);
      router.push("/");
    });
  };

  const handleOpen = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      setAuthOpen(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      } else {
        console.log("No user found");
      }
    };
    fetchUser();
  }, [isAuthOpen, user]);

  return (
    <Navbar
      isBordered
      as="nav"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "drop-shadow-md",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Link href="/" className="font-bold text-gray-800 text-2xl">
          MCBIOS
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4 h-16" justify="center">
        {keys
          .filter((val) => val !== "/")
          .map((route) =>
            route == "/conferences" ? (
              <Dropdown key={route}>
                <NavbarItem>
                  <DropdownTrigger className="-m-3">
                    <Button
                      disableRipple
                      className="bg-transparent data-[hover=true]:bg-transparent"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                    >
                      {PathMap["/conferences"].name}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={PathMap["/conferences"].name}
                  className="w-30"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {ConfYears.map((conference) => (
                    <DropdownItem
                      key={conference.year}
                      href={conference.url}
                      target="_self"
                      // description="ACME scales apps to meet user demand, automagically, based on load."
                    >
                      MCBIOS {conference.year}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : route == "/membership" ? (
              <Dropdown key={route}>
                <NavbarItem>
                  <DropdownTrigger className="-m-3">
                    <Button
                      disableRipple
                      className="bg-transparent data-[hover=true]:bg-transparent w-32"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                    >
                      MEMBERSHIP
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="MEMBERSHIP"
                  className="w-30"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  <DropdownItem
                    onClick={handleOpen}
                    // description="ACME scales apps to meet user demand, automagically, based on load."
                  >
                    Sign In
                  </DropdownItem>
                  <DropdownItem
                    href="/membership"
                    target="_self"
                    // description="ACME scales apps to meet user demand, automagically, based on load."
                  >
                    Registration
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarItem isActive={path == route} key={route}>
                <Link
                  //@ts-ignore
                  href={PathMap[route].path}
                  color={path == route ? "primary" : "foreground"}
                  aria-current="page"
                >
                  {/*@ts-ignore*/}
                  {PathMap[route].name}
                </Link>
              </NavbarItem>
            )
          )}
        {user ? (
          <NavbarItem isActive>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src="https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75"
                  // description={
                  //   <Link
                  //     href="https://twitter.com/jrgarciadev"
                  //     size="sm"
                  //     isExternal
                  //   >
                  //     @jrgarciadev
                  //   </Link>
                  // }
                  // avatarProps={{
                  //   src: "https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75",
                  // }}
                />
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with icons"
              >
                <DropdownItem
                  about="logout"
                  onClick={logout}
                  // startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : undefined}
      </NavbarContent>
      <NavbarContent className="md:hidden h-16" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarMenu about="Conference List">
        {values
          .filter((val) => val.path !== "/")
          .map((item, index) =>
            item.path === "/conferences" ? (
              <Dropdown key={item.name}>
                <NavbarMenuItem>
                  <DropdownTrigger>
                    <Button
                      about={item.name}
                      disableRipple
                      className="bg-transparent data-[hover=true]:bg-transparent p-0"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                    >
                      {item.name}
                    </Button>
                  </DropdownTrigger>
                </NavbarMenuItem>
                <DropdownMenu aria-label="conferences" className="w-52">
                  {ConfYears.map((conference) => (
                    <DropdownItem
                      key={conference.year}
                      href={conference.url}
                      target="_blank"
                      // description="ACME scales apps to meet user demand, automagically, based on load."
                    >
                      MCBIOS {conference.year}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : item.path === "/membership" ? (
              <Dropdown key={item.name}>
                <NavbarMenuItem>
                  <DropdownTrigger>
                    <Button
                      about={item.name}
                      disableRipple
                      className="bg-transparent data-[hover=true]:bg-transparent p-0"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                    >
                      {item.name}
                    </Button>
                  </DropdownTrigger>
                </NavbarMenuItem>
                <DropdownMenu aria-label="MEMBERSHIP" className="w-52">
                  <DropdownItem onClick={handleOpen}>Sign In</DropdownItem>
                  <DropdownItem href="/membership" target="_self">
                    Registration
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarMenuItem
                isActive={path === item.path}
                key={`${item}-${index}`}
              >
                <Link
                  color={path === item.path ? undefined : "foreground"}
                  className="w-full"
                  href={item.path}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            )
          )}
      </NavbarMenu>
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        supabase={supabase}
      />
    </Navbar>
  );
};
