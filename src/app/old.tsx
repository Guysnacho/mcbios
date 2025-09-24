import { Box, Card, Heading, Image, Separator, Text } from "@chakra-ui/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <Box>
      <Image
        position="absolute"
        zIndex="auto"
        asChild
        width={3600}
        left={0}
        // h={[500, null, 600, 700]}
        height={700}
        overflow="hidden"
        opacity={0.5}
        mx="auto"
        alt="Moffit national cancer hospital."
      >
        <NextImage
          src="/img/Moffitt.jpg"
          alt="Moffit national cancer hospital."
          width={1200}
          height={700}
        />
      </Image>

      <Box
        height={700}
        // h={[500, null, 600, 700]}
        background="url(/svg/cloud.svg)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        alignContent="center"
        zIndex="modal"
      >
        <Card.Root
          w={["11/12", "5/6", null, "2/3"]}
          mx="auto"
          bg="blackAlpha.700"
          variant="subtle"
        >
          <Card.Body textAlign="center">
            <Heading size={["xl", null, "2xl", "3xl"]} color="white">MCBIOS 2026</Heading>
            <Heading color="white">Theme Announcements Coming Soon!</Heading>
            <Separator />
            <Text fontStyle="oblique" mt={3} color="gray.50">
              The 22nd Annual Meeting of the MidSouth Computational Biology and
              Bioinformatics Society
            </Text>
          </Card.Body>
        </Card.Root>
      </Box>
    </Box>
  );
}
