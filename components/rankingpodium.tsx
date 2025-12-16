"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import { RANKINGS } from "../data/rankings";

export const RankingPodium = () => {
  const containerRef = useRef(null);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Y values for the pillars (they move at different speeds)
  const yOdi = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yTest = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yT20 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const getMetric = (fmt: string) => RANKINGS.find((r) => r.format === fmt);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[500px] flex items-end justify-center gap-4 md:gap-8 pb-12 perspective-1000"
    >
      {/* Global Hover Images (Background) */}
      <div className="absolute inset-0 flex justify-between items-center px-4 md:px-12 pointer-events-none z-0">
        {/* Left Image */}
        <motion.img
          src={hoveredData?.imageUrl?.[0]}
          initial={{ opacity: 0, x: -50, rotate: -10, scale: 0.9 }}
          animate={{
            opacity: hoveredData ? 0.5 : 0,
            x: hoveredData ? 100 : 0,
            rotate: hoveredData ? 0 : 0,
            scale: hoveredData ? 1.3 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="w-64 h-96 object-cover rounded-2xl shadow-2xl border border-white/10"
        />
        {/* Right Image */}
        <motion.img
          src={hoveredData?.imageUrl?.[1]}
          initial={{ opacity: 0, x: 50, rotate: 10, scale: 0.9 }}
          animate={{
            opacity: hoveredData ? 0.5 : 0,
            x: hoveredData ? -100 : 0,
            rotate: hoveredData ? 0 : 0,
            scale: hoveredData ? 1.3 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="w-64 h-96 object-cover rounded-2xl shadow-2xl border border-white/10"
        />
      </div>

      {/* TEST (Left) */}
      <PodiumStep
        data={getMetric("Test")}
        y={yTest}
        height="h-80"
        color="from-gray-900 to-gray-700"
        delay={0.5}
        isCenter
        setHoveredData={setHoveredData}
      />
      {/* ODI (Center - Highest) */}
      <PodiumStep
        data={getMetric("ODI")}
        y={yOdi}
        height="h-64"
        color="from-blue-900 to-blue-700"
        delay={0}
        setHoveredData={setHoveredData}
      />

      {/* T20I (Right) */}
      <PodiumStep
        data={getMetric("T20I")}
        y={yT20}
        height="h-56"
        color="from-red-800 to-red-600"
        delay={0.2}
        setHoveredData={setHoveredData}
      />
    </div>
  );
};

const PodiumStep = ({
  data,
  y,
  height,
  color,
  isCenter = false,
  delay,
  setHoveredData,
}: any) => {
  if (!data) return null;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      animate(count, data.rating, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, data.rating, count]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      onHoverStart={() => {
        setIsHovered(true);
        setHoveredData(data);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        setHoveredData(null);
      }}
      className={`flex flex-col items-center relative group cursor-pointer transition-all duration-500 ${
        isCenter
          ? "z-10 scale-105"
          : "z-0 opacity-90 hover:opacity-100 hover:z-20"
      }`}
    >
      {isCenter && isHovered && <ParticleEffect />}
      {/* Floating Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        className="mb-6 text-center bg-gray-900/80 backdrop-blur-md border border-gray-700 p-4 rounded-xl shadow-xl group-hover:scale-110 group-hover:bg-gray-800 group-hover:border-amber-500/50 transition-all duration-300"
      >
        <div className="text-amber-500 font-bold text-xl tracking-widest">
          {data.year}
        </div>
        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
          {data.format} RANKING
        </div>
        <div className="text-2xl font-black text-white">
          <motion.span>{rounded}</motion.span> pts
        </div>
      </motion.div>

      {/* The Pillar */}
      <div
        className={`relative w-28 md:w-40 ${height} bg-linear-to-b ${color} rounded-t-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-end items-center p-6 border-t border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-300`}
      >
        <div className="text-6xl md:text-7xl font-black text-white/90 drop-shadow-lg">
          <span className="text-3xl align-top opacity-50">#</span>
          {data.rank}
        </div>
        <div className="w-12 h-1 bg-white/30 rounded-full mt-4 mb-2" />
        <div className="text-xs font-bold text-white/50 tracking-widest uppercase">
          {data.format}
        </div>
      </div>
    </motion.div>
  );
};

const ParticleEffect = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-visible">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: -150 - Math.random() * 100,
            x: (Math.random() - 0.5) * 60,
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute bottom-0 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_10px_#f59e0b]"
        />
      ))}
    </div>
  );
};
