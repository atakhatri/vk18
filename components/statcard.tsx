import { Stat } from "../types/stat";
import { motion } from "framer-motion";

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
      className="bg-white/8 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <stat.icon size={100} className="text-gray-400" />
      </div>
      {stat.imageUrl && (
        <motion.img
          src={stat.imageUrl}
          alt={stat.label}
          className="absolute inset-0 w-full h-full object-cover z-20 left-20"
          initial={{ opacity: 0.2, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <div className="relative z-10">
        <stat.icon className="text-amber-500 mb-4" size={32} />
        <h3 className="text-6xl font-black text-white mb-2">{stat.value}</h3>
        <p className="text-xl text-gray-300 font-bold">{stat.label}</p>
        <p className="text-sm text-gray-500 mt-2">{stat.sub}</p>
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
export { StatCard };
