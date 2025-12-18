import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { usePathname } from "next/navigation";

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pathname = usePathname();
  const isIpl = pathname?.includes("/ipl");

  return (
    <div ref={ref} className="mb-8 md:mb-16 relative z-10">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`${
          isIpl ? "text-yellow-500" : "text-blue-500"
        } font-bold tracking-widest uppercase mb-0 md:mb-2`}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-7xl font-black text-white mb-0 md:mb-4"
      >
        {title.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block ${
              isIpl ? "hover:text-red-600 " : "hover:text-blue-500"
            } transition-colors duration-300`}
          >
            {char}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export { SectionHeader };
