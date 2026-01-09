import { FormProps } from "@/lib/types";
import {
  AlertCircle,
  Clock,
  MessageSquare,
  Presentation,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function SessionProposals({ deadlinePassed }: FormProps) {
  const sessionTypes = [
    {
      icon: <Presentation className="w-8 h-8" />,
      title: "Technical Session",
      description:
        "Presentations showcasing cutting-edge research and advancements in computational biology and bioinformatics.",
      badge: "Research",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Tutorial",
      description:
        "In-depth, hands-on learning experiences designed to teach specific tools, techniques, or methodologies.",
      badge: "Learning",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Workshop",
      description:
        "Interactive sessions focused on collaborative problem-solving and skill development in emerging topics.",
      badge: "Interactive",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Panel Discussion",
      description:
        "Engaging conversations where experts share insights, debate trends, and answer audience questions.",
      badge: "Discussion",
    },
  ];

  const requirements = [
    "Session duration: 80 minutes",
    "Propose your own topic",
    "Invite up to 3 additional speakers",
    "Speakers must attend in person",
    "Full paper opportunity in Frontiers in AI",
  ];

  return (
    <section
      id="sessions"
      className="py-20 px-4 bg-gradient-to-b from-[var(--pink)]/5 to-[var(--maroon)]/10 relative"
    >
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-[var(--gold)]/30 rotate-45"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-[var(--maroon)]/20 rotate-12"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[var(--pink)]/20 rounded-full"></div>

      <div className="container mx-auto relative z-10 mt-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge
              variant="secondary"
              className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1"
            >
              Session Proposals
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Lead a
            <span className="text-[var(--maroon)]"> Scientific Session</span>
          </h2>

          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Shape the conference experience by proposing and leading your own
            scientific session. Choose your topic, invite expert speakers, and
            contribute to advancing healthcare AI and data science.
          </p>

          {/* Deadline Notice */}
          {deadlinePassed ? (
            <div className="flex items-center justify-center space-x-2 mb-8 p-4 bg-[var(--maroon)]/10 rounded-lg border border-[var(--maroon)]/20 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5 text-[var(--maroon)]" />
              <span className="font-medium text-[var(--maroon)]">
                Deadline Passed: Jan 23, 2026
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Clock className="w-5 h-5 text-[var(--pink)]" />
              <span className="font-medium text-[var(--maroon)]">
                Application Deadline: <span className="line-through">December 20, 2025</span> Jan 23,
                2026
              </span>
            </div>
          )}

          {deadlinePassed ? (
            <Button
              variant="outline"
              className="border-[var(--maroon)] text-[var(--maroon)] px-8 py-3 text-lg hover:bg-[var(--maroon)] hover:text-[var(--off-white)] opacity-60 cursor-not-allowed"
              size="lg"
              disabled
            >
              Submission Closed
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="border-[var(--maroon)] text-[var(--maroon)] px-8 py-3 text-lg hover:bg-[var(--maroon)] hover:text-[var(--off-white)] opacity-100"
              size="lg"
            >
              <a
                href="https://forms.gle/BL9qdZxm6N27nDhx5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit Proposal
              </a>
            </Button>
          )}
        </div>

        {/* Session Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sessionTypes.map((session, index) => (
            <Card
              key={index}
              className="p-6 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-xl transition-all duration-300 group hover:border-[var(--pink)]/50"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gradient-to-br from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)] rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {session.icon}
                </div>
                <Badge
                  variant="outline"
                  className="border-[var(--pink)] text-[var(--pink)]"
                >
                  {session.badge}
                </Badge>
                <h3 className="font-bold text-[var(--maroon)]">
                  {session.title}
                </h3>
                <p className="text-[var(--maroon)]/70 text-sm leading-relaxed">
                  {session.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Requirements and Process */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Session Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[var(--pink)] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[var(--maroon)]/80">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Additional Benefits
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">
                  Publication Opportunity
                </h4>
                <p className="text-[var(--maroon)]/70 text-sm">
                  Submit full papers for MCBIOS 2026 proceedings in Frontiers in
                  Artificial Intelligence
                </p>
              </div>
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">
                  Expert Network
                </h4>
                <p className="text-[var(--maroon)]/70 text-sm">
                  Connect with leading researchers and build collaborative
                  relationships
                </p>
              </div>
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">
                  Knowledge Sharing
                </h4>
                <p className="text-[var(--maroon)]/70 text-sm">
                  Shape the future of computational biology and healthcare AI
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
