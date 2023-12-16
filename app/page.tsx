"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

export default function Home() {
  return (
    <div className="my-10 gap-10">
      <section className="flex flex-col w-5/6 lg:w-1/2 space-y-8 px-10 items-center mx-auto">
        <Image
          className="mx-auto object-cover"
          src="/images/logo.jpg"
          fallbackSrc="/images/logo.jpg"
          alt="MCBIOS Logo"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <Button
          variant="shadow"
          size="md"
          as="a"
          target="_self"
          className="my-4 mx-auto"
          href="/membership"
          color="secondary"
        >
          Become a Member
        </Button>
      </section>

      <Divider as="hr" className="my-10 border-gray-500" />

      <section className="space-y-5 px-10 mx-auto md:w-5/6">
        <h3 className="underline underline-offset-4 text-center">
          Greeting from the MCBIOS President:
        </h3>
        <div className="md:flex my-5 gap-5 mx-auto">
          <Card shadow="md" className="h-fit">
            <CardHeader>
              <Image
                src="/images/leadership/Qin-Steve.jpg"
                fallbackSrc="/images/leadership/Qin-Steve.jpg"
                alt="Qin Steve, MCBIOS President"
                className="w-4/5 md:w-11/12 object-cover mx-auto"
                classNames={{
                  wrapper: ["mx-auto"],
                }}
              />
            </CardHeader>
            <CardFooter>
              <p className="text-sm">
                <strong className="mx-auto">Zhaohui “Steve” Qin, PhD</strong>
                <br />
                President, Mid-South Computational Biology & Bioinformatics
                Society
                <br />
                Professor
                <br />
                Department of Biostatistics, Bioinformatics
                <br />
                Emory University
              </p>
            </CardFooter>
          </Card>
          <Accordion>
            <AccordionItem
              aria-label="Introduction and Gratitude"
              key="1"
              title={<p>Introduction and Gratitude</p>}
            >
              It is my great honor to serve as the 19th president of MidSouth
              Computational Biology and Bioinformatics Society (MCBIOS). I want
              to thank members of the society for trusting me and giving me this
              opportunity to lead a regional bioinformatics powerhouse. I also
              want to thank the board of directors and past presidents for their
              unwavering support and guidance.
            </AccordionItem>
            <AccordionItem
              aria-label="Personal Journey"
              key="2"
              title={<p>Personal Journey</p>}
            >
              Reflecting my own professional journey, I can&lsquo;t emphasize
              more on the importance of professional organization for a trainee
              and junior professionals. I didn&lsquo;t discover bioinformatics
              until in my postdoc years. Joining ISCB and attending my first
              ISMB conference really made a difference. I felt that I found the
              community of like-minded people, especially young professionals,
              that I belong. Therefore, I encourage colleagues, especially
              trainees, no matter where you are located, to please consider
              joining us.
            </AccordionItem>
            <AccordionItem
              aria-label="Future Events: Upcomming Conference"
              key="3"
              title={<p>Future Events: Upcomming Conference</p>}
            >
              I considered myself very lucky to be introduced to MCBIOS and
              attended my first MCBIOS annual conference in 2019. Over the
              years, I found MCBIOS to be a very welcoming community consist of
              energetic professionals working in all aspects of bioinformatics.
              Because of the pandemic, for the past three years, we have to
              either postpone or move the annual conferences online. I am really
              pleased that we are able to get back to normal earlier this year
              in the 2023 Conference. Looking forward to next year, I sincerely
              hope that you can join us for our 20th annual conference to be
              held in Atlanta, GA on March 22-24, 2024. <br />
              <br />
              Additionally, I encourage and welcome the scientific community to
              join us and connect with us via social media to stay updated on
              upcoming events such as the career development webinar series and
              our 2024 annual conference. Over the coming months, we will be
              sharing more information on upcoming webinar dates, 2024
              conference call for session proposals, abstract deadlines and
              more. Many thanks for all of your continued support and well
              wishes!
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Divider as="hr" className="my-10 border-gray-500" />

      <div className="w-4/5 md:w-2/3 mx-auto">
        <h3 className="underline underline-offset-4 text-center">Objectives</h3>
        <ul className="list-disc space-y-1 list-inside">
          <li>
            Advance the understanding of bioinformatics and computational
            biology
          </li>
          <li>
            Bring together scientists of various backgrounds and disciplines
          </li>
          <li>
            Facilitate the collaboration of researchers with similar or
            complementary backgrounds to solve biological, health and/or medical
            problems
          </li>
          <li>Promote education in bioinformatics and computational biology</li>
          <li>
            Inform the general public on the results and implications of current
            research in bioinformatics and computational biology
          </li>
          <li>
            Promote other activities that will contribute to the development of
            bioinformatics and computational biology MCBIOS Bylaws Current
            version (Amended Feb 20, 2010)
          </li>
        </ul>
      </div>

      <Divider as="hr" className="my-10 border-gray-500" />

      <div className="columns-1 lg:columns-2 w-5/6 mx-auto">
        <div className="w-full items-center">
          <h4 className="text-center">Membership</h4>
          <p className="my-5">
            Membership in MBIOS includes meeting registration for the annual
            Conference and access to workshops and collaborative projects hosted
            by MCBIOS through the year. Students receive a discount for
            membership and are eligible for student awards. MCBIOS encourages
            involvement at both the regional and state level.
          </p>
          <div className="w-full flex">
            <Button
              variant="shadow"
              size="md"
              as="a"
              target="_self"
              className="my-4 mx-auto"
              href="/membership"
              color="secondary"
            >
              Become a Registration
            </Button>
          </div>
        </div>
        <div className="w-full mb-11">
          <h4 className="text-center">Local Chapters</h4>
          <ul className="list-disc space-y-1 w-5/6 mx-auto list-inside">
            <li>
              MCBIOS encourages the formation of local chapters. Chapters
              require:
            </li>
            <li>At least three members </li>
            <li>An elected chairman </li>
            <li>
              A regular meeting schedule, with a minimum of two meetings per
              year
            </li>
            <li>A purpose for organizing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
