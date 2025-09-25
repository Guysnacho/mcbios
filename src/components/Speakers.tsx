import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Award, ExternalLink } from "lucide-react";

export function Speakers() {
  const speakers = [
    {
      name: "Dr. Maria Rodriguez",
      title: "Chief AI Officer",
      institution: "Mayo Clinic",
      expertise: "AI in Clinical Decision Making",
      image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NDI2NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: true,
      location: "Rochester, MN"
    },
    {
      name: "Prof. James Chen",
      title: "Director of Digital Health",
      institution: "Stanford Medicine",
      expertise: "Precision Medicine & Genomics",
      image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzY2llbnRpc3QlMjBsYWIlMjBjb2F0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQyNjc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Palo Alto, CA"
    },
    {
      name: "Dr. Sarah Johnson",
      title: "VP of Health AI",
      institution: "Google Health",
      expertise: "AI for Drug Discovery & Diagnostics",
      image: "https://images.unsplash.com/photo-1735679356705-7c06b780c7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc2NpZW50aXN0JTIwdGVhbSUyMHJlc2VhcmNoZXJzJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTg0MjY3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: true,
      location: "Mountain View, CA"
    },
    {
      name: "Dr. Ahmed Hassan",
      title: "Chief Medical Data Officer",
      institution: "University of Florida Health",
      expertise: "Clinical Data Science",
      image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY2llbnRpc3QlMjByZXNlYXJjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4NDI2NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Gainesville, FL"
    },
    {
      name: "Dr. Lisa Park",
      title: "Director of Health Informatics",
      institution: "NIH National Institute",
      expertise: "Multi-omics & Biomarker Discovery",
      image: "https://images.unsplash.com/photo-1618053448748-b7251851d014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzY2llbnRpc3QlMjBsYWIlMjBjb2F0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODQyNjc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Bethesda, MD"
    },
    {
      name: "Prof. Roberto Silva",
      title: "Director of Health AI Lab",
      institution: "Barcelona Institute for Global Health",
      expertise: "Population Health Analytics",
      image: "https://images.unsplash.com/photo-1735679356705-7c06b780c7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc2NpZW50aXN0JTIwdGVhbSUyMHJlc2VhcmNoZXJzJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTg0MjY3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      keynote: false,
      location: "Barcelona, Spain"
    }
  ];

  return (
    <section id="speakers" className="py-20 px-4 bg-gradient-to-b from-[var(--off-white)] to-[var(--pink)]/10 relative">
      {/* Art Deco Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[var(--gold)]/20 rotate-45"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-[var(--maroon)]/10 rotate-12"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge variant="secondary" className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1">
              Featured Speakers
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            World-Class
            <span className="text-[var(--pink)]"> Experts</span>
          </h2>
          
          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed">
            Learn from healthcare innovators, AI pioneers, and data science leaders who are 
            transforming medicine through cutting-edge technology and research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <Card key={index} className="overflow-hidden bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-2xl transition-all duration-300 group hover:border-[var(--pink)]/50">
              <div className="relative">
                <ImageWithFallback
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {speaker.keynote && (
                  <Badge className="absolute top-4 left-4 bg-[var(--gold)] text-[var(--maroon)]">
                    <Award className="w-3 h-3 mr-1" />
                    Keynote
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-[var(--maroon)] mb-1">{speaker.name}</h3>
                  <p className="text-[var(--pink)] font-medium">{speaker.title}</p>
                  <p className="text-[var(--maroon)]/70 text-sm">{speaker.institution}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-[var(--maroon)]/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{speaker.location}</span>
                </div>
                
                <Badge variant="outline" className="border-[var(--pink)] text-[var(--pink)]">
                  {speaker.expertise}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[var(--maroon)] text-[var(--maroon)] hover:bg-[var(--maroon)] hover:text-[var(--off-white)]"
                >
                  View Profile
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-[var(--maroon)] text-[var(--off-white)] hover:bg-[var(--pink)] px-8 py-3"
          >
            View All Speakers
          </Button>
        </div>
      </div>
    </section>
  );
}