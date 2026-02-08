import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import { Input, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

const Late = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="container space-y-10 mx-auto">
      <Head>
        <title>MCBIOS Events</title>
        <meta content="Late Registration | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <VStack>
        <h3 className="text-center my-10">Late Registration</h3>
        {password === process.env.NEXT_PUBLIC_LATE_REGISTRATION ? (
          <ConferenceRegistration />
        ) : (
          <>
            <Text>Please provide your administrator provided password</Text>
            <Input
              type="password"
              w={["85%", "75%", "45%", "lg"]}
              value={password}
              disabled
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </>
        )}
      </VStack>
    </div>
  );
};

export default Late;
