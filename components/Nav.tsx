"use client";

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

export const Nav = () => {
  const path = usePathname();
  const pathMap = {
    "/": {
      name: "HOME",
      path: "/",
    },
    "/leadership": {
      name: "LEADERSHIP",
      path: "/leadership",
    },
    "/membership": {
      name: "MEMBERSHIP",
      path: "/membership",
    },
    "/conferences": {
      name: "CONFERENCES",
      years: [
        {
          year: 2019,
          url: "https://2019.mcbios.com",
        },
        {
          year: 2020,
          url: "https://2020.mcbios.com",
        },
        {
          year: 2022,
          url: "https://2022.mcbios.com",
        },
        {
          year: 2023,
          url: "https://2023.mcbios.com",
        },
        {
          year: 2024,
          url: "https://2024.mcbios.com",
        },
      ],
      path: "/conferences",
    },
    "/events": { name: "EVENTS", path: "/events" },
    "/publications": { name: "PUBLICATIONS", path: "/publications" },
    "/about": { name: "ABOUT", path: "/about" },
  };
  const keys = Object.keys(pathMap);
  const values = Object.values(pathMap);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<ChevronDownIcon />}
                    radius="sm"
                    variant="light"
                  >
                    {pathMap["/conferences"].name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={pathMap["/conferences"].name}
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {pathMap["/conferences"].years.map((conference) => (
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
          ) : (
            <NavbarItem isActive={path == route} key={route}>
              <Link
                //@ts-ignore
                href={pathMap[route].path}
                color={path == route ? "primary" : "foreground"}
                aria-current="page"
              >
                {/*@ts-ignore*/}
                {pathMap[route].name}
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
              <DropdownMenu
                aria-label="conferences"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {pathMap["/conferences"].years.map((conference) => (
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
    </Navbar>
  );
};
