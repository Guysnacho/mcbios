import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Stripe from "stripe";

export const metadata: Metadata = {
  title:
    "MCBIOS Payment Confirmation | MidSouth Computational Biology and Bioinformatics Society",
  description: "MCBIOS is a non-profit organization founded in 2003.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Fetch customer session
  const { customer_email, status } = await fetch(
    `${protocol}://${host}/checkout`,
    {
      method: "GET",
      headers: {
        session_id: id,
      },
    },
  ).then(async (res) => {
    return (await res.json()) as {
      status: Stripe.Checkout.Session.Status;
      customer_email: Stripe.Checkout.Session.CustomerDetails["email"];
    };
  });

  const isComplete = status === "complete";

  return (
    <Container maxW="lg" py={10}>
      <Center>
        <Stack gap={6} textAlign="center">
          {/* Logo */}
          <Box>
            <Image
              src="/images/logo.jpg"
              alt="MCBIOS Logo"
              mx="auto"
              style={{
                maskImage:
                  "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            />
          </Box>

          {/* Title */}
          <Heading size="lg">
            {isComplete ? "Payment Confirmed" : "Payment Issue"}
          </Heading>

          {/* Status Message */}
          <Alert.Root
            status={isComplete ? "success" : "error"}
            variant="subtle"
            textAlign="left"
          >
            <Alert.Description>
              {isComplete ? (
                <>
                  Thank you for your contribution to the society! A confirmation
                  email has been sent to{" "}
                  <Text as="span" fontWeight="medium">
                    {customer_email}
                  </Text>
                  .
                </>
              ) : (
                <>
                  Something went wrong while verifying your payment. Please
                  confirm your transaction history and allow some time before
                  attempting another purchase.
                </>
              )}
            </Alert.Description>
          </Alert.Root>

          {/* Navigation */}
          <Link href="/" asChild>
            <Button mx="auto" colorPalette="teal" variant="solid" gap={2}>
              <ChevronLeft size={18} />
              Home
            </Button>
          </Link>

          {/* Support */}
          <Text fontSize="sm">
            If you have any questions, please email{" "}
            <Link
              href="mailto:team@tunjiproductions.com"
              color="blue.600"
              textDecoration="underline"
            >
              team@tunjiproductions.com
            </Link>
            .
          </Text>
        </Stack>
      </Center>
    </Container>
  );
}
