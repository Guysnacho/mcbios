import { PaymentAnalyticsTrigger } from "@/components/payment/PaymentAnalyticsTrigger";
import { PageViewTracker } from "@/components/PageViewTracker";
import { Events } from "@/lib/constants";
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

  // Fetch the checkout session from the Conference Suite (payment is on the
  // org's Stripe Connect account; the suite's webhook applies it)
  const suiteUrl =
    process.env.NEXT_PUBLIC_SUITE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://www.conferencesuite.net");
  const { customer_email, status } = await fetch(
    `${suiteUrl}/api/stripe/registration-checkout?org_id=${process.env.NEXT_PUBLIC_ORG_ID}&session_id=${encodeURIComponent(id)}`,
    { cache: "no-store" },
  )
    .then(async (res) =>
      res.ok
        ? ((await res.json()) as {
            status: "open" | "complete" | "expired" | null;
            customer_email: string | null;
          })
        : { status: null, customer_email: null },
    )
    .catch(() => ({ status: null, customer_email: null }));

  const isComplete = status === "complete";

  return (
    <Container maxW="lg" py={10}>
      <PageViewTracker event={Events.NAV.PAYMENT} />
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

          {isComplete && <PaymentAnalyticsTrigger />}

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
                    {customer_email
                      ? customer_email + "."
                      : "the provided email."}
                  </Text>
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
