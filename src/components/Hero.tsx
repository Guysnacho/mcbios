import { Button } from "./ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { WordCloud } from "./WordCloud";

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 min-h-screen flex items-center relative overflow-hidden">
      {/* Art Deco Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric patterns */}
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[var(--gold)] rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-[var(--gold)] rotate-12 opacity-30"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--gold)] clip-path-triangle opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[var(--off-white)]/80">
                <div className="w-2 h-2 bg-[var(--gold)] rounded-full"></div>
                <span className="text-sm tracking-wider uppercase">Annual Conference</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-[var(--off-white)]">MCBIOS</span>
                <br />
                <span className="text-[var(--gold)] relative">
                  2026
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[var(--gold)] to-transparent"></div>
                </span>
              </h1>
              
              <p className="text-xl text-[var(--off-white)]/90 max-w-xl leading-relaxed">
                Bridging Data, AI, and Innovation to Transform Health. Join leading researchers 
                and industry pioneers shaping the future of healthcare through computational biology.
              </p>
            </div>

            {/* Event Details */}
            <div className="flex flex-wrap gap-6 text-[var(--off-white)]">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[var(--gold)]" />
                <span>March 15-17, 2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[var(--gold)]" />
                <span>Miami, Florida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[var(--gold)]" />
                <span>500+ Attendees</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-[var(--off-white)] text-[var(--maroon)] hover:bg-[var(--gold)] hover:text-[var(--maroon)] px-8 py-3 font-semibold border-2 border-[var(--off-white)]"
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-[var(--off-white)] text-[var(--off-white)] hover:bg-[var(--off-white)] hover:text-[var(--maroon)] px-8 py-3 font-semibold"
              >
                View Schedule
              </Button>
            </div>
          </div>

          {/* Word Cloud */}
          <div className="flex justify-center lg:justify-end">
            <WordCloud />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--off-white)]/20 to-transparent"></div>
    </section>
  );
}