import VideoUploader from "@/components/dashboard/VideoUploader";
import { createClient } from "@/lib/utils/supabase/server-props";
import { Database } from "@/lib/utils/supabase/types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDateFormatter } from "@react-aria/i18n";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  // Fetch data from external API
  const client = createClient(context);
  const { data } = await client.from("member").select("*").single();
  const { data: videos } = await client
    .from("videos")
    .select("*")
    .order("date", { ascending: false });

  if (data) {
    if (videos) {
      return { props: { user: data, videos } };
    }
    return { props: { user: data, videos: [] } };
  }
  return { props: { user: undefined, videos: [] } };
}) satisfies GetServerSideProps<{
  user: Database["public"]["Tables"]["member"]["Row"] | undefined;
  videos: Database["public"]["Tables"]["videos"]["Row"][];
}>;

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

export default function Dashboard(props: {
  user: Database["public"]["Tables"]["member"]["Row"];
  videos: Database["public"]["Tables"]["videos"]["Row"][];
}) {
  // const [currYear, setCurrYear] = useState<string>("");

  // const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   console.debug("event ");
  //   console.debug(e);
  //   setCurrYear(e.target.value);
  //   console.debug("Current year " + currYear);
  // };
  let formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta content="Dashboard | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <div className="container mx-auto justify-center">
        <div className="h-20 flex justify-center align-middle">
          <h3 className="text-center my-auto">Welcome</h3>
        </div>
        <Tabs
          aria-label="Dashboard tabs"
          color="secondary"
          items={tabs}
          className="flex justify-center"
        >
          {props.user.dues_paid_at ? (
            <Tab title="Conference Content">
              <Divider className="my-5" />
              <div className="my-5">
                <h5 className="text-center">
                  You can watch past conference recordings below
                </h5>
                {/* <Select
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
              </Select> */}
              </div>
              <div className="container flex flex-row flex-wrap gap-5 mx-auto justify-center">
                {props.videos
                  ? props.videos.map((vid) => (
                      <Card key={vid.id} className="max-w-md">
                        <CardHeader className="block text-center">
                          <h6>{vid.title ?? undefined}</h6>
                          <p>
                            {`${formatter.format(new Date(vid.date))} ` ||
                              undefined}
                          </p>
                        </CardHeader>
                        <CardBody>
                          <iframe
                            className="mx-auto"
                            src={vid.path}
                            width={300}
                            allow="autoplay"
                            loading="lazy"
                            allowFullScreen
                          ></iframe>
                        </CardBody>
                      </Card>
                    ))
                  : undefined}
              </div>
            </Tab>
          ) : undefined}
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
            <Divider />
            <h6>Welcome to MCBIOS!</h6>
            <p>
              If you haven't already please pay your dues to finish MCBIOS
              onboarding
            </p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PRIVATE_PAYPAL_ID!,
        environment: "sandbox",
        debug: true,
        currency: "USD",
      }}
    >
      {page}
    </PayPalScriptProvider>
  );
};
