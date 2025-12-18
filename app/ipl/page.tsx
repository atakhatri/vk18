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
  TOP_PSHIPS,
  WINNING_MOMENTS,
  ORANGE_CAPS,
} from "../../data/ipl_stats";
import { useRef, useEffect } from "react";
import { ArrowDown, TrendingUp, Trophy, Flame } from "lucide-react";
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

const PartnershipRow = ({ data, index }: { data: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const xContent = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [-50, 50] : [50, -50]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-16`}
    >
      {/* Image Card */}
      <div className="w-full md:w-1/2 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt={data.label}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            ) : (
              <data.icon className="w-24 h-24 text-red-600/20 group-hover:text-red-600/40 transition-colors duration-500" />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center gap-2 text-yellow-500 font-mono text-sm tracking-widest">
              <data.icon className="w-4 h-4" />
              <span>{data.sub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ x: xContent, y }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-2 uppercase tracking-widest">
          {data.label}
        </h3>
        <div className="text-6xl md:text-8xl font-black text-white mb-4 leading-none">
          {data.value}
        </div>
        <div className="h-1 w-24 bg-red-600 mx-auto md:mx-0 mb-6 rounded-full" />
        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
          {data.details}
        </p>
      </motion.div>
    </motion.div>
  );
};

const WinningMoment = ({ data }: { data: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${data.bgimageUrl})` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/60 to-[#050505] z-10" />

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-20 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-3 mb-8 px-8 py-3 bg-yellow-500/20 border border-yellow-500/50 rounded-full backdrop-blur-xl"
        >
          <data.icon className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
            {data.label}
          </span>
        </motion.div>

        <h2 className="text-[6rem] md:text-[12rem] font-black text-white leading-none mb-2 tracking-tighter drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]">
          {data.value}
        </h2>

        <div className="text-2xl md:text-4xl font-bold text-gray-200 mb-8 font-mono tracking-tight">
          {data.sub}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light drop-shadow-lg">
            {data.details}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const OrangeCapItem = ({ data, index }: { data: any; index: number }) => {
  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {index === 0 ? (
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-transparent z-10" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent z-10" />
        )}
        <img
          src={data.imageUrl}
          alt={data.label}
          className="w-full h-full object-cover scale-110"
        />
      </div>

      {/* 2016 Special Flame Effect */}
      {data.year === "2016" && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/40 via-orange-500/20 to-transparent mix-blend-overlay" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-black/40 backdrop-blur-md border border-orange-500/50 rounded-full">
          <data.icon
            className={`w-5 h-5 ${
              data.year === "2016"
                ? "text-orange-500 animate-pulse"
                : "text-yellow-500"
            }`}
          />
          <span
            className={`font-bold tracking-widest ${
              data.year === "2016" ? "text-orange-500" : "text-yellow-500"
            }`}
          >
            {data.year}
          </span>
        </div>

        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
          {data.label}
        </h2>

        <div
          className={`text-6xl md:text-9xl font-black mb-8 ${
            data.year === "2016"
              ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 animate-pulse drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]"
              : "text-white drop-shadow-2xl"
          }`}
        >
          {data.value}
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`h-1 w-32 mx-auto mb-8 rounded-full ${
              data.year === "2016"
                ? "bg-gradient-to-r from-orange-500 to-red-600"
                : "bg-yellow-500"
            }`}
          />
          <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light drop-shadow-lg">
            {data.details}
          </p>
        </div>
      </div>
    </div>
  );
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
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white"
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
          className="absolute inset-0 bg-cover bg-center scale-110 bg-[url('/ipl/ipl_mobile.jpeg')] md:bg-[url('/ipl/ipl_web.jpeg')]"
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
              <div className="text-4xl md:text-5xl font-bold mb-2 md:text-transparent bg-linear-to-b from-red-600 to-gray-800 bg-clip-text">
                <CountUp to={8661} />
              </div>
              <div className="text-sm text-red-600 tracking-widest font-bold">
                IPL RUNS
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 md:text-transparent bg-linear-to-b from-red-600 to-gray-800 bg-clip-text">
                <CountUp to={8} />
              </div>
              <div className="text-sm text-red-600 tracking-widest font-bold">
                CENTURIES
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 md:text-transparent bg-linear-to-b from-red-600 to-gray-800 bg-clip-text">
                <CountUp to={39.55} decimals={2} />
              </div>
              <div className="text-sm text-red-600 tracking-widest font-bold">
                AVG
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 md:text-transparent bg-linear-to-b from-red-600 to-gray-800 bg-clip-text">
                <CountUp to={113} />
              </div>
              <div className="text-sm text-red-600 tracking-widest font-bold">
                HS
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            onClick={() => {
              document
                .getElementById("stats")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
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
                <span className="text-red-500 font-bold tracking-widest text-sm pl-23 md:p-0">
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
              <div className="text-gray-400 font-mono md:mt-2">
                {runsData.sub}
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <div className="h-[150px] md:h-[400px] flex items-end gap-2 border-b border-white/10 md:pb-2">
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
                      className={`w-full rounded-t-sm transition-all ease-in-out relative ${
                        item.won
                          ? "bg-linear-to-t from-yellow-500 to-red-600 shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:bg-linear-to-t hover:from-red-600 hover:to-yellow-500 transition-colors ease-in-out"
                          : item.orangeCap
                          ? "bg-orange-600 hover:bg-linear-to-t hover:from-orange-600 hover:to-yellow-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                          : "bg-red-600 hover:bg-gradient-to-t hover:from-red-600 hover:to-gray-500"
                      }`}
                    >
                      {item.won && (
                        <Trophy className="absolute -top-6 md:-top-9 left-1/2 -translate-x-1/2 w-4 h-4 md:w-8 md:h-8 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-pulse" />
                      )}
                      {item.orangeCap && (
                        <Flame className="absolute -top-6 md:-top-9 left-1/2 -translate-x-1/2 w-4 h-4 md:w-8 md:h-8 text-red-500 fill-yellow-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" />
                      )}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-9 opacity-0 group-hover:opacity-100 text-md text-yellow-500 font-bold transition-opacity whitespace-nowrap z-20">
                        {item.runs}
                      </div>
                    </motion.div>
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
      <section className="md:py-24 relative z-10 bg-gradient-to-b from-[#050505] to-[#050505]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Average Chart */}
            <div>
              <div className="mb-6">
                <SectionHeader title={`${avgData.label}`} subtitle="" />

                <div className="text-6xl font-black text-gray-400">
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
                        className="w-full bg-red-600 hover:bg-gradient-to-t hover:from-red-600 hover:to-gray-500 rounded-t-sm transition-all"
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
            <div className="flex flex-col justify-center gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Flame className="w-32 h-32 " />
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
          </div>
        </div>
      </section>

      {/* --- ORANGE CAPS SECTION --- */}
      <section className="relative z-10 bg-[#050505]">
        <div className="pt-24 pb:0 container mx-auto px-4 text-center">
          <SectionHeader title="ORANGE-CAPS" subtitle="Season Dominance" />
        </div>
        <div>
          {ORANGE_CAPS.map((cap, index) => (
            <OrangeCapItem key={index} data={cap} index={index} />
          ))}
        </div>
      </section>

      {/* --- PARTNERSHIPS SECTION --- */}
      <section
        id="matches"
        className="py-32 relative z-10 bg-[#050505] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-900/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="PARTNERSHIPS"
            subtitle="Record Breaking Stands"
          />

          <div className="mt-24 flex flex-col gap-32">
            {TOP_PSHIPS.map((pship, index) => (
              <PartnershipRow key={index} data={pship} index={index} />
            ))}
          </div>
        </div>
      </section>

      {WINNING_MOMENTS.map((moment, index) => (
        <WinningMoment key={index} data={moment} />
      ))}

      {/* Floating Draggable IPL Button */}
      <motion.div
        drag={true}
        dragElastic={0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-14 md:bottom-10 md:right-10 z-50 cursor-grab active:cursor-grabbing"
      >
        <Link href="/">
          <div className=" px-4 py-4 bg-white rounded-full shadow-lg shadow-white/50 backdrop-blur-md">
            <Home className="w-10 h-10 text-black" />
          </div>
        </Link>
      </motion.div>
    </main>
  );
}
