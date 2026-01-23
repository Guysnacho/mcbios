import { AuthModal } from "@/components/AuthModal";
import { useUserStore } from "@/lib/store";
import useStore from "@/lib/store/useStore";
import {
  Button,
  Heading,
  Image,
  Text,
  List,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Membership = () => {
  const store = useStore(useUserStore, (store) => store);
  const router = useRouter();
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (isAuthOpen) {
      if (store?.id) {
        router.push("/dashboard", undefined, {
          shallow: false,
        });
      } else {
        setAuthOpen(true);
      }
    }
    if (router.query.registration) setAuthOpen(true);
  }, [isAuthOpen, router, store?.id]);

  useEffect(() => {
    if (router.query.registration) {
      setAuthOpen(true);
    } else if (router.query.reset) {
      setIsSignUp(false);
      setAuthOpen(true);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>MCBIOS Membership</title>
        <meta content="MCBIOS Membership | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setAuthOpen}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
      />
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
        <section>
          <h3 className="text-center my-10">Join the MCBIOS Community</h3>
          <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
            <VStack gap={3}>
              <Heading size="md">Unlock Benefits as a Society Member</Heading>
              <List.Root>
                <List.Item>
                  <Text fontWeight={600}>Leadership Opportunities</Text>
                  <Text>
                    Take your career to the next level by competing for
                    prestigious leadership roles, including board member or
                    Presidential Officer positions.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontWeight={600}>Host High-Impact Events</Text>
                  <Text>
                    Lead the way in knowledge sharing by organizing auxiliary
                    events like virtual webinars and hands-on workshops.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontWeight={600}>Run a Local Chapter</Text>
                  <Text>
                    Champion the society&apos;s mission in your community by
                    establishing and managing a local chapter.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontWeight={600}>Conference Discounts</Text>
                  <Text>
                    Save big with exclusive discounted registration fees for our
                    annual conference, the premier event for networking and
                    sharing breakthroughs.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontWeight={600}>Reduced Publication Fees</Text>
                  <Text>
                    Publish your work more affordably with discounted fees for
                    the conference proceedings—a unique benefit for members.
                  </Text>
                </List.Item>
              </List.Root>
            </VStack>

            <VStack gap={3}>
              <Heading size="md">
                Simple and Affordable Membership Options
              </Heading>
              <List.Root>
                <List.Item>
                  <Text>
                    <span className="font-bold">Conference Attendees: </span>
                    Your annual conference registration fee automatically
                    includes a one-year society membership.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text>
                    <span className="font-bold">Direct Membership: </span>
                    Prefer to join or renew without attending? For 2025, enjoy
                    our special introductory rates:{" "}
                    <span className="font-bold">
                      $100 for Professionals and $30 for Students.
                    </span>
                  </Text>
                </List.Item>
              </List.Root>
            </VStack>
          </div>
        </section>
        <section className="text-center space-y-3">
          <p>MCBIOS site and conference registration now available</p>
          <Button
            aria-describedby="member sign up"
            type="button"
            colorPalette="purple"
            onClick={() => setAuthOpen(true)}
          >
            Sign Up
          </Button>
        </section>
      </div>
    </>
  );
};

export default Membership;
