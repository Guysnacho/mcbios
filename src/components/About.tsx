"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Award,
  Brain,
  Building2,
  Database,
  Link,
  Microscope,
  Network,
} from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

// Committee member type
type CommitteeMember = {
  name: string;
  title: string;
  role: string;
  institution: string;
  image?: string;
  initials: string;
  url: string;
};

const committeeMembers: CommitteeMember[] = [
  {
    name: "Mingxiang Teng",
    title: "Ph.D.",
    role: "Conference Chair",
    institution: "Moffitt Cancer Center",
    initials: "MT",
    image: "/img/committee/teng_headshot.jpg",
    url: "https://www.moffitt.org/research-science/researchers/mingxiang-teng",
  },
  {
    name: "Xuefeng Wang",
    title: "Ph.D.",
    role: "Conference Co-Chair",
    institution: "Moffitt Cancer Center",
    initials: "XW",
    image: "/img/committee/wang_headshot.jpg",
    url: "https://www.moffitt.org/research-science/researchers/xuefeng-wang",
  },
  {
    name: "Qianqian Song",
    title: "Ph.D.",
    role: "Conference Co-Chair",
    institution: "University of Florida",
    initials: "QS",
    image: "/img/committee/song_headshot.jpg",
    url: "https://hobi.med.ufl.edu/profile/song-qianqian",
  },
];

// Committee Member Card Component
function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  return (
    <Card className="group overflow-hidden bg-white border-2 border-[var(--maroon)]/10 hover:border-[var(--pink)]/50 hover:shadow-xl transition-all duration-300 max-w-xs">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--maroon)]/5 to-[var(--pink)]/5">
        <div className="aspect-square flex items-center justify-center p-6">
          <Avatar className="w-40 h-40 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
            {member.image ? (
              <AvatarImage src={member.image} alt={member.name} />
            ) : null}
            <AvatarFallback className="bg-gradient-to-br from-[var(--maroon)] to-[var(--pink)] text-white text-3xl font-bold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--maroon)] to-[var(--pink)]" />
      </div>

      {/* Content Section */}
      <CardContent className="text-center pt-4 pb-6">
        <h3 className="text-lg font-bold text-[var(--maroon)] group-hover:text-[var(--pink)] transition-colors">
          {member.name}, {member.title}
        </h3>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--maroon)]/70">
            <Award className="w-4 h-4 text-[var(--pink)]" />
            <span>{member.role}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--maroon)]/70">
            <Building2 className="w-4 h-4 text-[var(--pink)]" />
            <span>{member.institution}</span>
          </div>
          <NextLink
            href={member.url}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--maroon)]/70">
              <Link className="w-4 h-4 text-[var(--pink)]" />
              <span>Researcher Profile</span>
            </div>
          </NextLink>
        </div>
      </CardContent>
    </Card>
  );
}

