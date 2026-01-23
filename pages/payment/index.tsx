// get serverside props here with videos and whatnot. Profile info updates and video content

import {
  Button,
  Center,
  Container,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

// import Image from "next/image";
export default function PaymentConfirmation() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MCBIOS | Fee Confirmation</title>
        <meta content="MCBIOS Fee Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <Container>
        <Center h="md" mt={5}>
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
            <Text>
              Not sure how you got here but no worries, we&apos;ll get you back
              to the home page.{" "}
              <Text as="span">
                If you have any questions, please email{" "}
                <a
                  className="underline text-blue-800"
                  href="mailto:team@tunjiproductions.com"
                >
                  team@tunjiproductions.com
                </a>
                .
              </Text>
            </Text>

            <Button
              mx="auto"
              colorPalette="teal"
              onClick={() => router.push("/")}
            >
              <ChevronLeft />
              Home
            </Button>
          </Stack>
        </Center>
      </Container>
    </>
  );
}
