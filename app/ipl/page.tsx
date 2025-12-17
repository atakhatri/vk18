"use client";
import { Home } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { SectionHeader } from "../../components/sectionheader";
import Link from "next/link";
import {
  IPL_RUNS,
  IPL_AVG,
  IPL_CENTURIES,
  IPL_FIFTIES,
} from "../../data/ipl_stats";
import { useRef, useEffect } from "react";
import { ArrowDown, TrendingUp, Trophy } from "lucide-react";
const CountUp = ({
  to,
  decimals = 0,
  duration = 2.5,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView || !ref.current) return;

    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      onUpdate: (value) => {
        node.textContent = value.toFixed(decimals);
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [to, decimals, duration, inView]);

  return <span ref={ref}>0</span>;
};

export default function IplPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroBlur = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["blur(0px)", "blur(20px)"]
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const runsData = IPL_RUNS[0];
  const avgData = IPL_AVG[0];
  const centuriesData = IPL_CENTURIES[0];
  const fiftiesData = IPL_FIFTIES[0];

  // Helper to get max value for charts
  const maxRuns = Math.max(
    ...(runsData.details?.map((d: any) => d.runs) || [0]),
    1
  );
  const maxAvg = Math.max(
    ...(avgData.details?.map((d: any) => d.average) || [0]), // Ensure at least 1 to avoid division by zero
    1
  );
  const maxCenturies = Math.max(
    ...(centuriesData.details?.map((d: any) => d.centuries) || [0]),
    1
  );
  const maxFifties = Math.max(
    ...(fiftiesData.details?.map((d: any) => d.fifties) || [0]),
    1
  );

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-yellow-500 transform origin-left z-50"
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
            <div className="mb-4 inline-block px-6 py-2 bg-red-600/20 border border-red-600 rounded-full">
              <span className="text-red-500 font-bold tracking-widest text-sm">
                IPL GOAT
              </span>
            </div>

            <SectionHeader title="VIRAT-KOHLI" subtitle="" />

            <p className="mb-8 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
              IPL GOAT | RCB Icon | Run Machine
            </p>
          </div>
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                <CountUp to={8661} />
              </div>
              <div className="text-sm text-yellow-500 tracking-widest font-bold">
                IPL RUNS
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                <CountUp to={8} />
              </div>
              <div className="text-sm text-yellow-500 tracking-widest font-bold">
                CENTURIES
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                <CountUp to={39.55} decimals={2} />
              </div>
              <div className="text-sm text-yellow-500 tracking-widest font-bold">
                AVG
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                <CountUp to={113} />
              </div>
              <div className="text-sm text-yellow-500 tracking-widest font-bold">
                HS
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest text-gray-400 uppercase">
              Explore Stats
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-6 h-6 text-red-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- RUNS PROGRESSION --- */}
      <section id="stats" className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-red-500" />
                <span className="text-red-500 font-bold tracking-widest text-sm pl-21 md:p-0">
                  CONSISTENCY
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase leading-none">
                <SectionHeader title={`${runsData.label}`} subtitle="" />
              </h2>
            </div>
            <div className="text-right">
              <div className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600">
                {runsData.value}
              </div>
              <div className="text-gray-400 font-mono mt-2">{runsData.sub}</div>
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <div className="h-[150px] md:h-[400px] flex items-end gap-2 border-b border-white/10 pb-2">
              {runsData.details?.map((item: any, i: number) => {
                const height = (item.runs / maxRuns) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 flex items-end justify-center h-full group relative"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${Math.max(height, 2)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.03 }}
                      className="w-full bg-yellow-500/50 hover:bg-gradient-to-b hover:from-red-600 hover:to-yellow-500 rounded-t-sm transition-all ease-in-out"
                    />
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 text-md text-yellow-500 font-bold transition-opacity">
                      {item.runs}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
              <span>2008</span>

              <span>2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- AVERAGE & MILESTONES --- */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-[#050505] to-red-950/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Average Chart */}
            <div>
              <div className="mb-6">
                <SectionHeader title={`${avgData.label}`} subtitle="" />

                <div className="text-6xl font-black text-yellow-500">
                  {avgData.value}
                </div>
                <p className="text-gray-400 mt-2">{avgData.sub}</p>
              </div>

              <div className="h-[100px] md:h-[300px] flex items-end gap-2 border-b border-white/10 pb-2">
                {avgData.details?.map((item: any, i: number) => {
                  const height = (item.average / maxAvg) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 flex items-end justify-center h-full group relative"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${Math.max(height, 2)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.03 }}
                        className="w-full bg-yellow-500/50 hover:bg-gradient-to-t hover:from-red-600 hover:to-yellow-500 rounded-t-sm transition-all"
                      />
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 text-xs text-yellow-500 font-bold transition-opacity">
                        {item.average}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
                <span>2008</span>
                <span>2025</span>
              </div>
            </div>

            {/* Milestones */}
            <div className="flex flex-col justify-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="text-sm text-gray-400 tracking-widest mb-2 uppercase">
                    {centuriesData.label}
                  </div>
                  <div className="text-7xl font-black text-white group-hover:text-red-500 transition-colors">
                    <CountUp to={Number(centuriesData.value)} />
                  </div>
                  <div className="mt-4 text-gray-500">{centuriesData.sub}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="text-sm text-gray-400 tracking-widest mb-2 uppercase">
                    {fiftiesData.label}
                  </div>
                  <div className="text-7xl font-black text-white group-hover:text-yellow-500 transition-colors">
                    <CountUp to={Number(fiftiesData.value)} />
                  </div>
                  <div className="mt-4 text-gray-500">{fiftiesData.sub}</div>
                </div>
              </motion.div>
            </div>

            {/* Floating Draggable IPL Button */}
            <motion.div
              drag={true}
              dragElastic={0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-50 cursor-grab active:cursor-grabbing"
            >
              <Link href="/">
                <div className=" px-4 py-4 bg-white rounded-full shadow-lg shadow-white/50 backdrop-blur-md">
                  <Home className="w-10 h-10 text-black" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
