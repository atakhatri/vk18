"useqc";
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionTemplate,
} from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Target,
  Award,
  ChevronDown,
  MapPin,
  Calendar,
  Zap,
  Home as HomeIcon,
  BarChart3,
  Image as ImageIcon,
  Tent,
  TrophyIcon,
} from "lucide-react";

// --- Types ---
interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
}

interface Match {
  opponent: string;
  score: string;
  date: string;
  result: "Won" | "Lost";
  venue: string;
}

// --- Data (VK18 Theme) ---
const STATS: Stat[] = [
  {
    label: "Intl. Centuries",
    value: "84",
    sub: "Second Highest",
    icon: Trophy,
  },
  {
    label: "Intl. Runs",
    value: "27K+",
    sub: "Active Legend",
    icon: BarChart3,
  },
  {
    label: "Batting Avg",
    value: "52.38",
    sub: "in Internationals",
    icon: Target,
  },
  {
    label: "Player of Series",
    value: "22",
    sub: "Highest in Internationals",
    icon: Award,
  },
  { label: "Highest Score", value: "254", sub: "vs South Africa", icon: Zap },
  { label: "Captaincy Wins", value: "70%", sub: "Overall", icon: HomeIcon },
  { label: "T20I Fifties", value: "28", sub: "Second Highest", icon: Calendar },
  {
    label: "ICC Awards",
    value: "9",
    sub: "Most by any player",
    icon: TrophyIcon,
  },
];

const CHASES_STATS: Stat[] = [
  {
    label: "Runs in Chases",
    value: "7800+",
    sub: "Highest overall",
    icon: Tent,
  },
  {
    label: "Centuries in Chases",
    value: "27",
    sub: "Most by any player",
    icon: Tent,
  },
  {
    label: "50+ Scores in Chases",
    value: "45",
    sub: "Top in history",
    icon: Tent,
  },
  {
    label: "Avg in Successful Chases",
    value: "88.98",
    sub: "#1 All-time",
    icon: Tent,
  },
  {
    label: "Avg in successful chases (ODI)",
    value: "90.23",
    sub: "Highest in ODIs",
    icon: Tent,
  },
  {
    label: "Avg in successful chases (T20I)",
    value: "95.40",
    sub: "Highest in T20Is",
    icon: Tent,
  },
];

const RECENT_MATCHES: Match[] = [
  {
    opponent: "Australia",
    score: "85 (116)",
    date: "Oct 08, 2023",
    result: "Won",
    venue: "Chennai",
  },
  {
    opponent: "Pakistan",
    score: "122* (94)",
    date: "Sep 11, 2023",
    result: "Won",
    venue: "Colombo",
  },
  {
    opponent: "South Africa",
    score: "101* (121)",
    date: "Nov 05, 2023",
    result: "Won",
    venue: "Kolkata",
  },
];

// --- Components ---

const ParallaxText = ({
  children,
  velocity = 5,
  className = "",
}: {
  children: React.ReactNode;
  velocity?: number;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, velocity * 100]);

  return (
    <motion.div
      style={{ y }}
      className={`absolute pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-16 relative z-10">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-blue-500 font-bold tracking-widest uppercase mb-2"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black text-white"
      >
        {title.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block hover:text-blue-500 transition-colors duration-300"
          >
            {char}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
      className="bg-white/8 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <stat.icon size={100} />
      </div>
      <div className="relative z-10">
        <stat.icon className="text-blue-500 mb-4" size={32} />
        <h3 className="text-6xl font-black text-white mb-2">{stat.value}</h3>
        <p className="text-xl text-gray-300 font-bold">{stat.label}</p>
        <p className="text-sm text-gray-500 mt-2">{stat.sub}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const MatchRow = ({ match, index }: { match: Match; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-white/10 hover:bg-white/5 px-6 rounded-xl transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-6">
        <div
          className={`w-3 h-16 rounded-full ${
            match.result === "Won" ? "bg-green-500" : "bg-red-500"
          } group-hover:h-20 transition-all duration-300`}
        />
        <div>
          <h4 className="text-3xl font-bold text-white mb-1">{match.score}</h4>
          <p className="text-gray-400 text-lg">vs {match.opponent}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-end mt-4 md:mt-0 gap-2 md:text-right">
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} /> {match.date}
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} /> {match.venue}
        </div>
      </div>
    </motion.div>
  );
};

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", icon: HomeIcon, label: "Home" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "matches", icon: Calendar, label: "Matches" },
    { id: "gallery", icon: ImageIcon, label: "Gallery" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "scale-110" : ""
                  } transition-transform`}
                />
                <span
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "max-w-[100px] opacity-100 ml-2"
                      : "max-w-0 opacity-0"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for inactive items */}
                {!isActive && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero Parallax Transforms based on scroll pixel value (scrollY)
  const bgParallax = useTransform(scrollY, [0, 1000], [0, 300]); // Moves background slower (0.3x)
  const heroContentY = useTransform(scrollY, [0, 1000], [0, 500]); // Moves content faster (0.5x)
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]); // Fades out
  const heroBlurVal = useTransform(scrollY, [0, 1000], [0, 10]); // Blurs out
  const heroBlur = useMotionTemplate`blur(${heroBlurVal}px)`;

  // Stats section parallax (shares same visual language as hero)
  const statsBgParallax = useTransform(scrollY, [200, 1200], [0, 200]);
  const statsContentY = useTransform(scrollY, [200, 1200], [40, -60]);
  const statsOpacity = useTransform(scrollY, [200, 1000], [1, 0.9]);
  const statsBlurVal = useTransform(scrollY, [200, 1200], [0, 6]);
  const statsBlur = useMotionTemplate`blur(${statsBlurVal}px)`;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/6e/e5/c7/6ee5c799d76bf37fc35d26e55acc8cf0.jpg')`,
            y: bgParallax,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        {/* Content with separate parallax (Blur + Move + Fade) */}
        <motion.div
          className="relative h-full flex flex-col items-center justify-center px-4"
          style={{
            y: heroContentY,
            filter: heroBlur,
            opacity: heroOpacity,
          }}
        >
          <div className="text-center">
            <div className="mb-4 inline-block px-6 py-2 bg-blue-700/20 border border-blue-700 rounded-full">
              <span className="text-blue-400 font-bold tracking-widest text-sm">
                CRICKET LEGEND
              </span>
            </div>

            <SectionHeader title="VIRAT-KOHLI" subtitle="" />

            <p className="mb-8 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
              Former Indian Captain | Modern Master | King of Chases
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  26,733
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  INTL RUNS
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  80
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  CENTURIES
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  53.63
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  AVG
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  94.27
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  SR (T20I)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section id="stats" className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeader title="THE-NUMBERS" subtitle="Career Statistics" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CHASES STATS SECTION --- */}
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <SectionHeader title="THE-CHASE-MASTER" subtitle="Chasing Records" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {CHASES_STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY / QUOTE SECTION --- */}
      <section
        id="gallery"
        className="py-50 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2605&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-6xl font-black italic leading-tight mb-8">
              "I don't play for records.
              <br />
              <span className="text-blue-500">I play to win</span> matches for
              my country."
            </h3>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
