// get serverside props here with videos and whatnot. Profile info updates and video content

import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Image,
  Spinner,
  Stack,
  Text,
  useTimeout,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

// import Image from "next/image";
export default function PaymentConfirmation() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    fetch(`/api/checkout?session_id=${router.query.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .finally(() => setLoading(false));
  }, 500);

  // if (status === "open") {
  //   return redirect("/dashboard");
  // }

  return (
    <>
      <Head>
        <title>MCBIOS | Due Confirmation</title>
        <meta content="MCBIOS Due Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <Container>
        <Center h="md" mt={5}>
          {loading && <Spinner size="lg" />}
          {!loading && (
            <Stack gap={5}>
              <Image
                className="mx-auto object-cover"
                src="/images/logo.jpg"
                alt="MCBIOS Logo"
                style={{
                  maskImage:
                    "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
                }}
              />
              {/* Dynamic message */}
              {status === "complete" ? (
                <Text>
                  Thank you for your contribution to the society! A confirmation
                  email will be sent to - {customerEmail}.
                </Text>
              ) : (
                <Text>
                  Something went wrong while submitting your payment. Click the{" "}
                  <span className="text-green-900">
                    &quot;My dues are paid&quot;
                  </span>{" "}
                  button on the Member Dashboard and we&apos;ll confirm your
                  membership ass soon as possible.
                </Text>
              )}
              <Button
                mx="auto"
                colorScheme="teal"
                leftIcon={<ChevronLeftIcon />}
                onClick={() => router.push("/dashboard")}
              >
                Member Dashboard
              </Button>
              <Text>
                If you have any questions, please email{" "}
                <a
                  className="underline text-blue-800"
                  href="mailto:support@mcbios.com"
                >
                  support@mcbios.com
                </a>
                .
              </Text>
            </Stack>
          )}
        </Center>
      </Container>
    </>
  );
}
