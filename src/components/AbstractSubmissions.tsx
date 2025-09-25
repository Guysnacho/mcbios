import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Clock, Users, BookOpen, CheckCircle } from "lucide-react";

export function AbstractSubmissions() {
  const requirements = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Abstract Format",
      details: [
        "Maximum 300 words",
        "Minimize abbreviations",
        "No references in abstract",
        "Must include Background, Results, Conclusions"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Presentation Types",
      details: [
        "Limited oral presentation spots (15 min + panel Q&A)",
        "Automatic poster consideration if not selected for oral",
        "Poster size: 30\"W x 20\"H (76cm x 51cm)"
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Submission Rules",
      details: [
        "Registered authors can submit multiple abstracts",
        "Must be presenting author for each submission",
        "Full paper opportunity in Frontiers in AI"
      ]
    }
  ];

  const keyDates = [
    { date: "February 17, 2026", event: "Abstract Submission Deadline", urgent: true },
    { date: "February 17, 2026", event: "Full Paper Submission Deadline", urgent: true },
    { date: "March 1, 2026", event: "Notification of Acceptance", urgent: false }
  ];

  return (
    <section id="abstracts" className="py-20 px-4 bg-gradient-to-b from-[var(--off-white)] to-[var(--pink)]/5 relative">
      {/* Art Deco Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="h-full w-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, var(--maroon) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, var(--pink) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4 mt-10">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge variant="secondary" className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1">
              Call for Abstracts
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Share Your
            <span className="text-[var(--pink)]"> Research</span>
          </h2>
          
          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Present your groundbreaking work in computational biology, AI in healthcare, and health data innovation. 
            Join leading researchers in advancing the field through knowledge sharing and collaboration.
          </p>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <Clock className="w-5 h-5 text-[var(--pink)]" />
            <span className="font-medium text-[var(--maroon)]">Deadline: February 17, 2026</span>
          </div>

          <Button 
            asChild
            className="bg-[var(--maroon)] text-[var(--off-white)] hover:bg-[var(--pink)] px-8 py-3 text-lg"
            size="lg"
          >
            <a href="https://forms.gle/tiz5ZcHvo1W6yfB4A" target="_blank" rel="noopener noreferrer">
              Submit Abstract
            </a>
          </Button>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {requirements.map((req, index) => (
            <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-xl transition-all duration-300 hover:border-[var(--pink)]/50">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)] rounded-lg">
                    {req.icon}
                  </div>
                  <h3 className="font-bold text-[var(--maroon)]">{req.title}</h3>
                </div>
                <div className="space-y-3">
                  {req.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[var(--pink)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--maroon)]/80 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Key Information Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Important Dates
            </h3>
            <div className="space-y-4">
              {keyDates.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-[var(--maroon)]/10 last:border-0">
                  <span className="text-[var(--maroon)]/80">{item.event}</span>
                  <Badge variant={item.urgent ? "default" : "outline"} className={
                    item.urgent 
                      ? "bg-[var(--pink)] text-[var(--off-white)]" 
                      : "border-[var(--maroon)] text-[var(--maroon)]"
                  }>
                    {item.date}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Abstract Structure
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">Background</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Context and purpose of the study</p>
              </div>
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">Results</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Main findings and outcomes</p>
              </div>
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">Conclusions</h4>
                <p className="text-[var(--maroon)]/70 text-sm">Brief summary and potential implications</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}