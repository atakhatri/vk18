"use client";

import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?q=80&w=600&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1680290668641-55869098d639?q=80&w=600&auto=format&fit=crop",
];

export const InfiniteGallery = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-black/20">
      {/* Gradient Overlays for smooth fade at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-[#050505] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-transparent to-[#050505]" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
      >
        {/* Duplicate images 4 times to ensure smooth loop on wide screens */}
        {[
          ...GALLERY_IMAGES,
          ...GALLERY_IMAGES,
          ...GALLERY_IMAGES,
          ...GALLERY_IMAGES,
        ].map((src, index) => (
          <div
            key={index}
            className="relative w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer border border-white/10 shadow-2xl"
          >
            <img
              src={src}
              alt={`Gallery Image ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