export function About() {
  const path = usePathname();
  const onAboutPage = path.includes("/about");
  const features = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Healthcare Innovation",
      description:
        "Discover breakthrough applications of AI and data science transforming patient care and medical research.",
      badge: "Innovation",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI in Medicine",
      description:
        "Explore how artificial intelligence is revolutionizing diagnostics, treatment, and drug discovery.",
      badge: "AI/ML",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Health Data Analytics",
      description:
        "Learn about advanced approaches to clinical data analysis and population health insights.",
      badge: "Data",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Collaborative Health Tech",
      description:
        "Build connections across healthcare, technology, and research communities worldwide.",
      badge: "Networking",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-[var(--off-white)] relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(45deg, var(--maroon) 25%, transparent 25%),
            linear-gradient(-45deg, var(--maroon) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--maroon) 75%),
            linear-gradient(-45deg, transparent 75%, var(--maroon) 75%)
          `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge
              variant="secondary"
              className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1"
            >
              About MCBIOS 2026
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Where Science Meets
            <span className="text-[var(--pink)]"> Innovation</span>
          </h2>

          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed">
            MCBIOS 2026 unites visionary researchers, clinicians, and
            technologists who are bridging data, AI, and innovation to transform
            health. Experience the convergence of computational biology,
            artificial intelligence, and healthcare innovation in the vibrant
            setting of Florida.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          style={{ display: onAboutPage ? "none" : undefined }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-white/80 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-xl transition-all duration-300 group hover:border-[var(--pink)]/50"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gradient-to-br from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)] rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <Badge
                  variant="outline"
                  className="border-[var(--pink)] text-[var(--pink)]"
                >
                  {feature.badge}
                </Badge>
                <h3 className="font-bold text-[var(--maroon)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--maroon)]/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* About MCBIOS Accordion - Only shown on About page */}
        {onAboutPage && (
          <div className="mb-16">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="origins"
                    className="border-[var(--maroon)]/10"
                  >
                    <AccordionTrigger className="text-[var(--maroon)] font-semibold hover:text-[var(--pink)] hover:no-underline">
                      Our Origins and Growth
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--maroon)]/80 leading-relaxed">
                      MCBIOS is a non-profit organization founded in 2003. What
                      began as a grassroots effort led by a small group of
                      researchers at the FDA NCTR (located in Little Rock,
                      Arkansas) has since grown significantly. We are now one of
                      only two regional societies in North America (alongside
                      GLBIO) affiliated with ISCB, the world&apos;s largest
                      bioinformatics society.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="mission"
                    className="border-[var(--maroon)]/10"
                  >
                    <AccordionTrigger className="text-[var(--maroon)] font-semibold hover:text-[var(--pink)] hover:no-underline">
                      Our Mission
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--maroon)]/80 leading-relaxed">
                      The mission of MCBIOS is to foster networking,
                      collaboration, and professional development among members
                      at all levels of skill and education. Our annual
                      conference is the flagship event, bringing together
                      talented scientists from across the nation to share
                      scientific insights and discoveries, advancing our
                      understanding of nature and health. Guided by these goals,
                      the annual conference has enjoyed a rich and enduring
                      history.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="looking-ahead"
                    className="border-[var(--maroon)]/10"
                  >
                    <AccordionTrigger className="text-[var(--maroon)] font-semibold hover:text-[var(--pink)] hover:no-underline">
                      Looking Ahead to MCBIOS 2026
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--maroon)]/80 leading-relaxed">
                      The 2026 iteration will mark the 22nd in a series of
                      exceptional conferences. For MCBIOS 2026, we are excited
                      to host plenary speakers and a myriad of world-class
                      researchers presenting in technical sessions, workshops,
                      and tutorials. Additionally, the Young Scientist
                      Excellence Award (YSEA) will be awarded, alongside poster
                      sessions and other engaging activities.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="opportunities"
                    className="border-[var(--maroon)]/10"
                  >
                    <AccordionTrigger className="text-[var(--maroon)] font-semibold hover:text-[var(--pink)] hover:no-underline">
                      Opportunities for Attendees
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--maroon)]/80 leading-relaxed">
                      All registered attendees are invited to submit their
                      research papers for consideration in the MCBIOS 2026
                      proceedings, which will be published as special issues in
                      high-quality bioinformatics journals. We look forward to
                      hosting an impactful bioinformatics conference and hope
                      you&apos;ll join us on this exciting journey!
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>
          </div>
        )}

        {/* Organizing Committee Section - Only shown on About page */}
        {onAboutPage && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-[var(--maroon)] mb-4">
                Organizing Committee
              </h3>
              <p className="text-[var(--maroon)]/80 max-w-2xl mx-auto">
                Meet the dedicated team organizing MCBIOS 2026
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {committeeMembers.map((member, index) => (
                <CommitteeMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Venue Showcase */}
        <div
          className="mb-16"
          style={{ display: onAboutPage ? "none" : undefined }}
        >
          <div className="text-center mb-8">
            <h3
              id="venue"
              className="text-3xl font-bold text-[var(--maroon)] mb-4"
            >
              Our Venue
            </h3>
            <p className="text-[var(--maroon)]/80 max-w-2xl mx-auto">
              Experience cutting-edge science in Florida&apos;s premier medical
              and research facility, featuring state-of-the-art conference
              spaces and beautiful modern architecture.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/img/moffitt.jpg"
              alt="Moffitt Cancer Center - MCBIOS 2026 Venue"
              className="w-full h-96 md:h-120 object-cover"
              width={30}
              height={30}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon)]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-xl font-bold mb-1">Moffitt Cancer Center</h4>
              <p className="text-white/90">Tampa, Florida</p>
            </div>
          </div>
        </div>

        {/* Conference Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center"
          style={{ display: onAboutPage ? "none" : undefined }}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">100+</div>
            <div className="text-[var(--maroon)]/70">Attendees</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">Several</div>
            <div className="text-[var(--maroon)]/70">Speakers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">3</div>
            <div className="text-[var(--maroon)]/70">Days</div>
          </div>
        </div>
      </div>
    </section>
  );
}
