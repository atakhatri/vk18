import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useInView } from "framer-motion";

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

export { SectionHeader };
