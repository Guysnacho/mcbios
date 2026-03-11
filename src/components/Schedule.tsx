"use client";

import { FileText, LayoutList } from "lucide-react";
import { Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type ViewMode = "scroll" | "pdf";

function PdfPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center">
      <div className="bg-white/80 backdrop-blur-sm border border-[var(--maroon)]/20 rounded-2xl p-12 max-w-lg shadow-lg space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--maroon)]/10 flex items-center justify-center">
            <FileText className="w-10 h-10 text-[var(--maroon)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[var(--maroon)]">
            PDF Viewer Coming Soon
          </h3>
          <p className="text-[var(--maroon)]/70 leading-relaxed">
            An embedded view of the official program booklet will appear here,
            powered by{" "}
            <span className="font-semibold text-[var(--maroon)]">
              react-pdf
            </span>
            . For now, use the scrollable schedule view.
          </p>
        </div>
        <div className="text-xs text-[var(--maroon)]/40 font-mono border-t border-[var(--maroon)]/10 pt-4">
          {"// TODO: integrate react-pdf renderer"}
        </div>
      </div>
    </div>
  );
}

export function Schedule() {
  const [view, setView] = useState<ViewMode>("scroll");

  const getTypeColor = (type: string) => {
    const colors = {
      keynote: "bg-[var(--gold)] text-[var(--maroon)]",
      session: "bg-[var(--maroon)] text-[var(--off-white)]",
      workshop: "bg-[var(--pink)] text-[var(--off-white)]",
      networking:
        "bg-[var(--off-white)] text-[var(--maroon)] border border-[var(--maroon)]",
      break: "bg-gray-100 text-gray-600",
      ceremony: "bg-[var(--gold)] text-[var(--maroon)]",
      poster: "bg-[var(--pink)]/80 text-[var(--off-white)]",
      panel: "bg-[var(--maroon)]/80 text-[var(--off-white)]",
      social:
        "bg-gradient-to-r from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)]",
      talks: "bg-[var(--pink)]/60 text-[var(--off-white)]",
    };
    return colors[type as keyof typeof colors] || "bg-gray-200 text-gray-800";
  };

  return (
    <section
      id="schedule"
      className="py-20 px-4 relative"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--maroon) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--pink) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10 mt-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge
              variant="secondary"
              className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1"
            >
              Conference Schedule
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Three Days of
            <span className="text-[var(--pink)]"> Discovery</span>
          </h2>

          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in cutting-edge bioinformatics research, keynote
            speakers, and parallel sessions bridging genomics, AI, and precision
            medicine - March 27-29, 2026.
          </p>

          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-lg border border-[var(--maroon)]/20 bg-white/60 p-1 gap-1">
              <button
                onClick={() => setView("scroll")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  view === "scroll"
                    ? "bg-[var(--maroon)] text-[var(--off-white)] shadow-sm"
                    : "text-[var(--maroon)]/60 hover:text-[var(--maroon)]"
                }`}
              >
                <LayoutList className="w-4 h-4" />
                Scrollable
              </button>
              <button
                onClick={() => setView("pdf")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  view === "pdf"
                    ? "bg-[var(--maroon)] text-[var(--off-white)] shadow-sm"
                    : "text-[var(--maroon)]/60 hover:text-[var(--maroon)]"
                }`}
              >
                <FileText className="w-4 h-4" />
                PDF View
              </button>
            </div>
          </div>
        </div>

        {view === "pdf" ? (
          <PdfPlaceholder />
        ) : (
          <Tabs defaultValue="Day 1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-[var(--maroon)]/10">
            {Object.keys(scheduleData).map((date) => (
              <TabsTrigger
                key={date}
                value={date}
                className="data-[state=active]:bg-[var(--maroon)] data-[state=active]:text-[var(--off-white)]"
              >
                {date}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(scheduleData).map(([day, data]) => (
            <TabsContent key={day} value={day} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[var(--maroon)] mb-2">
                  {data.title}
                </h3>
                <p className="text-[var(--maroon)]/70">{data.date}</p>
              </div>

              <div className="space-y-4">
                {data.events.map((event, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center space-x-4 md:w-1/4">
                        <div className="text-2xl font-bold text-[var(--maroon)]">
                          {event.time}
                        </div>
                        {event.duration && (
                          <div className="flex items-center space-x-1 text-[var(--maroon)]/60 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{event.duration}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-[var(--maroon)] text-lg">
                            {event.title}
                          </h4>
                          <Badge className={getTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
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
        )}
      </div>
    </section>
  );
}

const scheduleData = {
  "Day 1": {
    date: "March 27, 2026 (Friday)",
    title: "Opening Day",
    events: [
      {
        time: "7:30 AM",
        title: "Registration & Breakfast",
        type: "networking",
        location:
          "Ted & Mary Couch Auditorium / SRB Ferman Family Room / SRB David Murphey Room",
        duration: "60 min",
      },
      {
        time: "8:30 AM",
        title: "Welcome Remarks",
        type: "ceremony",
        location: "Auditorium",
        duration: "15 min",
      },
      {
        time: "8:45 AM",
        title: "Keynote 1: Rafael A. Irizarry",
        speaker: "Rafael A. Irizarry - Dana-Farber",
        type: "keynote",
        location: "Auditorium",
        duration: "60 min",
      },
      {
        time: "9:45 AM",
        title:
          "Session 101: Innovative Computational Approaches for Decoding Biological Complexity from Single-Cell Data",
        speaker: "Chair: Shenglin Mei",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "9:45 AM",
        title:
          "Session 102: Multi-omics Integration to Decipher Disease Mechanisms",
        speaker: "Chair: Jianrong Wang",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "9:45 AM",
        title: "Session 103: AI in Genomics",
        speaker: "Chair: Yan Guo",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "11:00 AM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "11:15 AM",
        title:
          "Session 201: Computational Digital Twins for Translational Biomedical Informatics",
        speaker: "Chair: Jing Su",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "11:15 AM",
        title:
          "Session 202: Next-Generation Web Visual Analytics for Bioinformatics and Artificial Intelligence",
        speaker: "Chairs: Xijin Ge, Timothy Shaw",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "11:15 AM",
        title:
          "Session 203: From Omics to Network Pharmacology and Systems Medicine",
        speaker: "Chair: Zongliang Yue",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "12:30 PM",
        title: "Group Pictures",
        type: "ceremony",
        location: "Auditorium",
        duration: "10 min",
      },
      {
        time: "12:40 PM",
        title: "Lunch",
        type: "networking",
        location: "All Rooms",
        duration: "50 min",
      },
      {
        time: "1:30 PM",
        title: "Keynote 2: Ting Wang",
        speaker: "Ting Wang",
        type: "keynote",
        location: "Auditorium",
        duration: "60 min",
      },
      {
        time: "2:30 PM",
        title:
          "Session 301: Adverse Event: A Gold Mine for Data Science in Cancer Research",
        speaker: "Chairs: Dung-Tsa Chen, Aik Choon Tan",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "2:30 PM",
        title:
          "Session 302: Next-Generation Genomics and Bioinformatics for Pediatric Cancer and Congenital Disorders",
        speaker: "Chairs: Jatinder Lamba, Timothy I Shaw",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "2:30 PM",
        title:
          "Session 303: From Data to Discovery: Statistical Learning in Biomedicine",
        speaker: "Chair: Hui Jiang",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "3:45 PM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "4:00 PM",
        title:
          "Session 304: Single-Cell and Multi-Omics Genomics: Bridging Data and Innovation to Transform Health",
        speaker: "Chair: Zhaotong Lin",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "4:00 PM",
        title:
          "Session 305: Student Flash Talks from the ISCB Regional Meeting 2025",
        speaker: "Chairs: Leon Hardy, Timothy I Shaw",
        type: "talks",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "4:00 PM",
        title: "Session 306: YSEA (Post-doc / Undergrad & Grad Student)",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "5:15 PM",
        title: "MCBIOS Board Member Voting + Reception & Poster Session",
        type: "poster",
        location: "Auditorium / SRB Atrium",
        duration: "75 min",
      },
      {
        time: "6:30 PM",
        title: "MCBIOS Business Session (By Invitation Only)",
        type: "social",
        location: "Auditorium",
        duration: "",
      },
    ],
  },
  "Day 2": {
    date: "March 28, 2026 (Saturday)",
    title: "Research & Innovation",
    events: [
      {
        time: "7:30 AM",
        title: "Breakfast",
        type: "networking",
        location:
          "Ted & Mary Couch Auditorium / SRB Ferman Family Room / SRB David Murphey Room",
        duration: "60 min",
      },
      {
        time: "8:30 AM",
        title: "Keynote 3: Issam El Naqa",
        speaker: "Issam El Naqa",
        type: "keynote",
        location: "Auditorium",
        duration: "60 min",
      },
      {
        time: "9:30 AM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "9:45 AM",
        title:
          "Session 401: Advanced Computational Methods in Single-cell and Spatial Omics",
        speaker: "Chairs: Zhana Duren, Xiuwei Zhang, Peng Qiu",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "9:45 AM",
        title:
          "Session 402: Artificial Intelligence Innovations for Spatial Transcriptome Analysis",
        speaker: "Chair: Li Chen",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "9:45 AM",
        title:
          "Session 403: Careers in Bioinformatics: A Conversation with Industry Leaders",
        speaker: "Chair: Timothy I Shaw",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "11:00 AM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "11:15 AM",
        title: "Session 501: AI in Precision Medicine",
        speaker: "Chairs: Sophia Song, Mingxiang Teng",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "11:15 AM",
        title:
          "Session 502: Novel Machine Learning Methods in Genetics and Genomics",
        speaker: 'Chair: Zhaohui "Steve" Qin',
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "11:15 AM",
        title:
          "Session 503: AI-Driven 3D Genome Reconstruction and Multimodal Learning",
        speaker: "Chair: Oluwatosin Oluwadare",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "12:30 PM",
        title: "Lunch",
        type: "networking",
        location: "All Rooms",
        duration: "60 min",
      },
      {
        time: "1:30 PM",
        title: "Keynote 4: Jinghui Zhang",
        speaker: "Jinghui Zhang",
        type: "keynote",
        location: "Auditorium",
        duration: "60 min",
      },
      {
        time: "2:30 PM",
        title:
          "Session 601: AI Applications in Genomics and Bioinformatics (Genomics & Translational Bioinformatics Working Group)",
        speaker: "Chair: Ece Uzun",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "2:30 PM",
        title: "Session 602: AI and Foundation Models in Biomedicine",
        speaker: "Chair: Qianqian Song",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "2:30 PM",
        title:
          "Session 603: AI-Powered Bio-Discovery: A Multi-Level Collaborative Codeathon",
        speaker: "Chairs: Inimary Toby-Ogundeji, Emil Jivishov",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "3:45 PM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "4:00 PM",
        title: "Session 701: Machine Learning Advances in Single-cell Omics",
        speaker: "Chairs: Peng Qiu, Xiuwei Zhang, Zhana Duren",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "4:00 PM",
        title:
          "Session 702: Single Cell Spatial RNA and Protein in Cancer Research",
        speaker: "Chair: Alex Soupir",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "4:00 PM",
        title:
          "Session 703: Computational Frontiers in Patient-Derived Organoids",
        speaker: "Chairs: Riyue Bao, Brent T. Schlegel",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "5:15 PM",
        title: "Lightning Talks",
        type: "talks",
        location:
          "Ted & Mary Couch Auditorium / SRB Ferman Family Room / SRB David Murphey Room",
        duration: "30 min",
      },
    ],
  },
  "Day 3": {
    date: "March 29, 2026 (Sunday)",
    title: "Closing Day",
    events: [
      {
        time: "7:30 AM",
        title: "Breakfast",
        type: "networking",
        location:
          "Ted & Mary Couch Auditorium / SRB Ferman Family Room / SRB David Murphey Room",
        duration: "60 min",
      },
      {
        time: "7:30 AM",
        title: "MCBIOS Board Meeting (By Invitation Only)",
        type: "social",
        location: "Patel Room",
        duration: "60 min",
      },
      {
        time: "8:30 AM",
        title:
          "Session 801: Electronic Notebooks for Data Science: Strategies, Suggestions, Experiences",
        speaker: "Chair: Jamie Teer",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "8:30 AM",
        title:
          "Session 802: Advances in Statistical and Machine Learning Models for Genetics and Genomics",
        speaker: "Chairs: Tingting Hou, Xiaoxi Shen",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "8:30 AM",
        title:
          "Session 803: Introduction to Molecular Design: From Molecular Drawing to Computational Drug Design",
        speaker:
          "Chairs: Aleksandra Karolak, Katarzyna Mizgalska, Marina Gavrilovskaia",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "9:45 AM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "10:00 AM",
        title:
          "Session 901: Statistical Learning and Applications in Multi-Omics",
        speaker: "Chairs: Sophia Song, Mingxiang Teng",
        type: "session",
        location: "Ted & Mary Couch Auditorium",
        duration: "75 min",
      },
      {
        time: "10:00 AM",
        title:
          "Session 902: AI and Data Science Innovations in Precision Oncology",
        speaker: "Chairs: Jincheng Shen, Ann Chen",
        type: "session",
        location: "SRB Ferman Family Room",
        duration: "75 min",
      },
      {
        time: "10:00 AM",
        title: "Session 903: Computational Mass Spectrometry",
        speaker: "Chair: Paul Stewart",
        type: "session",
        location: "SRB David Murphey Room",
        duration: "75 min",
      },
      {
        time: "11:15 AM",
        title: "Break",
        type: "break",
        location: "All Rooms",
        duration: "15 min",
      },
      {
        time: "11:30 AM",
        title: "Announcement of Journal Partnership",
        type: "ceremony",
        location: "Auditorium",
        duration: "30 min",
      },
      {
        time: "12:00 PM",
        title: "Awards & Closing Ceremony",
        type: "ceremony",
        location: "Auditorium",
        duration: "30 min",
      },
    ],
  },
};
