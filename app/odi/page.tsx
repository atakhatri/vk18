"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useSpring } from "framer-motion";
import { SectionHeader } from "../../components/sectionheader";
import { ODI_STATS } from "../../data/odistat";

export default function ODIPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollY } = useScroll();

  // Fresh transitions for Hero
  // Zoom out effect for background
  const bgScale = useTransform(scrollY, [0, 1000], [1.2, 1]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);

  // Text moves up and fades
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Blur effect
  const blurVal = useTransform(scrollY, [0, 600], [0, 8]);
  const heroBlur = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r  from-amber-500 to-blue-600  transform origin-left z-50"
        style={{ scaleX }}
      />
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Background with Zoom & Parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-[url('/vk_odi_hero.jpg')] md:bg-[url('/odi/vk_odi_hero_desktop.jpeg')]"
          style={{
            scale: bgScale,
            y: bgY,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/40 to-black/60" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4"
          style={{
            y: textY,
            opacity: textOpacity,
            filter: heroBlur,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-4 inline-block px-6 py-2 bg-blue-600/20 border border-blue-500 rounded-full backdrop-blur-md">
              <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">
                The 50th Century Man
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">
              ODI{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                GOAT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
              Redefining consistency in the 50-over format.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS GRID --- */}
      <section className="py-20 relative z-20 -mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#050505]/80 backdrop-blur-xl rounded-t-3xl p-8 border-t border-white/10">
            <SectionHeader
              title="DOMINANCE"
              subtitle="One Day International Records"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {ODI_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition-all duration-500 ${
                    i === 0 || i === 3 || i === 4
                      ? "md:col-span-2"
                      : "md:col-span-1"
                  } ${
                    i % 2 === 0
                      ? "rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl"
                      : "rounded-tr-3xl rounded-bl-3xl rounded-tl-xl rounded-br-xl"
                  }`}
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors" />

                  <div className="relative z-10">
                    <div>
                      <p className="text-sm text-blue-300/80 font-medium tracking-wider uppercase mb-2">
                        {stat.label}
                      </p>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                      {stat.value}
                    </h3>
                    {stat.sub && (
                      <p className="text-lg text-gray-400 mt-1">{stat.sub}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
