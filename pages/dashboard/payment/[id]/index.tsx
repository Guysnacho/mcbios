// get serverside props here with videos and whatnot. Profile info updates and video content

import { Container, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PaymentConfirmation() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/api/checkout?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  // if (status === "open") {
  //   return redirect("/dashboard");
  // }

  return (
    <Container>
      <Head>
        <title>MCBIOS Due Confirmation</title>
        <meta content="MCBIOS Due Confirmation | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      {status === "complete" ? (
        <Stack gap={5}>
          <Text>
            Thank you for your contribution to the society! A confirmation email
            will be sent to {customerEmail}.
          </Text>
          <Text>Payment ID: {router.query.id}</Text>
          <Text>
            If you have any questions, please email{" "}
            <a href="mailto:mcbios.society@gmail.com">
              mcbios.society@gmail.com
            </a>
            .
          </Text>
        </Stack>
      ) : (
        <Text>Something awkward went wrong</Text>
      )}
    </Container>
  );
}
