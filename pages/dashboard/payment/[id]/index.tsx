// get serverside props here with videos and whatnot. Profile info updates and video content

import { Container, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function PaymentConfirmation() {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>MCBIOS Videos</title>
        <meta content="MCBIOS Videos | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <Text>Thank you for your contribution to the society!</Text>
      <Text>Payment ID: {router.query.id}</Text>
    </Container>
  );
}
