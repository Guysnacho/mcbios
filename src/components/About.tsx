import { Brain, Database, Microscope, Network } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export function About() {
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
      {/* Art Deco Pattern */}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Venue Showcase */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[var(--maroon)] mb-4">
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
              src="/img/Moffitt.jpg"
              alt="Moffitt Cancer Center - MCBIOS 2026 Venue"
              className="w-full h-64 md:h-80 object-cover"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">500+</div>
            <div className="text-[var(--maroon)]/70">Attendees</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">50+</div>
            <div className="text-[var(--maroon)]/70">Speakers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">3</div>
            <div className="text-[var(--maroon)]/70">Days</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[var(--pink)]">25+</div>
            <div className="text-[var(--maroon)]/70">Sessions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
