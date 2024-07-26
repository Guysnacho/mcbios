"use client";

import { ConfYears, PathMap } from "@/utils/constants";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

export const Nav = () => {
  const path = usePathname();

  const keys = Object.keys(PathMap);
  const values = Object.values(PathMap);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);

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
        <p className="font-bold text-2xl">MCBIOS</p>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4 h-16" justify="center">
        {keys.map((route) =>
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
                  onClick={() => setAuthOpen(true)}
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
      </NavbarContent>
      <NavbarContent className="md:hidden h-16" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarMenu about="Conference List">
        {values.map((item, index) =>
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
                <DropdownItem onClick={() => setAuthOpen(true)}>
                  Sign In
                </DropdownItem>
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
      <AuthModal isOpen={isAuthOpen} setIsOpen={setAuthOpen} />
    </Navbar>
  );
};
