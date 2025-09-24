import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Input,
  Link,
  Separator,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

export function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Speakers", href: "#speakers" },
    { name: "Schedule", href: "#schedule" },
    { name: "Registration", href: "#registration" },
  ];

  const resources = [
    { name: "Call for Papers", href: "#" },
    { name: "Travel Information", href: "#" },
    { name: "Accommodation", href: "#" },
    { name: "Sponsorship", href: "#" },
  ];

  const socialLinks = [
    { icon: BsTwitter, href: "#", name: "Twitter" },
    { icon: BsLinkedin, href: "#", name: "LinkedIn" },
    { icon: BsFacebook, href: "#", name: "Facebook" },
  ];

  return (
    <Box
      as="footer"
      bg="maroon.900"
      color="offWhite.50"
      position="relative"
      overflow="hidden"
    >
      {/* Art Deco Background Pattern */}
      <Box position="absolute" inset={0} opacity={0.1}>
        <Box
          h="full"
          w="full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #d4af37 25%, transparent 25%),
              linear-gradient(-45deg, #d4af37 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #d4af37 75%),
              linear-gradient(-45deg, transparent 75%, #d4af37 75%)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
          }}
        />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={10}>
        {/* Main Footer Content */}
        <Box py={16}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={8}
          >
            {/* Conference Info */}
            <VStack gap={6} align="stretch">
              <HStack gap={3}>
                <Box
                  w={12}
                  h={12}
                  bgGradient="linear(to-br, gold.500, bronze.500)"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="maroon.900" fontWeight="medium" fontSize="xl">
                    M
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" color="offWhite.50">
                    MCBios 2026
                  </Heading>
                  <Text color="rgba(249, 242, 235, 0.8)" fontSize="sm">
                    Florida Conference
                  </Text>
                </Box>
              </HStack>

              <Text color="rgba(249, 242, 235, 0.8)" lineHeight="relaxed">
                The premier gathering bridging data, AI, and innovation to
                transform health, fostering collaboration between researchers,
                clinicians, and technologists.
              </Text>

              <VStack gap={3} align="stretch">
                <HStack gap={2} color="rgba(249, 242, 235, 0.8)">
                  <Icon as={Calendar} boxSize={4} color="gold.500" />
                  <Text>March 15-17, 2026</Text>
                </HStack>
                <HStack gap={2} color="rgba(249, 242, 235, 0.8)">
                  <Icon as={MapPin} boxSize={4} color="gold.500" />
                  <Text>Miami, Florida</Text>
                </HStack>
                <HStack gap={2} color="rgba(249, 242, 235, 0.8)">
                  <Icon as={Users} boxSize={4} color="gold.500" />
                  <Text>500+ Expected Attendees</Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Quick Links */}
            <VStack gap={6} align="stretch">
              <Heading as="h4" size="md" color="gold.500">
                Quick Links
              </Heading>
              <VStack gap={3} align="stretch">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color="rgba(249, 242, 235, 0.8)"
                    _hover={{
                      color: "gold.500",
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.3s"
                  >
                    {link.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Resources */}
            <VStack gap={6} align="stretch">
              <Heading as="h4" size="md" color="gold.500">
                Resources
              </Heading>
              <VStack gap={3} align="stretch">
                {resources.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    color="rgba(249, 242, 235, 0.8)"
                    _hover={{
                      color: "gold.500",
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.3s"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Text>{link.name}</Text>
                    <Icon as={ExternalLink} boxSize={3} />
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Contact & Social */}
            <VStack gap={6} align="stretch">
              <Heading as="h4" size="md" color="gold.500">
                Contact
              </Heading>

              <VStack gap={4} align="stretch">
                <HStack gap={3} color="rgba(249, 242, 235, 0.8)">
                  <Icon as={Mail} boxSize={4} color="gold.500" />
                  <Link
                    href="mailto:info@mcbios2026.org"
                    _hover={{ color: "gold.500" }}
                    transition="colors 0.3s"
                  >
                    info@mcbios2026.org
                  </Link>
                </HStack>
                <HStack gap={3} color="rgba(249, 242, 235, 0.8)">
                  <Icon as={Phone} boxSize={4} color="gold.500" />
                  <Link
                    href="tel:+1-555-MCBIOS"
                    _hover={{ color: "gold.500" }}
                    transition="colors 0.3s"
                  >
                    +1 (555) MCBIOS
                  </Link>
                </HStack>
              </VStack>

              <VStack gap={4} align="stretch">
                <Heading as="h5" size="sm" color="gold.500">
                  Follow Us
                </Heading>
                <HStack gap={3}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      asChild
                      aria-label={social.name}
                      icon={<Icon as={social.icon} boxSize={5} />}
                      bg="rgba(249, 242, 235, 0.1)"
                      color="offWhite.50"
                      _hover={{
                        bg: "rgba(212, 175, 55, 0.2)",
                        color: "gold.500",
                        transform: "scale(1.1)",
                      }}
                      transition="all 0.3s"
                      borderRadius="lg"
                      size="md"
                    >
                      <a href={social.href}>{}</a>
                    </IconButton>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </Grid>
        </Box>

        <Separator borderColor="rgba(249, 242, 235, 0.2)" />

        {/* Newsletter Signup */}
        <Box py={8}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={6}
          >
            <Box>
              <Heading as="h4" size="md" color="gold.500" mb={2}>
                Stay Updated
              </Heading>
              <Text color="rgba(249, 242, 235, 0.8)">
                Get the latest news and updates about MCBios 2026
              </Text>
            </Box>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={3}
              w={{ base: "full", md: "auto" }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                bg="rgba(249, 242, 235, 0.1)"
                border="1px solid"
                borderColor="rgba(249, 242, 235, 0.2)"
                color="offWhite.50"
                _placeholder={{ color: "rgba(249, 242, 235, 0.6)" }}
                _focus={{ borderColor: "gold.500" }}
                minW={{ base: "full", sm: "256px" }}
              />
              <Button
                bg="gold.500"
                color="maroon.900"
                _hover={{ bg: "bronze.500" }}
                fontWeight="medium"
                px={6}
              >
                Subscribe
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Separator borderColor="rgba(249, 242, 235, 0.2)" />

        {/* Bottom Footer */}
        <Box py={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={4}
            color="rgba(249, 242, 235, 0.6)"
            fontSize="sm"
          >
            <HStack gap={4} flexWrap="wrap">
              <Text>© 2026 MCBios Conference. All rights reserved.</Text>
              <Badge
                variant="outline"
                borderColor="rgba(212, 175, 55, 0.5)"
                color="gold.500"
                fontWeight="medium"
              >
                Art Deco Design
              </Badge>
            </HStack>
            <HStack gap={6}>
              <Link
                href="#"
                _hover={{ color: "gold.500" }}
                transition="colors 0.3s"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                _hover={{ color: "gold.500" }}
                transition="colors 0.3s"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                _hover={{ color: "gold.500" }}
                transition="colors 0.3s"
              >
                Code of Conduct
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
