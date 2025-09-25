import { Clock, MapPin, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Schedule() {
  const scheduleData = {
    "Day 1": {
      date: "March 26, 2026",
      title: "Opening & Keynotes",
      events: [
        {
          time: "8:00 AM",
          title: "Registration & Coffee",
          type: "networking",
          location: "Main Lobby",
          duration: "60 min"
        },
        {
          time: "9:00 AM",
          title: "Opening Ceremony",
          speaker: "Conference Committee",
          type: "ceremony",
          location: "Grand Ballroom",
          duration: "30 min"
        },
        {
          time: "9:30 AM",
          title: "Keynote: AI Transforming Clinical Decision Making",
          speaker: "Dr. Maria Rodriguez",
          type: "keynote",
          location: "Grand Ballroom",
          duration: "60 min"
        },
        {
          time: "10:30 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min"
        },
        {
          time: "11:00 AM",
          title: "Session: AI in Healthcare Applications",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Conference Room A",
          duration: "90 min"
        },
        {
          time: "12:30 PM",
          title: "Lunch & Networking",
          type: "networking",
          location: "Restaurant Terrace",
          duration: "90 min"
        },
        {
          time: "2:00 PM",
          title: "Workshop: Clinical Data Science Fundamentals",
          speaker: "Dr. Ahmed Hassan",
          type: "workshop",
          location: "Lab Suite 1",
          duration: "2 hours"
        },
        {
          time: "4:00 PM",
          title: "Poster Session",
          type: "poster",
          location: "Exhibition Hall",
          duration: "2 hours"
        }
      ]
    },
    "Day 2": {
      date: "March 27, 2026",
      title: "Research & Innovation",
      events: [
        {
          time: "9:00 AM",
          title: "Keynote: AI for Drug Discovery & Diagnostics",
          speaker: "Dr. Sarah Johnson",
          type: "keynote",
          location: "Grand Ballroom",
          duration: "60 min"
        },
        {
          time: "10:00 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min"
        },
        {
          time: "10:30 AM",
          title: "Session: Precision Medicine & Multi-omics",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Conference Room A",
          duration: "90 min"
        },
        {
          time: "12:00 PM",
          title: "Lunch & Vendor Demos",
          type: "networking",
          location: "Exhibition Hall",
          duration: "90 min"
        },
        {
          time: "1:30 PM",
          title: "Panel: Ethics in Healthcare AI",
          speaker: "Expert Panel",
          type: "panel",
          location: "Grand Ballroom",
          duration: "75 min"
        },
        {
          time: "3:00 PM",
          title: "Workshop: Biomarker Discovery with Multi-omics",
          speaker: "Dr. Lisa Park",
          type: "workshop",
          location: "Lab Suite 2",
          duration: "2 hours"
        },
        {
          time: "6:00 PM",
          title: "Gala Dinner",
          type: "social",
          location: "Oceanview Terrace",
          duration: "3 hours"
        }
      ]
    },
    "Day 3": {
      date: "March 28, 2026",
      title: "Future Directions",
      events: [
        {
          time: "9:00 AM",
          title: "Session: Population Health Analytics",
          speaker: "Prof. Roberto Silva",
          type: "session",
          location: "Conference Room A",
          duration: "90 min"
        },
        {
          time: "10:30 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min"
        },
        {
          time: "11:00 AM",
          title: "Lightning Talks",
          speaker: "Young Researchers",
          type: "talks",
          location: "Conference Room B",
          duration: "60 min"
        },
        {
          time: "12:00 PM",
          title: "Lunch & Career Fair",
          type: "networking",
          location: "Exhibition Hall",
          duration: "90 min"
        },
        {
          time: "1:30 PM",
          title: "Session: Future of Health Technology",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Grand Ballroom",
          duration: "90 min"
        },
        {
          time: "3:00 PM",
          title: "Closing Ceremony & Awards",
          speaker: "Conference Committee",
          type: "ceremony",
          location: "Grand Ballroom",
          duration: "60 min"
        },
        {
          time: "4:00 PM",
          title: "Farewell Reception",
          type: "networking",
          location: "Main Lobby",
          duration: "60 min"
        }
      ]
    },
    "Day 4": {
      date: "March 28, 2026",
      title: "Future Directions",
      events: [
        {
          time: "9:00 AM",
          title: "Session: Population Health Analytics",
          speaker: "Prof. Roberto Silva",
          type: "session",
          location: "Conference Room A",
          duration: "90 min"
        },
        {
          time: "10:30 AM",
          title: "Coffee Break",
          type: "break",
          location: "Exhibition Hall",
          duration: "30 min"
        },
        {
          time: "11:00 AM",
          title: "Lightning Talks",
          speaker: "Young Researchers",
          type: "talks",
          location: "Conference Room B",
          duration: "60 min"
        },
        {
          time: "12:00 PM",
          title: "Lunch & Career Fair",
          type: "networking",
          location: "Exhibition Hall",
          duration: "90 min"
        },
        {
          time: "1:30 PM",
          title: "Session: Future of Health Technology",
          speaker: "Multiple Speakers",
          type: "session",
          location: "Grand Ballroom",
          duration: "90 min"
        },
        {
          time: "3:00 PM",
          title: "Closing Ceremony & Awards",
          speaker: "Conference Committee",
          type: "ceremony",
          location: "Grand Ballroom",
          duration: "60 min"
        },
        {
          time: "4:00 PM",
          title: "Farewell Reception",
          type: "networking",
          location: "Main Lobby",
          duration: "60 min"
        }
      ]
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      keynote: "bg-[var(--gold)] text-[var(--maroon)]",
      session: "bg-[var(--maroon)] text-[var(--off-white)]",
      workshop: "bg-[var(--pink)] text-[var(--off-white)]",
      networking: "bg-[var(--off-white)] text-[var(--maroon)] border border-[var(--maroon)]",
      break: "bg-gray-100 text-gray-600",
      ceremony: "bg-[var(--gold)] text-[var(--maroon)]",
      poster: "bg-[var(--pink)]/80 text-[var(--off-white)]",
      panel: "bg-[var(--maroon)]/80 text-[var(--off-white)]",
      social: "bg-gradient-to-r from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)]",
      talks: "bg-[var(--pink)]/60 text-[var(--off-white)]"
    };
    return colors[type as keyof typeof colors] || "bg-gray-200 text-gray-800";
  };

  return (
    <section id="schedule" className="py-20 px-4 bg-[var(--off-white)] relative">
      {/* Art Deco Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--maroon) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--pink) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge variant="secondary" className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1">
              Conference Schedule
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Four Days of
            <span className="text-[var(--pink)]"> Discovery</span>
          </h2>
          
          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in transformative healthcare AI research, hands-on workshops, and 
            meaningful connections over three intensive days bridging data, AI, and innovation.
          </p>
        </div>

        <Tabs defaultValue="Day 1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-[var(--maroon)]/10">
            {Object.keys(scheduleData).map((date) => <TabsTrigger key={date}
              value={date} 
              className="data-[state=active]:bg-[var(--maroon)] data-[state=active]:text-[var(--off-white)]"
            >
              {date}
            </TabsTrigger>)}
          </TabsList>

          {Object.entries(scheduleData).map(([day, data]) => (
            <TabsContent key={day} value={day} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[var(--maroon)] mb-2">{data.title}</h3>
                <p className="text-[var(--maroon)]/70">{data.date}</p>
              </div>

              <div className="space-y-4">
                {data.events.map((event, index) => (
                  <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center space-x-4 md:w-1/4">
                        <div className="text-2xl font-bold text-[var(--maroon)]">{event.time}</div>
                        <div className="flex items-center space-x-1 text-[var(--maroon)]/60 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{event.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-[var(--maroon)] text-lg">{event.title}</h4>
                          <Badge className={getTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        
                        {event.speaker && (
                          <div className="flex items-center space-x-1 text-[var(--pink)]">
                            <Users className="w-4 h-4" />
                            <span>{event.speaker}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1 text-[var(--maroon)]/60">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}