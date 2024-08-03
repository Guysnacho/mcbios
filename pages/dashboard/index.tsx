import VideoUploader from "@/components/dashboard/VideoUploader";
import { ConfYears } from "@/lib/utils/constants";
import { createClient } from "@/lib/utils/supabase/server-props";
import { Database } from "@/lib/utils/supabase/types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Select,
  SelectItem,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";

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

let tabs = [
  {
    id: "content",
    label: "Conference Content",
  },
  {
    id: "user",
    label: "Profile",
  },
];

const videos = [1, 2, 3, 4, 5];

export default function Dashboard(props: User) {
  const [currYear, setCurrYear] = useState<string>("");

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.debug("event ");
    console.debug(e);
    setCurrYear(e.target.value);
    console.debug("Current year " + currYear);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta content="Dashboard | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <div className="container mx-auto justify-center">
        <div className="h-20 flex justify-center align-middle">
          <h3 className="text-center my-auto">Welcome {props.user?.fname}</h3>
        </div>
        <Tabs
          aria-label="Dashboard tabs"
          color="secondary"
          items={tabs}
          className="flex justify-center"
        >
          <Tab title="Conference Content">
            <Divider className="my-5" />
            <div className="my-5">
              <h5 className="text-center">
                You can watch past conference recordings below
              </h5>
              <Select
                label="Select a year"
                // label={currYear !== "" ? currYear : "Select a year"}
                className="max-w-xs flex"
                variant="bordered"
                selectedKeys={[currYear]}
                onChange={handleSelectionChange}
              >
                {ConfYears.map((conf) => (
                  <SelectItem key={`${conf.year}`}>{`${conf.year}`}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="container flex flex-row flex-wrap gap-5 mx-auto">
              {videos.map((vid) => (
                <Card key={vid} className="max-w-xs">
                  <CardHeader>
                    {`${currYear} ` || undefined} Video Title
                  </CardHeader>
                  <CardBody>
                    <p>Video Body</p>
                    <Image
                      width={300}
                      alt="NextUI hero Image"
                      src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
          {props.user?.role === "admin" ? (
            <Tab title="Admin">
              <Divider className="my-5" />
              <div className="my-5 flex gap-3 mx-auto justify-center">
                <VideoUploader />
              </div>
            </Tab>
          ) : undefined}
          <Tab title="Profile">
            <Divider className="my-5" />
            <div className="my-5 flex gap-3 mx-auto justify-center">
              <div>
                <h5 className="text-center">Your Member Info</h5>
                <User
                  name={`${props.user?.fname} ${props.user?.lname}`}
                  about="current user"
                  description={
                    props.user?.role === "admin"
                      ? "MCBIOS Admin"
                      : "MCBIOS Member"
                  }
                  avatarProps={{
                    src: "https://api.dicebear.com/9.x/thumbs/png?seed=Lily&size=75",
                  }}
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
