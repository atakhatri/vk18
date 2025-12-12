"use client";
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
              <StatCard key={i} stat={stat} index={i} />
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
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- BEST MATCHES SECTION --- */}
      <section className="py-8 ">
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
      <section
        id="gallery"
        className="py-50 relative flex items-center justify-center"
      >
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
    </main>
  );
}
