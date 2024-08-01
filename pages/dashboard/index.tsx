// get serverside props here with videos and whatnot. Profile info updates and video content

import { createClient } from "@/lib/utils/supabase/server-props";
import { Database } from "@/lib/utils/supabase/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

type User =
  | {
      user: Database["public"]["Tables"]["member"]["Row"];
    }
  | {
      user: undefined;
    };

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  // Fetch data from external API
  const client = createClient(context);
  const { data } = await client.from("member").select("*").single();

  if (data) {
    return { props: { user: data } };
  }
  return { props: { user: undefined } };
}) satisfies GetServerSideProps<User>;

export default function Dashboard(props: User) {
  return (
    <>
      <Head>
        <title>MCBIOS Videos</title>
        <meta content="MCBIOS Videos | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <div className="container mx-auto justify-center">
        <h3 className="text-center">Welcome {props.user?.fname}</h3>
      </div>
    </>
  );
}
