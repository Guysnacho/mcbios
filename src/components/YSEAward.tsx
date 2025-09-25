import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trophy, GraduationCap, Users, FileText, Clock, Award, Target, CheckCircle } from "lucide-react";

export function YSEAward() {
  const eligibility = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Students",
      description: "Graduate students conducting research in computational biology, bioinformatics, or health AI"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Postdoctoral Fellows",
      description: "Postdocs advancing the field through innovative research and multidisciplinary approaches"
    }
  ];

  const requirements = [
    "Research abstract submission",
    "Innovation description (150 words or less)",
    "Individual contribution explanation (150 words or less)",
    "Must demonstrate quality research impact",
    "Preference for multidisciplinary contributions"
  ];

  const process = [
    {
      step: "1",
      title: "Application Review",
      description: "MCBIOS board members evaluate all applications based on research quality and innovation"
    },
    {
      step: "2", 
      title: "Top 4 Selection",
      description: "Selected candidates are invited to present in a dedicated YSEA session"
    },
    {
      step: "3",
      title: "Oral Presentations",
      description: "Finalists present their research to a panel of expert judges including keynote speakers"
    },
    {
      step: "4",
      title: "Awards Ceremony",
      description: "Winners announced during the final luncheon with recognition and prizes"
    }
  ];

  const keyDates = [
    { date: "January 30, 2026", event: "YSEA Application Deadline", urgent: true },
    { date: "February 15, 2026", event: "Finalist Notification", urgent: false },
    { date: "March 20, 2026", event: "Awards Ceremony", urgent: false }
  ];

  return (
    <section id="ysea" className="py-20 px-4 bg-gradient-to-b from-[var(--maroon)]/5 to-[var(--off-white)] relative">
      {/* Art Deco Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(30deg, var(--gold) 12%, transparent 12.5%, transparent 87%, var(--gold) 87.5%, var(--gold)),
            linear-gradient(150deg, var(--gold) 12%, transparent 12.5%, transparent 87%, var(--gold) 87.5%, var(--gold)),
            linear-gradient(30deg, var(--gold) 12%, transparent 12.5%, transparent 87%, var(--gold) 87.5%, var(--gold)),
            linear-gradient(150deg, var(--gold) 12%, transparent 12.5%, transparent 87%, var(--gold) 87.5%, var(--gold))
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
        }}>
        </div>
      </div>

      <div className="container mx-auto relative z-10 mt-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--gold)]"></div>
            <Badge variant="secondary" className="bg-[var(--gold)] text-[var(--maroon)] px-4 py-1">
              Young Scientist Excellence Awards
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--gold)]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            MCBIOS <span className="text-[var(--gold)]">YSEA</span>
            <span className="text-[var(--maroon)]"> 2026</span>
          </h2>
          
          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Recognize and celebrate exceptional young scientists making groundbreaking contributions to 
            computational biology, bioinformatics, and healthcare AI. Showcase your innovative research 
            and compete for prestigious awards.
          </p>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <Clock className="w-5 h-5 text-[var(--pink)]" />
            <span className="font-medium text-[var(--maroon)]">Application Deadline: January 30, 2026</span>
          </div>

          <Button 
            asChild
            className="bg-[var(--gold)] text-[var(--maroon)] hover:bg-[var(--bronze)] px-8 py-3 text-lg font-medium"
            size="lg"
          >
            <a href="https://forms.gle/RMjTJuZATAyNuMyg7" target="_blank" rel="noopener noreferrer">
              Apply for YSEA
            </a>
          </Button>
        </div>

        {/* Eligibility */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {eligibility.map((item, index) => (
            <Card key={index} className="p-8 bg-white/95 backdrop-blur-sm border-[var(--gold)]/30 hover:shadow-xl transition-all duration-300 group hover:border-[var(--pink)]/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] text-[var(--maroon)] rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--maroon)] mb-3">{item.title}</h3>
                  <p className="text-[var(--maroon)]/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Requirements and Process */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[var(--gold)]" />
              Application Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[var(--pink)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--maroon)]/80">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[var(--gold)]" />
              Important Dates
            </h3>
            <div className="space-y-4">
              {keyDates.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-[var(--maroon)]/10 last:border-0">
                  <span className="text-[var(--maroon)]/80">{item.event}</span>
                  <Badge variant={item.urgent ? "default" : "outline"} className={
                    item.urgent 
                      ? "bg-[var(--gold)] text-[var(--maroon)]" 
                      : "border-[var(--maroon)] text-[var(--maroon)]"
                  }>
                    {item.date}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Selection Process */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[var(--maroon)] mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 mr-3 text-[var(--gold)]" />
              Selection Process
            </h3>
            <p className="text-[var(--maroon)]/80 max-w-2xl mx-auto">
              A rigorous evaluation process ensures recognition of the most impactful young scientist contributions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-lg transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] text-[var(--maroon)] rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-[var(--maroon)]">{item.title}</h4>
                  <p className="text-[var(--maroon)]/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Award Highlights */}
        <Card className="p-8 bg-gradient-to-r from-[var(--gold)]/10 to-[var(--bronze)]/10 border-[var(--gold)]/30">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-[var(--gold)] mr-3" />
              <h3 className="text-2xl font-bold text-[var(--maroon)]">Award Recognition</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-[var(--gold)] mx-auto mb-3" />
                <h4 className="font-bold text-[var(--maroon)] mb-2">Professional Presentation</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Primary evaluation criterion focusing on presentation quality and impact</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-[var(--gold)] mx-auto mb-3" />
                <h4 className="font-bold text-[var(--maroon)] mb-2">Expert Judging</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Evaluation by MCBIOS board members and keynote speakers</p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 text-[var(--gold)] mx-auto mb-3" />
                <h4 className="font-bold text-[var(--maroon)] mb-2">Multidisciplinary Focus</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Preference for innovative, cross-disciplinary research contributions</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}