"use client";
import { useState, useEffect } from "react";
import { ArrowUp, Laptop, Smartphone, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

import { SectionHeader } from "../components/sectionheader";
import { StatCard } from "../components/statcard";
import { MatchRow } from "../components/matchrow";
import { RankingPodium } from "../components/rankingpodium";
import { InfiniteGallery } from "../components/infinitegallery";

import { STATS } from "../data/stats";
import { CHASES_STATS_DATA } from "../data/chases_stats";
import { BEST_MATCHES } from "../data/best_matches";

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
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden">
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
                  27975
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  INTL RUNS
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  84
                </div>
                <div className="text-sm text-gray-400 tracking-widest font-bold">
                  CENTURIES
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  52.38
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
      <section id="stats" className="py-6 relative">
        <div className="container mx-auto px-3 md:px-6">
          <SectionHeader title="THE-NUMBERS" subtitle="Career Statistics" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat as any} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CHASES STATS SECTION --- */}
      <section className="py-6 ">
        <div className="container mx-auto px-3 md:px-6">
          <SectionHeader title="CHASE-MASTER" subtitle="Chasing Records" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-8">
            {CHASES_STATS_DATA.map((stat, i) => (
              <StatCard key={i} stat={stat as any} index={i} />
            ))}
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
