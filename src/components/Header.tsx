"use client"

import { useState } from "react";
import { 
  Box, 
  Flex, 
  Button, 
  Text, 
  Heading,
  Container,
  HStack,
  VStack,
  IconButton,
  Collapse,
  Link
} from '@chakra-ui/react';
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#speakers", label: "Speakers" },
    { href: "#schedule", label: "Schedule" },
    { href: "#registration", label: "Register" },
  ];

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      w="full"
      zIndex={50}
      bg="rgba(79, 23, 37, 0.95)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="rgba(212, 175, 55, 0.3)"
    >
      <Container maxW="container.xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Flex align="center" gap={3}>
            <Box
              w={12}
              h={12}
              bgGradient="linear(to-br, gold.500, bronze.500)"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="maroon.900" fontWeight="bold" fontSize="xl">
                M
              </Text>
            </Box>
            <Box>
              <Heading as="h1" color="offWhite.50" fontSize="xl">
                MCBios 2026
              </Heading>
              <Text color="rgba(249, 242, 235, 0.8)" fontSize="sm">
                Florida Conference
              </Text>
            </Box>
          </Flex>

          {/* Desktop Navigation */}
          <HStack gap={8} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                color="offWhite.50"
                _hover={{ 
                  color: "gold.500",
                  textDecoration: "none" 
                }}
                transition="all 0.3s"
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-2px",
                  left: 0,
                  width: 0,
                  height: "2px",
                  bg: "gold.500",
                  transition: "width 0.3s",
                }}
                _groupHover={{
                  width: "100%",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline"
              borderColor="gold.500"
              color="gold.500"
              _hover={{
                bg: "gold.500",
                color: "maroon.900",
              }}
            >
              Register Now
            </Button>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Toggle menu"
            icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            variant="ghost"
            color="offWhite.50"
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </Flex>

        {/* Mobile Navigation */}
        {/* <Collapse in={isMenuOpen}>
          <Box 
            mt={4} 
            pb={4} 
            borderTop="1px solid" 
            borderColor="rgba(212, 175, 55, 0.3)" 
            pt={4}
            display={{ base: "block", md: "none" }}
          >
            <VStack gap={3} align="stretch">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  color="offWhite.50"
                  _hover={{ 
                    color: "gold.500",
                    textDecoration: "none" 
                  }}
                  transition="all 0.3s"
                  py={2}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant="outline"
                borderColor="gold.500"
                color="gold.500"
                _hover={{
                  bg: "gold.500",
                  color: "maroon.900",
                }}
                mt={4}
              >
                Register Now
              </Button>
            </VStack>
          </Box>
        </Collapse> */}
      </Container>
    </Box>
  );
}