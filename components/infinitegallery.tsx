"use client";

import { motion } from "framer-motion";
import { TROPHIES } from "@/data/gallery_images";

export const InfiniteGallery = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-black/20">
      {/* Gradient Overlays for smooth fade at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050505] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-transparent to-[#050505]" />

      <style>{`
        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex gap-6 w-max animate-scroll">
        {/* Duplicate images 4 times to ensure smooth loop on wide screens */}
        {[...TROPHIES, ...TROPHIES, ...TROPHIES, ...TROPHIES].map(
          (src, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              variants={{
                rest: { scale: 1, filter: "grayscale(100%)" },
                hover: { scale: 1.05, filter: "grayscale(0%)" },
              }}
              transition={{ duration: 0.5 }}
              className="relative w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl"
            >
              <img
                src={src.url}
                alt={`Gallery Image ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />

              <motion.div
                variants={{
                  rest: { opacity: 0, y: 50 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-1/2 p-4 flex flex-col justify-end z-20"
              >
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent backdrop-blur-lg -z-10"
                  style={{
                    maskImage:
                      "linear-gradient(to top, black 0%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, black 0%, transparent 100%)",
                  }}
                />
                <h3 className="text-white text-xl font-bold">{src.title}</h3>
                <p className="text-white/60 text-sm mt-2">{src.details}</p>
              </motion.div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};
