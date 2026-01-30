import {
  Button,
  Center,
  Container,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    const timer = setTimeout(() => {
      fetch(`/api/checkout?session_id=${params.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        })
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  }, [params.id]);

  return (
    <>
      <Head>
        <title>MCBIOS | Fee Confirmation</title>
        <meta content="MCBIOS Fee Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
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
                  Something went wrong while submitting your payment. Please
                  confirm your transaction history and allow time before
                  attempting another purchase.
                  {/* Click the{" "}
                  <span className="text-green-900">
                    &quot;My fees are paid&quot;
                  </span>{" "}
                  button on the Member Dashboard and we&apos;ll confirm your
                  membership as soon as possible. */}
                </Text>
              )}
              {/* <Button
                mx="auto"
                colorPalette="teal"
                onClick={() => router.push("/dashboard")}
              >
                <ChevronLeft />
                Member Dashboard
              </Button> */}
              <Button
                mx="auto"
                colorPalette="teal"
                onClick={() => router.push("/")}
              >
                <ChevronLeft />
                Home
              </Button>
              <Text>
                If you have any questions, please email{" "}
                <a
                  className="underline text-blue-800"
                  href="mailto:team@tunjiproductions.com"
                >
                  team@tunjiproductions.com
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
