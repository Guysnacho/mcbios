"use client";

import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Dna,
  ExternalLink,
  Globe,
  Info,
  Layers,
  Menu,
  Moon,
  Search,
  Send,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Configuration Constant for Session Proposal Form
const SESSION_PROPOSAL_URL = ""; // e.g. "https://conferencesuite.example.com/mcbios2027/submit"

// 16 Official Suggested Topics from Design Brief
const SUGGESTED_TOPICS = [
  {
    id: 1,
    title:
      "Application of Machine Learning in Components of Predictive Public Health",
    category: "Public Health",
  },
  {
    id: 2,
    title:
      "Artificial Intelligence (AI) Shakes Up Drug Discovery & Development",
    category: "Drug Discovery",
  },
  {
    id: 3,
    title: "Barriers and Pitfalls of AI Application in Clinical Medicine",
    category: "Clinical AI",
  },
  {
    id: 4,
    title: "Cancer Informatics & Precision Oncology",
    category: "Oncology",
  },
  {
    id: 5,
    title:
      "Characterization of Microbiome Ecology and Pathogen Virulence via AI/ML",
    category: "Microbiome",
  },
  {
    id: 6,
    title:
      "Computational Approaches in Decoding the Tumor Immune Microenvironment",
    category: "Oncology",
  },
  {
    id: 7,
    title: "Data-Centric AI and Regulatory Science",
    category: "Regulatory Science",
  },
  {
    id: 8,
    title: "Liquid Biopsy Science and Biomarker Discovery",
    category: "Biomarkers",
  },
  {
    id: 9,
    title: "Machine Learning and Single-Cell Genomics in Biology and Medicine",
    category: "Genomics",
  },
  {
    id: 10,
    title: "Machine Learning Applications in Toxicology",
    category: "Toxicology",
  },
  {
    id: 11,
    title: "Network Biology and Systems Medicine",
    category: "Systems Biology",
  },
  {
    id: 12,
    title: "Predicting, Modeling, and Testing of Drug Combinations",
    category: "Drug Discovery",
  },
  {
    id: 13,
    title:
      "Teaching and Learning Resources for Bioinformatics, Machine Learning, and AI",
    category: "Education",
  },
  {
    id: 14,
    title:
      "Terminologies, Standards, and Ethics in AI-Driven Biological Analysis",
    category: "Ethics & Standards",
  },
  {
    id: 15,
    title: "Text Analytics and LLMs for Drug Safety and Health Data",
    category: "LLMs & NLP",
  },
  {
    id: 16,
    title:
      "Toxicogenomics in the Assessment of Pharmacological and Environmental Toxicity",
    category: "Toxicology",
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [stubPageTitle, setStubPageTitle] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light'

  // Topic filter state for Session Proposals
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Proposal Deadline Target: Dec 15, 2026 (11:59 PM EST)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("December 15, 2026 23:59:59 EST").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (tab, title = "") => {
    setActiveTab(tab);
    setStubPageTitle(title);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Categories list
  const categories = [
    "All",
    ...new Set(SUGGESTED_TOPICS.map((t) => t.category)),
  ];

  // Filtered topics calculation
  const filteredTopics = SUGGESTED_TOPICS.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div
      className={`min-h-screen font-body transition-colors duration-500 flex flex-col relative overflow-x-hidden ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Inject Bacasime Antique Google Font & User Theme Variables */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bacasime+Antique&display=swap');

        :root {
          --text-50: #f3f8ec;
          --text-100: #e8f2d9;
          --text-200: #d1e4b4;
          --text-300: #bad78e;
          --text-400: #a3ca68;
          --text-500: #8cbd42;
          --text-600: #709735;
          --text-700: #547128;
          --text-800: #384b1b;
          --text-900: #1c260d;
          --text-950: #0e1307;
          
          --background-50: #f5f8ec;
          --background-100: #ebf1da;
          --background-200: #d6e4b4;
          --background-300: #c2d68f;
          --background-400: #aec969;
          --background-500: #99bb44;
          --background-600: #7b9636;
          --background-700: #5c7029;
          --background-800: #3d4b1b;
          --background-900: #1f250e;
          --background-950: #0f1307;
          
          --primary-50: #f3f8ec;
          --primary-100: #e7f2d9;
          --primary-200: #cfe5b3;
          --primary-300: #b7d88d;
          --primary-400: #a0cb67;
          --primary-500: #88be41;
          --primary-600: #6d9834;
          --primary-700: #517227;
          --primary-800: #364c1a;
          --primary-900: #1b260d;
          --primary-950: #0e1307;
          
          --secondary-50: #ecf2f9;
          --secondary-100: #d9e6f2;
          --secondary-200: #b3cce6;
          --secondary-300: #8cb2d9;
          --secondary-400: #6699cc;
          --secondary-500: #407fbf;
          --secondary-600: #336699;
          --secondary-700: #264c73;
          --secondary-800: #19334d;
          --secondary-900: #0d1926;
          --secondary-950: #060d13;
          
          --accent-50: #edecf8;
          --accent-100: #dcd9f2;
          --accent-200: #b9b3e5;
          --accent-300: #968dd8;
          --accent-400: #7367cb;
          --accent-500: #5041be;
          --accent-600: #403498;
          --accent-700: #302772;
          --accent-800: #201a4c;
          --accent-900: #100d26;
          --accent-950: #080713;
        }

        .dark {
          --text-50: #0e1307;
          --text-100: #1c260d;
          --text-200: #384b1b;
          --text-300: #547128;
          --text-400: #709735;
          --text-500: #8cbd42;
          --text-600: #a3ca68;
          --text-700: #bad78e;
          --text-800: #d1e4b4;
          --text-900: #e8f2d9;
          --text-950: #f3f8ec;
          
          --background-50: #0f1307;
          --background-100: #1f250e;
          --background-200: #3d4b1b;
          --background-300: #5c7029;
          --background-400: #7b9636;
          --background-500: #99bb44;
          --background-600: #aec969;
          --background-700: #c2d68f;
          --background-800: #d6e4b4;
          --background-900: #ebf1da;
          --background-950: #f5f8ec;
          
          --primary-50: #0e1307;
          --primary-100: #1b260d;
          --primary-200: #364c1a;
          --primary-300: #517227;
          --primary-400: #6d9834;
          --primary-500: #88be41;
          --primary-600: #a0cb67;
          --primary-700: #b7d88d;
          --primary-800: #cfe5b3;
          --primary-900: #e7f2d9;
          --primary-950: #f3f8ec;
          
          --secondary-50: #060d13;
          --secondary-100: #0d1926;
          --secondary-200: #19334d;
          --secondary-300: #264c73;
          --secondary-400: #336699;
          --secondary-500: #407fbf;
          --secondary-600: #6699cc;
          --secondary-700: #8cb2d9;
          --secondary-800: #b3cce6;
          --secondary-900: #d9e6f2;
          --secondary-950: #ecf2f9;
          
          --accent-50: #080713;
          --accent-100: #100d26;
          --accent-200: #201a4c;
          --accent-300: #302772;
          --accent-400: #403498;
          --accent-500: #5041be;
          --accent-600: #7367cb;
          --accent-700: #968dd8;
          --accent-800: #b9b3e5;
          --accent-900: #dcd9f2;
          --accent-950: #edecf8;
        }

        body, button, input, select {
          font-family: 'Bacasime Antique', Georgia, serif;
        }
      `}</style>

      {/* Main Theme Surface Wrapper */}
      <div className="flex-grow flex flex-col bg-[var(--background-50)] text-[var(--text-900)] transition-colors duration-300">
        {/* Dynamic 3D Bio-Vein Canvas Background */}
        <VeinBackground theme={theme} />

        {/* FIXED TOP NAVIGATION BAR WITH THEME SWITCHER */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-[var(--primary-500)]/30 bg-[var(--background-50)]/90 shadow-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo Tile & Brand */}
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 group focus:outline-none rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] p-[2px] shadow-lg shadow-[var(--primary-500)]/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[9px] flex items-center justify-center bg-[var(--background-100)]">
                  <Dna className="w-5 h-5 text-[var(--primary-500)] group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-xl tracking-tight text-[var(--text-950)]">
                  MCBIOS{" "}
                  <span className="text-[var(--primary-500)] drop-shadow-[0_0_8px_rgba(138,190,66,0.6)]">
                    2027
                  </span>
                </span>
                <span className="text-xs tracking-wider uppercase font-bold text-[var(--text-700)]">
                  Bioinformatics & AI
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: "sessions", label: "Session Proposals" },
                { id: "abstracts", label: "Abstracts" },
                { id: "ysea", label: "YSEA" },
                { id: "schedule", label: "Schedule" },
                { id: "accommodations", label: "Accommodations" },
                { id: "about", label: "About" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    link.id === "sessions"
                      ? navigateTo("sessions")
                      : navigateTo("stub", link.label)
                  }
                  className={`px-3 py-2 text-base font-bold transition-all relative group ${
                    activeTab === link.id ||
                    (activeTab === "stub" && stubPageTitle === link.label)
                      ? "text-[var(--primary-500)]"
                      : "text-[var(--text-800)] hover:text-[var(--text-950)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] rounded-full transition-transform duration-300 origin-left ${
                      activeTab === link.id ||
                      (activeTab === "stub" && stubPageTitle === link.label)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Desktop Actions & Theme Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-100)] text-[var(--primary-500)] hover:bg-[var(--background-200)] shadow-sm transition-all duration-300 flex items-center justify-center"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-[var(--primary-500)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--accent-500)]" />
                )}
              </button>

              {/* Action CTA Button */}
              <button
                onClick={() => navigateTo("sessions")}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-bold rounded-xl group bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] shadow-lg shadow-[var(--primary-500)]/20 active:scale-[0.98] transition-all"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 rounded-[10px] flex items-center gap-2 font-bold bg-[var(--background-50)] text-[var(--text-950)] group-hover:bg-opacity-0 group-hover:text-white">
                  <Sparkles className="w-4 h-4 text-[var(--primary-500)] group-hover:text-white" />
                  Submit Proposal
                </span>
              </button>
            </div>

            {/* Mobile Actions: Hamburger & Theme switch */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-[var(--primary-500)]/40 bg-[var(--background-100)] text-[var(--primary-500)]"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--accent-500)]" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-[var(--primary-500)]/40 bg-[var(--background-100)] text-[var(--text-900)]"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden backdrop-blur-2xl border-b border-[var(--primary-500)]/30 bg-[var(--background-50)]/95 px-4 pt-3 pb-6 space-y-2">
              {[
                { id: "sessions", label: "Session Proposals" },
                { id: "abstracts", label: "Abstracts" },
                { id: "ysea", label: "YSEA" },
                { id: "schedule", label: "Schedule" },
                { id: "accommodations", label: "Accommodations" },
                { id: "about", label: "About" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    link.id === "sessions"
                      ? navigateTo("sessions")
                      : navigateTo("stub", link.label)
                  }
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors text-[var(--text-900)] hover:bg-[var(--background-200)] hover:text-[var(--primary-500)]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-600)]" />
                </button>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => navigateTo("sessions")}
                  className="w-full py-3 bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] rounded-xl text-center font-bold text-white shadow-lg shadow-[var(--primary-500)]/25"
                >
                  Submit Session Proposal
                </button>
              </div>
            </div>
          )}
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow z-10">
          {activeTab === "home" && (
            <HomePage
              navigateTo={navigateTo}
              timeLeft={timeLeft}
              deadlinePassed={deadlinePassed}
              theme={theme}
            />
          )}

          {activeTab === "sessions" && (
            <SessionsPage
              navigateTo={navigateTo}
              deadlinePassed={deadlinePassed}
              setDeadlinePassed={setDeadlinePassed}
              filteredTopics={filteredTopics}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              theme={theme}
            />
          )}

          {activeTab === "stub" && (
            <StubPage
              title={stubPageTitle}
              navigateTo={navigateTo}
              theme={theme}
            />
          )}
        </main>

        {/* FOOTER */}
        <Footer navigateTo={navigateTo} theme={theme} />
      </div>
    </div>
  );
}

/* ==========================================
   DYNAMIC 3D BIO-VEIN CANVAS BACKGROUND
========================================== */
function VeinBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        window.innerHeight * 2.2,
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 32 }, () => ({
      t: Math.random(),
      speed: 0.0004 + Math.random() * 0.0006,
      offsetY: (Math.random() - 0.5) * 24,
      size: 2 + Math.random() * 3.5,
      opacity: 0.5 + Math.random() * 0.5,
    }));

    const getPointAlongVein = (t, width, height) => {
      const points = [
        { x: width * 0.82, y: 0 },
        { x: width * 0.18, y: height * 0.25 },
        { x: width * 0.85, y: height * 0.5 },
        { x: width * 0.15, y: height * 0.75 },
        { x: width * 0.78, y: height },
      ];

      const segmentCount = points.length - 1;
      const scaledT = t * segmentCount;
      const index = Math.min(Math.floor(scaledT), segmentCount - 1);
      const subT = scaledT - index;

      const p0 = points[index];
      const p1 = points[index + 1];

      return {
        x: p0.x + (p1.x - p0.x) * subT,
        y: p0.y + (p1.y - p0.y) * subT,
      };
    };

    let step = 0;

    const render = () => {
      step += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const totalSamples = 60;
      const spinePoints = [];
      for (let i = 0; i <= totalSamples; i++) {
        const t = i / totalSamples;
        const pt = getPointAlongVein(t, w, h);
        pt.x += Math.sin(step + t * 10) * 10;
        spinePoints.push(pt);
      }

      // Outer Bio-Green Glow
      ctx.beginPath();
      ctx.moveTo(spinePoints[0].x, spinePoints[0].y);
      for (let i = 1; i < spinePoints.length; i++) {
        ctx.lineTo(spinePoints[i].x, spinePoints[i].y);
      }
      ctx.lineWidth = 95;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle =
        theme === "dark"
          ? "rgba(138, 190, 66, 0.15)"
          : "rgba(138, 190, 66, 0.25)";
      ctx.stroke();

      // Outer Secondary Blue Wall
      ctx.beginPath();
      ctx.moveTo(spinePoints[0].x, spinePoints[0].y);
      for (let i = 1; i < spinePoints.length; i++) {
        ctx.lineTo(spinePoints[i].x, spinePoints[i].y);
      }
      ctx.lineWidth = 55;
      ctx.strokeStyle =
        theme === "dark"
          ? "rgba(64, 127, 191, 0.5)"
          : "rgba(51, 102, 153, 0.55)";
      ctx.stroke();

      // Inner Crimson Biological Lumen Core
      ctx.beginPath();
      ctx.moveTo(spinePoints[0].x, spinePoints[0].y);
      for (let i = 1; i < spinePoints.length; i++) {
        ctx.lineTo(spinePoints[i].x, spinePoints[i].y);
      }
      ctx.lineWidth = 24;
      ctx.strokeStyle = "rgba(255, 42, 95, 0.85)";
      ctx.stroke();

      // Inner Purple/Accent Core Line
      ctx.beginPath();
      ctx.moveTo(spinePoints[0].x, spinePoints[0].y);
      for (let i = 1; i < spinePoints.length; i++) {
        ctx.lineTo(spinePoints[i].x, spinePoints[i].y);
      }
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(115, 103, 203, 0.9)";
      ctx.stroke();

      // Floating bio-luminescent particles
      particles.forEach((p) => {
        p.t = (p.t + p.speed) % 1;
        const pt = getPointAlongVein(p.t, w, h);
        const nextPt = getPointAlongVein(Math.min(p.t + 0.01, 1), w, h);

        const dx = nextPt.x - pt.x;
        const dy = nextPt.y - pt.y;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;

        const px = pt.x + Math.cos(angle) * p.offsetY;
        const py = pt.y + Math.sin(angle) * p.offsetY;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 190, 66, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}

/* ==========================================
   HOME PAGE CONTENT
========================================== */
function HomePage({ navigateTo, timeLeft, deadlinePassed }) {
  return (
    <div className="space-y-24 pb-20 relative z-10">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Flanked Section Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent" />
          <span className="px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full border border-[var(--primary-500)]/50 bg-[var(--background-100)]/95 text-[var(--primary-600)] backdrop-blur-md flex items-center gap-2 shadow-lg shadow-[var(--primary-500)]/10">
            <BrainCircuit className="w-4 h-4 text-[var(--primary-500)] animate-pulse" />
            Flagship Regional Conference
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-[var(--primary-500)] to-transparent" />
        </div>

        <div className="text-center max-w-4xl mx-auto">
          {/* Main H1 Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="text-[var(--text-950)]">MCBIOS </span>
            <span className="bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(138,190,66,0.4)]">
              2027
            </span>
          </h1>

          {/* Dates & Theme */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 text-[var(--text-950)] text-base font-bold mb-8 backdrop-blur-md shadow-md">
            <Calendar className="w-4 h-4 text-[var(--primary-500)]" />
            <span>March 17-19, 2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight text-[var(--text-950)]">
            The Role of Artificial Intelligence in{" "}
            <br className="hidden sm:inline" />
            <span className="text-[var(--primary-500)] underline decoration-[var(--accent-500)] underline-offset-8">
              Biology & Medicine
            </span>
          </h2>

          <p className="text-xl sm:text-2xl italic mb-10 max-w-2xl mx-auto font-medium text-[var(--text-800)]">
            &ldquo;New intelligence. Deeper biological insights. Better
            medicine.&rdquo;
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigateTo("sessions")}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] hover:opacity-95 text-white font-black rounded-xl shadow-xl shadow-[var(--primary-500)]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group text-base"
            >
              Submit a Session Proposal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Disabled Registration Button with easy flip state */}
            <div className="w-full sm:w-auto relative group">
              <button
                disabled
                className="w-full sm:w-auto px-6 py-4 border border-[var(--primary-500)]/40 bg-[var(--background-100)]/80 text-[var(--text-700)] font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-base backdrop-blur-md"
              >
                <Clock className="w-4 h-4 text-[var(--text-700)]" />
                Registration Opens Jan 8
              </button>
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--background-900)] text-[var(--text-100)] text-xs py-1 px-3 rounded border border-[var(--primary-500)]/40 pointer-events-none whitespace-nowrap shadow-xl font-bold">
                Portal opens January 8, 2027
              </div>
            </div>
          </div>

          {/* Proposal Deadline Countdown Card */}
          <div className="max-w-2xl mx-auto backdrop-blur-xl border border-[var(--primary-500)]/50 bg-[var(--background-100)]/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-500)]/10 via-[var(--accent-500)]/5 to-[var(--secondary-500)]/10 opacity-60" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--accent-500)] mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-500)] animate-ping" />
                  Urgent Call Deadline
                </div>
                <h3 className="text-2xl font-extrabold text-[var(--text-950)]">
                  Session Proposals Due
                </h3>
                <p className="text-sm text-[var(--text-700)] font-bold">
                  December 15, 2026 (11:59 PM EST)
                </p>
              </div>

              {!deadlinePassed ? (
                <div className="flex items-center gap-2 sm:gap-3 text-center">
                  <div className="flex flex-col px-3 py-2.5 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-200)] min-w-[62px]">
                    <span className="text-2xl sm:text-3xl font-black text-[var(--primary-500)] drop-shadow-[0_0_6px_rgba(138,190,66,0.5)]">
                      {timeLeft.days}
                    </span>
                    <span className="text-xs uppercase font-bold text-[var(--text-800)]">
                      Days
                    </span>
                  </div>
                  <span className="text-[var(--text-800)] font-black text-xl">
                    :
                  </span>
                  <div className="flex flex-col px-3 py-2.5 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-200)] min-w-[62px]">
                    <span className="text-2xl sm:text-3xl font-black text-[var(--primary-500)] drop-shadow-[0_0_6px_rgba(138,190,66,0.5)]">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase font-bold text-[var(--text-800)]">
                      Hours
                    </span>
                  </div>
                  <span className="text-[var(--text-800)] font-black text-xl">
                    :
                  </span>
                  <div className="flex flex-col px-3 py-2.5 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-200)] min-w-[62px]">
                    <span className="text-2xl sm:text-3xl font-black text-[var(--primary-500)] drop-shadow-[0_0_6px_rgba(138,190,66,0.5)]">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase font-bold text-[var(--text-800)]">
                      Mins
                    </span>
                  </div>
                  <span className="text-[var(--text-800)] font-black text-xl">
                    :
                  </span>
                  <div className="flex flex-col px-3 py-2.5 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-200)] min-w-[62px]">
                    <span className="text-2xl sm:text-3xl font-black text-[var(--primary-500)] drop-shadow-[0_0_6px_rgba(138,190,66,0.5)]">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase font-bold text-[var(--text-800)]">
                      Secs
                    </span>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-500 font-bold text-base">
                  Proposals Closed
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY DATES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-black tracking-widest text-[var(--primary-500)] uppercase">
              Timeline
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-950)]">
              Key Conference Dates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Milestone 1 - Proposal Deadline */}
            <div className="backdrop-blur-md border border-[var(--primary-500)]/50 bg-[var(--background-50)] rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[var(--primary-500)] to-[var(--secondary-500)]" />
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-[var(--primary-500)]/20 text-[var(--primary-600)] rounded-md border border-[var(--primary-500)]/40">
                  Most Urgent
                </span>
                <Clock className="w-5 h-5 text-[var(--primary-500)]" />
              </div>
              <div className="text-2xl font-black mb-1 text-[var(--text-950)]">
                Dec 15, 2026
              </div>
              <div className="text-base font-bold text-[var(--primary-500)] mb-2">
                Session Proposals Deadline
              </div>
              <p className="text-sm text-[var(--text-800)] leading-relaxed font-medium">
                Final deadline for session leads to pitch 80-minute technical,
                tutorial, workshop, or panel tracks.
              </p>
            </div>

            {/* Milestone 2 - Registration Opens */}
            <div className="backdrop-blur-md border border-[var(--primary-500)]/30 bg-[var(--background-50)] rounded-2xl p-6 shadow-lg relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--secondary-500)]" />
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-[var(--secondary-500)]/20 text-[var(--secondary-600)] rounded-md border border-[var(--secondary-500)]/40">
                  Upcoming
                </span>
                <Calendar className="w-5 h-5 text-[var(--secondary-500)]" />
              </div>
              <div className="text-2xl font-black mb-1 text-[var(--text-950)]">
                Jan 8, 2027
              </div>
              <div className="text-base font-bold text-[var(--secondary-500)] mb-2">
                Registration Portal Opens
              </div>
              <p className="text-sm text-[var(--text-800)] leading-relaxed font-medium">
                Early-bird registration opens worldwide for researchers,
                clinicians, postdocs, and students.
              </p>
            </div>

            {/* Milestone 3 - Conference Dates */}
            <div className="backdrop-blur-md border border-[var(--primary-500)]/30 bg-[var(--background-50)] rounded-2xl p-6 shadow-lg relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent-500)]" />
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-[var(--accent-500)]/20 text-[var(--accent-600)] rounded-md border border-[var(--accent-500)]/40">
                  Main Event
                </span>
                <Sparkles className="w-5 h-5 text-[var(--accent-500)]" />
              </div>
              <div className="text-2xl font-black mb-1 text-[var(--text-950)]">
                Mar 17-19, 2027
              </div>
              <div className="text-base font-bold text-[var(--accent-500)] mb-2">
                MCBIOS 2027 Conference
              </div>
              <p className="text-sm text-[var(--text-800)] leading-relaxed font-medium">
                Three intensive days of technical sessions, hands-on workshops,
                oral talks, and networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE THEME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Section Flanked Header */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--primary-500)]" />
            <span className="text-xs font-black uppercase tracking-widest text-[var(--primary-500)]">
              Scientific Scope
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--primary-500)]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 text-[var(--text-950)]">
            Pioneering Next-Gen{" "}
            <span className="text-[var(--primary-500)] drop-shadow-[0_0_12px_rgba(138,190,66,0.5)]">
              Biomedical AI
            </span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg leading-relaxed">
            <p className="p-6 rounded-2xl border border-[var(--primary-500)]/30 bg-[var(--background-50)] text-[var(--text-900)] font-medium">
              The 2027 MCBIOS Annual Conference focuses on late-breaking
              research at the intersection of data science, machine learning,
              and artificial intelligence applied to disease biology modeling,
              genomics, systems biology, computational drug discovery, and
              clinical informatics.
            </p>
            <p className="p-6 rounded-2xl border border-[var(--primary-500)]/30 bg-[var(--background-50)] text-[var(--text-900)] font-medium">
              With AI rapidly reshaping precision medicine and predictive
              healthcare, MCBIOS 2027 brings together domain experts and
              emerging talent to explore scalable algorithms, regulatory
              science, biomarker discovery, and deep biological insight aimed
              directly at improving human health.
            </p>
          </div>

          {/* Domain Tags */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              "Genomics & Single-Cell",
              "Translational Bioinformatics",
              "Drug Discovery & Development",
              "Clinical AI & Ethics",
              "Precision Oncology",
              "Microbiome Ecology",
              "Toxicogenomics",
              "Systems Medicine",
            ].map((tag, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-200)] text-[var(--text-950)] text-xs font-extrabold hover:border-[var(--primary-500)] hover:text-[var(--primary-500)] transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL FOR SESSION PROPOSALS TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-gradient-to-br from-[var(--background-100)]/95 via-[var(--background-50)]/95 to-[var(--background-100)]/95 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-500)]/15 border border-[var(--primary-500)]/40 text-[var(--primary-500)] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Call for Proposals
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-950)]">
                Shape the MCBIOS 2027{" "}
                <span className="text-[var(--accent-500)]">
                  Scientific Program
                </span>
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-800)] font-medium">
                We invite researchers, educators, and industry leads to submit
                proposals for workshops, tutorials, panels, and technical
                sessions across 16 curated themes or custom pitches.
              </p>

              {/* Sample Topic Chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-xs text-[var(--text-700)] block w-full font-bold">
                  Featured sample topics:
                </span>
                <span className="px-3 py-1 rounded-lg border border-[var(--primary-500)]/40 bg-[var(--background-200)] text-xs font-extrabold text-[var(--primary-600)]">
                  AI in Drug Discovery
                </span>
                <span className="px-3 py-1 rounded-lg border border-[var(--secondary-500)]/40 bg-[var(--background-200)] text-xs font-extrabold text-[var(--secondary-600)]">
                  Single-Cell & ML Genomics
                </span>
                <span className="px-3 py-1 rounded-lg border border-[var(--accent-500)]/40 bg-[var(--background-200)] text-xs font-extrabold text-[var(--accent-600)]">
                  Cancer Precision Oncology
                </span>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-center gap-4 p-6 rounded-2xl border border-[var(--primary-500)]/40 bg-[var(--background-50)] min-w-[280px] shadow-lg">
              <div className="text-center">
                <div className="text-xs uppercase font-black text-[var(--text-700)] tracking-wider">
                  Deadline
                </div>
                <div className="text-xl font-black text-[var(--primary-500)]">
                  December 15, 2026
                </div>
              </div>
              <button
                onClick={() => navigateTo("sessions")}
                className="w-full py-3 px-6 bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] hover:opacity-95 text-white font-black rounded-xl shadow-lg shadow-[var(--primary-500)]/20 transition-all flex items-center justify-center gap-2 group text-base"
              >
                View Grid & Submit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMING UP (CARDS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--accent-500)]" />
            <span className="text-xs font-black uppercase tracking-widest text-[var(--accent-500)]">
              Modules
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--accent-500)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-950)]">
            What&apos;s{" "}
            <span className="text-[var(--accent-500)]">Coming Up</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Registration Portal",
              badge: "Opens Jan 8",
              desc: "Register for 3 days of scientific sessions, workshops, and networking receptions.",
              icon: Users,
              page: "Registration",
            },
            {
              title: "Call for Abstracts",
              badge: "Coming Soon",
              desc: "Submit oral presentation and poster abstracts across computational biology & AI.",
              icon: BookOpen,
              page: "Abstracts",
            },
            {
              title: "YSEA Awards",
              badge: "Grads & Postdocs",
              desc: "Young Scientist Excellence Podium & Poster Awards dedicated to training next-gen researchers.",
              icon: Award,
              page: "YSEA Awards",
            },
            {
              title: "Workshops & Networking",
              badge: "Details Soon",
              desc: "Hands-on coding workshops, mentoring tables, and social receptions.",
              icon: Layers,
              page: "Workshops & Networking",
            },
            {
              title: "Program Schedule",
              badge: "3-Day Agenda",
              desc: "Complete 3-day schedule breakdown including keynotes, talks, and poster sessions.",
              icon: Calendar,
              page: "Conference Schedule",
            },
            {
              title: "Accommodations",
              badge: "TBA",
              desc: "Hotel blocks, venue details, and travel guidelines will be announced soon.",
              icon: Globe,
              page: "Accommodations",
            },
          ].map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                onClick={() => navigateTo("stub", card.page)}
                className="backdrop-blur-xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--primary-500)] cursor-pointer group flex flex-col justify-between shadow-lg shadow-[var(--primary-500)]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-200)] flex items-center justify-center text-[var(--primary-500)] font-bold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-md border border-[var(--primary-500)]/30 bg-[var(--background-200)] text-[var(--text-800)]">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2 text-[var(--text-950)] group-hover:text-[var(--primary-500)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[var(--text-700)] font-medium leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center text-sm font-bold text-[var(--primary-500)] group-hover:underline">
                  <span>Explore details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. ABOUT MCBIOS (BRIEF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex items-center gap-2 text-[var(--primary-500)] text-xs font-black uppercase tracking-widest">
                <Globe className="w-4 h-4" /> Regional ISCB Affiliate
              </div>
              <h2 className="text-3xl font-black text-[var(--text-950)]">
                About the{" "}
                <span className="text-[var(--primary-500)]">
                  MCBIOS Society
                </span>
              </h2>
              <p className="text-base leading-relaxed font-medium text-[var(--text-800)]">
                Founded in 2003 by researchers at the FDA National Center for
                Toxicological Research (NCTR) in Little Rock, Arkansas,{" "}
                <strong>MCBIOS</strong> (MidSouth Computational Biology and
                Bioinformatics Society) is one of only two regional North
                American societies officially affiliated with ISCB, the
                world&apos;s largest bioinformatics organization.
              </p>
              <p className="text-base leading-relaxed font-medium text-[var(--text-800)]">
                Our mission is to foster networking, collaboration, and
                professional development among researchers, clinicians,
                postdocs, and students at all career levels in a welcoming,
                collegial atmosphere.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo("stub", "About MCBIOS")}
                  className="inline-flex items-center gap-2 text-base font-bold text-[var(--primary-500)] hover:underline transition-colors"
                >
                  Read full society history & leadership
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Stats Block */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {[
                {
                  stat: "2003",
                  label: "Founded at FDA NCTR",
                  color: "text-[var(--primary-500)]",
                },
                {
                  stat: "100+",
                  label: "Annual Attendees",
                  color: "text-[var(--secondary-500)]",
                },
                {
                  stat: "ISCB",
                  label: "Regional Affiliate",
                  color: "text-[var(--accent-500)]",
                },
                {
                  stat: "YSEA",
                  label: "Student Excellence",
                  color: "text-[var(--primary-500)]",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="border border-[var(--primary-500)]/30 bg-[var(--background-50)] p-4 rounded-2xl text-center backdrop-blur-md"
                >
                  <div className={`text-3xl font-black ${s.color}`}>
                    {s.stat}
                  </div>
                  <div className="text-xs text-[var(--text-800)] mt-1 font-bold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================
   SESSION PROPOSALS PAGE CONTENT
========================================== */
function SessionsPage({
  navigateTo,
  deadlinePassed,
  setDeadlinePassed,
  filteredTopics,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      {/* 1. HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--primary-500)]" />
          <span className="px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-[var(--primary-500)]/15 text-[var(--primary-500)] border border-[var(--primary-500)]/40 rounded-full">
            Call for Sessions
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--primary-500)]" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-950)]">
          Lead a Session at{" "}
          <span className="bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] bg-clip-text text-transparent">
            MCBIOS 2027
          </span>
        </h1>

        {/* Dynamic Deadline Notice Banner */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div
            className={`px-6 py-3 rounded-2xl border flex items-center gap-3 backdrop-blur-md shadow-xl transition-all ${
              deadlinePassed
                ? "bg-red-950/50 border-red-500/50 text-red-200"
                : "bg-[var(--background-100)] border-[var(--primary-500)]/50 text-[var(--text-950)]"
            }`}
          >
            {deadlinePassed ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : (
              <Clock className="w-5 h-5 text-[var(--primary-500)]" />
            )}
            <span className="text-base font-bold">
              {deadlinePassed ? (
                <>
                  Proposal Deadline:{" "}
                  <span className="font-black text-red-400">CLOSED</span>
                </>
              ) : (
                <>
                  Proposal Deadline:{" "}
                  <span className="font-black text-[var(--primary-500)]">
                    December 15, 2026
                  </span>{" "}
                  (11:59 PM EST)
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => setDeadlinePassed(!deadlinePassed)}
            className={`${process.env.NODE_ENV === "development" ? "hidden " : undefined}text-xs px-3 py-1.5 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-200)] text-[var(--text-900)] hover:text-[var(--primary-500)] font-extrabold`}
            title="Toggle deadline state for testing"
          >
            [Dev Toggle: {deadlinePassed ? "Open Deadline" : "Simulate Closed"}]
          </button>
        </div>
      </div>

      {/* 2. CALL-LETTER INTRO */}
      <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl">
        <div className="space-y-4 text-base sm:text-lg leading-relaxed font-medium text-[var(--text-900)]">
          <p>
            We warmly welcome you to submit a session proposal for MCBIOS 2027.
            The conference theme,
            <strong className="text-[var(--primary-500)] font-black">
              {" "}
              &ldquo;The Role of Artificial Intelligence in Biology and
              Medicine&rdquo;
            </strong>
            , highlights pioneering approaches in data science, machine
            learning, and AI applied across disease biology, computational drug
            discovery, precision oncology, and clinical informatics.
          </p>
          <p>
            Please help spread the word about MCBIOS 2027 across your
            departments, institutions, and professional networks. We look
            forward to seeing you in 2027!
          </p>
          <div className="pt-4 border-t border-[var(--primary-500)]/30 flex flex-col">
            <span className="font-black text-base text-[var(--text-950)]">
              Inimary Toby-Ogundeji, PhD
            </span>
            <span className="text-sm text-[var(--text-700)] font-bold">
              MCBIOS 2027 Organizing Committee Chair
            </span>
          </div>
        </div>
      </div>

      {/* 3. SUGGESTED TOPICS GRID WITH INTERACTIVE FILTER */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2 text-[var(--text-950)]">
              <Sparkles className="w-5 h-5 text-[var(--primary-500)]" />
              Suggested Topics
            </h2>
            <p className="text-sm text-[var(--text-700)] font-bold">
              Proposers are encouraged to pitch one of these topics or propose
              custom titles.
            </p>
          </div>

          {/* Search Bar & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[var(--text-700)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-50)] text-[var(--text-950)] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-50)] text-[var(--text-950)] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((t) => (
            <div
              key={t.id}
              className="backdrop-blur-md border border-[var(--primary-500)]/30 bg-[var(--background-100)]/90 hover:border-[var(--primary-500)] rounded-2xl p-5 transition-all flex items-start gap-4 group shadow-md"
            >
              <div className="w-8 h-8 rounded-xl border border-[var(--primary-500)]/40 bg-[var(--background-200)] flex items-center justify-center text-[var(--primary-500)] font-black text-sm shrink-0">
                {t.id}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--primary-500)] bg-[var(--primary-500)]/15 px-2 py-0.5 rounded border border-[var(--primary-500)]/30">
                  {t.category}
                </span>
                <h3 className="text-base font-bold leading-snug text-[var(--text-950)] group-hover:text-[var(--primary-500)] transition-colors">
                  {t.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 bg-[var(--background-100)] rounded-2xl border border-[var(--primary-500)]/30">
            <p className="text-[var(--text-700)] text-base font-bold">
              No topics match your search query.
            </p>
          </div>
        )}
      </div>

      {/* 4. SESSION FORMATS & GUIDELINES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formats Panel */}
        <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2 text-[var(--text-950)]">
              <Layers className="w-5 h-5 text-[var(--secondary-500)]" />
              Session Formats
            </h3>
            <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider bg-[var(--background-300)] text-[var(--text-900)] rounded">
              TBC for 2027
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              {
                title: "Technical Session",
                desc: "Invited talks & late-breaking research presentations",
              },
              {
                title: "Tutorial",
                desc: "Step-by-step software tools & workflow demos",
              },
              {
                title: "Workshop",
                desc: "Hands-on coding or computational exercises",
              },
              {
                title: "Panel Discussion",
                desc: "Moderated debate on ethics, AI standards or policy",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="border border-[var(--primary-500)]/30 bg-[var(--background-50)] p-3.5 rounded-xl space-y-1"
              >
                <div className="text-sm font-black text-[var(--secondary-500)]">
                  {f.title}
                </div>
                <div className="text-xs text-[var(--text-700)] font-bold">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Panel */}
        <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-[var(--background-100)]/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2 text-[var(--text-950)]">
              <CheckCircle2 className="w-5 h-5 text-[var(--primary-500)]" />
              Submission Guidelines
            </h3>
            <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider bg-[var(--background-300)] text-[var(--text-900)] rounded">
              TBC for 2027
            </span>
          </div>

          <ul className="space-y-3 text-sm text-[var(--text-900)] font-medium pt-2">
            <li className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-50)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-500)] mt-1.5 shrink-0" />
              <span>
                <strong>Session Duration:</strong> Standard sessions are
                scheduled for <strong>80 minutes</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-50)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-500)] mt-1.5 shrink-0" />
              <span>
                <strong>Co-Speakers:</strong> Up to{" "}
                <strong>3 additional co-speakers</strong> per proposed track.
              </span>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--primary-500)]/30 bg-[var(--background-50)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-500)] mt-1.5 shrink-0" />
              <span>
                <strong>Presentation Format:</strong> All session presentations
                are expected <strong>in-person</strong>.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5. SUBMIT PANEL */}
      <div className="backdrop-blur-2xl border border-[var(--primary-500)]/40 bg-gradient-to-r from-[var(--background-100)]/95 via-[var(--background-50)]/95 to-[var(--background-100)]/95 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary-500)]/15 border border-[var(--primary-500)]/40 flex items-center justify-center mx-auto text-[var(--primary-500)] shadow-inner">
            <Send className="w-7 h-7" />
          </div>

          <h2 className="text-3xl font-black text-[var(--text-950)]">
            Ready to Submit?
          </h2>
          <p className="text-base leading-relaxed font-medium text-[var(--text-800)]">
            Submissions will be managed through the Conference Suite portal.
            Please prepare your proposal summary and speaker details before
            launching the form.
          </p>

          {!deadlinePassed ? (
            SESSION_PROPOSAL_URL ? (
              <a
                href={SESSION_PROPOSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] hover:opacity-95 text-white font-black rounded-xl shadow-xl shadow-[var(--primary-500)]/25 transition-all text-base"
              >
                Launch Submission Portal
                <ExternalLink className="w-5 h-5" />
              </a>
            ) : (
              <div className="space-y-3">
                <button
                  disabled
                  className="px-8 py-4 border border-[var(--primary-500)]/40 bg-[var(--background-200)] text-[var(--text-700)] font-extrabold rounded-xl cursor-not-allowed text-base inline-flex items-center gap-2"
                >
                  <Info className="w-5 h-5 text-[var(--primary-500)]" />
                  Submission link coming soon
                </button>
                <p className="text-xs text-[var(--text-700)] font-extrabold">
                  The Conference Suite submission form link will be published
                  here shortly.
                </p>
              </div>
            )
          ) : (
            <div className="px-6 py-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 font-black text-base max-w-md mx-auto">
              Session proposals for MCBIOS 2027 are now closed. Thank you!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   STUB / PLACEHOLDER PAGE
========================================== */
function StubPage({ title, navigateTo }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-8 relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-[var(--primary-500)]/15 border border-[var(--primary-500)]/40 flex items-center justify-center mx-auto text-[var(--primary-500)]">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="px-3 py-1 text-xs font-black uppercase tracking-widest bg-[var(--background-200)] text-[var(--text-900)] rounded-full border border-[var(--primary-500)]/30">
          Under Construction
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-950)]">
          {title}
        </h1>
        <p className="text-[var(--text-800)] text-base max-w-lg mx-auto font-medium">
          Detailed announcements, dates, and guidelines for{" "}
          <strong>{title}</strong> will be published as conference planning
          progresses.
        </p>
      </div>

      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => navigateTo("home")}
          className="px-6 py-3 border border-[var(--primary-500)]/40 bg-[var(--background-100)] text-[var(--text-950)] font-bold rounded-xl hover:border-[var(--primary-500)] transition-colors text-base"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigateTo("sessions")}
          className="px-6 py-3 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white font-black rounded-xl shadow-lg shadow-[var(--primary-500)]/20 hover:opacity-95 transition-all text-base"
        >
          View Session Proposals
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   FOOTER COMPONENT
========================================== */
function Footer({ navigateTo }) {
  return (
    <footer className="relative z-10 border-t border-[var(--primary-500)]/30 bg-[var(--background-100)]/95 backdrop-blur-xl pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[var(--primary-500)]/30">
          {/* Identity Block */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-500)] p-[2px]">
                <div className="w-full h-full rounded-[6px] bg-[var(--background-50)] flex items-center justify-center">
                  <Dna className="w-4 h-4 text-[var(--primary-500)]" />
                </div>
              </div>
              <span className="font-black text-xl text-[var(--text-950)]">
                MCBIOS 2027
              </span>
            </div>

            <p className="text-sm text-[var(--text-800)] leading-relaxed max-w-sm font-medium">
              MidSouth Computational Biology and Bioinformatics Society flagship
              conference. Fostering regional collaboration and scientific
              excellence since 2003.
            </p>

            <div className="space-y-1 text-sm font-bold">
              <div className="text-[var(--primary-500)] flex items-center gap-2">
                <Calendar className="w-4 h-4" /> March 17-19, 2027
              </div>
              <div className="text-[var(--text-700)] italic">
                Venue information coming soon
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-base font-black uppercase tracking-wider text-[var(--text-950)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              {[
                { label: "Session Proposals", id: "sessions" },
                { label: "Call for Abstracts", title: "Abstracts" },
                { label: "YSEA Awards", title: "YSEA" },
                { label: "Program Schedule", title: "Schedule" },
                { label: "Accommodations", title: "Accommodations" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() =>
                      item.id
                        ? navigateTo(item.id)
                        : navigateTo("stub", item.title)
                    }
                    className="text-[var(--text-800)] hover:text-[var(--primary-500)] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-base font-black uppercase tracking-wider text-[var(--text-950)]">
              Resources
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              {[
                { label: "About MCBIOS", title: "About MCBIOS" },
                {
                  label: "ISCB Regional Affiliation",
                  title: "ISCB Affiliation",
                },
                { label: "Mentorship & Diversity", title: "Mentorship" },
                { label: "Conference Suite Form", title: "Submission Form" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo("stub", item.title)}
                    className="text-[var(--text-800)] hover:text-[var(--primary-500)] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External Society Link Column */}
          <div className="space-y-3">
            <h4 className="text-base font-black uppercase tracking-wider text-[var(--text-950)]">
              Main Society
            </h4>
            <p className="text-sm text-[var(--text-800)] font-medium">
              Learn more about year-round activities and membership.
            </p>
            <a
              href="https://mcbios.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--primary-500)] hover:underline"
            >
              mcbios.org <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-700)] font-bold">
          <div>
            © 2003-2027 MidSouth Computational Biology and Bioinformatics
            Society. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://mcbios.com/bylaws"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-500)] transition-colors"
            >
              Society Bylaws
            </a>
            <span>•</span>
            <button
              onClick={() => navigateTo("stub", "Privacy Policy")}
              className="hover:text-[var(--primary-500)] transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
