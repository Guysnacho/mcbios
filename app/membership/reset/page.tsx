"use client";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";
import { Eye, EyeOff } from "lucide-react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { SupabaseClient } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const client = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valid, setValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  async function verifyResetSession(client: SupabaseClient<Database>) {
    const { error } = await client.auth.verifyOtp({
      type: "recovery",
      token_hash: router.query.tokenHash as string,
    });

    if (error) {
      toaster.error({
        title: "Ran into an issue verifying your email session",
        description: error.message,
      });
      return;
    } else {
      setValid(true);
    }
  }

  async function handleUpdate(client: SupabaseClient<Database>) {
    setLoading(true);
    const { error } = await client.auth.updateUser({
      password,
    });

    if (error) {
      toaster.error({
        title: "Ran into an issue updating your password",
        description:
          "If an issue persists, please reach out to team@tunjiproductions.com - " +
          error.message,
      });
      setLoading(false);
    } else {
      toaster.success({
        title: "Your request has been recieved",
        description: "Feel free to login using your new credentials!",
      });
      router.replace("/membership?reset=true");
    }
  }

  useEffect(() => {
    if (router.query.tokenHash && router.query.email && router.query.token) {
      verifyResetSession(client).finally(() => setLoading(false));
    } else setLoading(false);

    return () => {
      client.auth.signOut({
        scope: "global",
      });
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>MCBIOS Account Recovery</title>
        <meta content="MCBIOS Membership Recovery | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      <div className="container space-y-10 mx-auto">
        <div className="h-1/2 w-1/2 mx-auto">
          <Image
            src="https://blush.design/api/download?shareUri=zp2x6bt35MyJr384&c=Hair_0%7Ef3ddb4-0.0.2%7E765227-0.0.3%7E765227-0.0.4%7Eee4e2f-0.0.5%7E8ae0d3_Skin_0%7Ea15122-0.0.2%7Effd4aa-0.0.3%7Edb8c5c-0.0.4%7Effc280-0.0.5%7Edb8c5c&bg=ffffff&w=800&h=800&fm=png"
            alt="People talking"
            className="mx-auto object-contain"
            width={800}
            height="auto"
          />
        </div>
        <Box>
          <h3 className="text-center my-10">
            Recover Access to the MCBIOS Community
          </h3>
          <form
            className={!valid ? "hidden" : undefined}
            onSubmit={(e) => {
              e.preventDefault();

              handleUpdate(client);
            }}
          >
            <Stack
              gap={4}
              mb={5}
              width={["85%", null, "70%", "60%", "50%"]}
              mx="auto"
            >
              <Field label="New Password" required disabled={loading}>
                <InputGroup
                  endElement={
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  }
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    value={password}
                  />
                </InputGroup>
              </Field>
              <Field label="Confirm your Password" required disabled={loading}>
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  onChange={(e) => setConfirm(e.currentTarget.value)}
                  value={confirm}
                />
              </Field>
            </Stack>
            <section className="text-center space-y-3">
              <Button
                aria-description="Submit new password"
                type="submit"
                colorPalette="green"
                disabled={loading || password !== confirm}
              >
                Submit
              </Button>
            </section>
          </form>
          {loading && (
            <Flex alignItems="center">
              <Spinner m="auto" />
            </Flex>
          )}
        </Box>
      </div>
    </>
  );
};
