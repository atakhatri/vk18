"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp, Laptop, Smartphone, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useInView,
  animate,
} from "framer-motion";

import { SectionHeader } from "../components/sectionheader";
import { MatchRow } from "../components/matchrow";
import { RankingPodium } from "../components/rankingpodium";
import { InfiniteGallery } from "../components/infinitegallery";

import { STATS } from "../data/stats";
import { CHASES_STATS_DATA } from "../data/chases_stats";
import { BEST_MATCHES } from "../data/best_matches";

const AnimatedCounter = ({ value }: { value: number | string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const stringVal = value.toString();
  // Matches an optional sign, numbers, optional decimals, and captures the rest as a suffix (e.g. "K+", "%")
  const match = stringVal.match(/^([+-]?[\d.,]+)(.*)$/);
  const suffix = match ? match[2] : "";

  // Dynamically determine the number of decimal places based on the string value
  const decimals =
    match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useEffect(() => {
    if (inView && ref.current) {
      if (!match || isNaN(parseFloat(match[1]))) {
        ref.current.textContent = stringVal;
        return;
      }
      const numValue = parseFloat(match[1].replace(/,/g, ""));

      animate(0, numValue, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            const formatted = val
              .toFixed(decimals)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            ref.current.textContent = formatted + suffix;
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, stringVal, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
};

const Typewriter = ({
  text,
  delay = 0,
  speed = 0.015,
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    // Check for mobile device on mount
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowMobileWarning(true);
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <main className="min-h-screen bg-black font-sans text-white selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r  from-amber-500 to-blue-600  transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110 bg-[url('/vk_mobile.jpeg')] md:bg-[url('/virat2022.jpg')]"
          style={{
            y: bgParallax,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black" />

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
            <div className="mb-4 inline-block px-6 py-2 bg-amber-500/20 border border-amber-700 rounded-full">
              <span className="text-amber-400 font-bold tracking-widest text-sm">
                CRICKET LEGEND
              </span>
            </div>

            <SectionHeader title="VIRAT-KOHLI" subtitle="" />

            <p className="mb-8 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
              Former IND Captain | Chase Master
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  28215
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  INTL RUNS
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  85
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  CENTURIES
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  52.58
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  AVG
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  254*
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  HS
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section
        id="stats"
        className="bg-black text-white py-8 md:py-24 px-6 md:px-12 lg:px-[120px] w-full border-t border-white/10 overflow-hidden"
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-[160px] items-stretch">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="flex-1 flex flex-col justify-start"
            >
              <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
                <Typewriter text="The Numbers" delay={0} speed={0.012} />
                <br />
                <Typewriter text="behind " delay={0.25} speed={0.012} />
                <span className="font-dm-serif italic font-normal text-amber-500 ml-2">
                  <Typewriter text="The Legend" delay={0.35} speed={0.012} />
                </span>
              </h2>

              <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-lg whitespace-normal mb-16">
                <Typewriter
                  text="A glimpse into the legendary career of the run machine. For over a decade, Virat Kohli has consistently dominated world cricket across all formats."
                  delay={0.1}
                  speed={0.012}
                />
              </p>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24"
              >
                {STATS.map((stat: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                    className="flex flex-col"
                  >
                    <div className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3 text-white">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <div className="flex justify-center lg:justify-end items-center shrink-0 lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
                className="relative w-full max-w-[500px] lg:max-w-none lg:w-full aspect-square origin-center rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <img
                  src="/stat1.jpeg"
                  alt="Virat Kohli Statistics"
                  className="w-full h-full object-cover"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)] bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_120%)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHASES STATS SECTION --- */}
      <section className="bg-black text-white py-8 md:py-24 px-6 md:px-12 lg:px-[120px] w-full border-t border-white/10 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-[160px] items-stretch">
            {/* Left Column (Reversed to Right) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="flex-1 flex flex-col justify-start lg:pl-16"
            >
              <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
                <Typewriter text="The Ultimate" delay={0} speed={0.012} />
                <br />
                <span className="font-dm-serif italic font-normal text-amber-500">
                  <Typewriter text="Chase Master" delay={0.25} speed={0.012} />
                </span>
              </h2>

              <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-lg whitespace-normal mb-16">
                <Typewriter
                  text="Unmatched dominance when batting second. Taking his team across the finishing line has become second nature."
                  delay={0.1}
                  speed={0.012}
                />
              </p>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24"
              >
                {CHASES_STATS_DATA.map((stat: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                    className="flex flex-col"
                  >
                    <div className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3 text-white">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column (Reversed to Left) */}
            <div className="flex justify-center lg:justify-start items-center shrink-0 lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
                className="relative w-full max-w-[500px] lg:max-w-none lg:w-full aspect-square origin-center rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
              >
                <img
                  src="/stat1.jpeg"
                  alt="Virat Kohli Chase Master"
                  className="w-full h-full object-cover"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)] bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_120%)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RANKINGS SECTION --- */}
      <section className="py-12 bg-black/20">
        <div className="container mx-auto px-3 md:px-6">
          <SectionHeader title="DOMINANCE" subtitle="Peak ICC Rankings" />
          <RankingPodium />
        </div>
      </section>

      {/* --- BEST MATCHES SECTION --- */}
      <section id="matches" className="py-8 ">
        <div className="container mx-auto px-3 md:px-6">
          <SectionHeader title="TOP-KNOCKS" subtitle="Best Matches" />

          <div className="mt-0">
            {BEST_MATCHES.map((match, i) => (
              <MatchRow key={i} match={match} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY / QUOTE SECTION --- */}
      <section id="gallery" className="py-20 relative">
        <div className="container mx-auto px-3 md:px-6 mb-12">
          <SectionHeader
            title="TROPHIES"
            subtitle="Moments of Glory | Player Who Completed Cricket"
          />
        </div>
        <InfiniteGallery />
      </section>

      {/* --- QUOTE SECTION --- */}
      <section className="py-40 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2605&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-6xl font-black italic leading-tight mb-8">
              "I don't play for records.
              <br />
              <span className="text-blue-500">I play to win</span> matches for
              my country."
            </h3>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Floating Draggable IPL Button */}
      <motion.div
        drag={true}
        // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-50 cursor-grab active:cursor-grabbing"
      >
        <Link href="/ipl">
          <div className=" px-1 py-1 bg-white rounded-full shadow-lg shadow-white/50 backdrop-blur-md">
            <motion.img
              src="/ipl/ipl_logo.png"
              alt="IPL Stats"
              className="w-16 h-16 z-1 cursor-grab active:cursor-grabbing"
            />
          </div>
        </Link>
      </motion.div>

      {/* Mobile Experience Warning Modal */}
      {showMobileWarning && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowMobileWarning(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-gray-900 border border-gray-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl"
          >
            <button
              onClick={() => setShowMobileWarning(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center gap-6 mb-2">
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-500">Mobile</span>
                </div>

                <div className="h-px w-12 bg-gray-700" />

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Laptop className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs text-blue-400 font-medium">
                    Laptop
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">Better on Laptop</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                For the best immersive experience with animations and detailed
                stats, we recommend viewing this site on a larger screen.
              </p>

              <button
                onClick={() => setShowMobileWarning(false)}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors mt-2"
              >
                Continue Anyway
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
