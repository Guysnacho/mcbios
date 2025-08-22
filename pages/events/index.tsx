import { ConferenceRegistration } from "@/components/ConferenceRegistration";
import CareerDev from "@/public/images/banners/career-development.jpg";
import {
  Divider,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Head from "next/head";

const Events = () => {
  return (
    <div className="container space-y-10 mx-auto">
      <Head>
        <title>MCBIOS Events</title>
        <meta content="Upcomming MCBIOS Events | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <h3 className="text-center my-10">Events</h3>
      <Tabs aria-label="Event Types" size="lg" isFitted variant="enclosed">
        <TabList>
          <Tab title="Upcoming Events">Upcoming Events</Tab>
          <Tab title="Career Development">Career Development</Tab>
          <Tab title="Working Groups">Working Groups</Tab>
        </TabList>
        <TabPanels>
          {/* Registration Panel */}
          <TabPanel>
            <ConferenceRegistration registrationPassed />
          </TabPanel>
          <TabPanel>
            <Image
              src={CareerDev.src}
              alt="Career Development Series"
              className="mx-auto px-5 md:px-10 lg:px-20"
            />
            <Divider className="w-1/2 mx-auto mb-10" />
            <section>
              <div className="w-11/12 mx-auto gap-8 items-center space-y-6 md:space-y-5">
                <Divider className="w-1/2 mx-auto mb-10" />
                <p className="justify-center">
                  Career Development Seminars are workshops and presentations
                  free and open to all MCBIOS members, especially for trainees
                  and junior faculty on professional development, mentoring from
                  academia and industry leaders, grant and manuscript writing,
                  best practices and resources pertaining to build an impactful
                  career in biomedical data sciences. Seminars are offered
                  monthly as virtual seminar and an in-person session during the
                  MCBIOS Annual Conference.
                </p>
                <Divider className="w-1/2 mx-auto mb-10" />
                <h5 className="text-center text-primary">
                  Check in with us later for updates
                </h5>
              </div>
            </section>
          </TabPanel>
          <TabPanel>
            <Divider className="w-1/2 mx-auto mb-10" />
            <section>
              <div className="w-11/12 mx-auto gap-8 items-center space-y-6 md:space-y-5">
                <p className="text-lg">
                  MCBIOS encourages the formation of working groups. Groups
                  require:
                </p>

                <ul className="list-disc list-inside">
                  <li>At least three members</li>
                  <li>An elected chairman</li>
                  <li>
                    A regular meeting schedule, with a minimum of two meetings
                    per year
                  </li>
                  <li>A purpose for organizing</li>
                </ul>
                <p className="text-lg">
                  To apply for recognition as a MCBIOS working group, please
                  contact any Board Member or send us a message and provide the
                  information above, along with a copy of your bylaws, if
                  applicable.
                </p>
                <Divider className="w-1/2 mx-auto mb-10" />
                <h5 className="text-center text-primary">
                  Check in with us later for updates
                </h5>
              </div>
            </section>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Events;
