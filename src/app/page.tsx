import { Box, Card, Heading, Image, Stack, Text } from "@chakra-ui/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <Stack>
      <Image
        position="absolute"
        zIndex="revert-layer"
        asChild
        width={3600}
        top={0}
        left={0}
        my={16}
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
          height={800}
        />
      </Image>

      <Box
        h={[500, null, 600, 700]}
        w="full"
        alignContent="center"
        zIndex="modal"
      >
        <Card.Root w={["11/12", null, "2/3", "1/3"]} mx="auto">
          <Card.Body color="accent.100">
            <Heading>Under Construction</Heading>
            <Text>
              Check in soon for informational updates on this year&apos;s
              iteration of MCBIOS.
            </Text>
          </Card.Body>
        </Card.Root>
        {/* <Box bg="gray" borderRadius="lg" m="auto" h="fit-content" w="1/2"></Box> */}
      </Box>
    </Stack>
  );
}
