import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      w="80%"
      mx="auto"
      as={Stack}
      divider={<StackDivider borderColor="gray.500" />}
      rowGap={5}
    >
      <Stack
        direction={["column", null, null, "row"]}
        spacing={75}
        justify="center"
      >
        <Image
          src="/images/logo.jpg"
          alt="MCBIOS Logo"
          objectFit="cover"
          sx={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <Box w={[300, null, null, "25%"]} m="auto">
          <Heading as="h3" fontFamily="DM Sans" fontSize="5xl">
            MCBIOS
          </Heading>
          <Text as="p">
            MidSouth Computational Biology and Bioinformatics Society
          </Text>
        </Box>
      </Stack>
      <Box>
        <Heading as="h6">Greeting from the MCBIOS President:</Heading>
        <Card size="lg" boxShadow="xl">
          <CardHeader>(Card Header)</CardHeader>
          <CardBody>(Card Body)</CardBody>
          <CardFooter>(Card Footer)</CardFooter>
        </Card>
      </Box>
    </Box>
  );
}
