import { Stat } from "@/types/stat";
import { motion } from "framer-motion";

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const getDetail = (detail: any) => {
    const keys = Object.keys(detail);
    const labelKey =
      keys.find((k) => ["nation", "awards"].includes(k)) || keys[0];
    const valueKey = keys.find((k) => k !== labelKey) || keys[1];
    return { label: detail[labelKey], value: detail[valueKey] };
  };

  return (
    <motion.div
      layout
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
        hover: {
          scale: 1.05,
          borderColor: "rgba(59, 130, 246, 0.5)",
          zIndex: 10,
          transition: { duration: 0.3, delay: 0 },
        },
      }}
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
          variants={{
            hidden: { opacity: 0.2, scale: 1 },
            visible: { opacity: 0.2, scale: 1 },
            hover: { opacity: 1, scale: 1.2 },
          }}
          transition={{ duration: 0.5 }}
        />
      )}
      <div className="relative z-10">
        <stat.icon className="text-amber-500 mb-4" size={32} />
        <h3 className="text-6xl font-black text-white mb-2">{stat.value}</h3>
        <p className="text-xl text-gray-300 font-bold">{stat.label}</p>
        <p className="text-sm text-gray-500 mt-2">{stat.sub}</p>
      </div>
      {stat.details && (
        <motion.div
          variants={{
            hidden: { height: 0, opacity: 0, marginTop: 0 },
            visible: { height: 0, opacity: 0, marginTop: 0 },
            hover: { height: "auto", opacity: 1, marginTop: 16 },
          }}
          className="relative z-30 overflow-y-auto max-h-40 pr-2"
        >
          <div className="pt-4 border-t border-white/10 space-y-2">
            {stat.details.map((detail: any, i: number) => {
              const { label, value } = getDetail(detail);
              return (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-blue-200 font-bold">{label}</span>
                  <span className="text-white font-bold">{value}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};
export { StatCard };
