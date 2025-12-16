import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Match } from "../types/match";

const MatchRow = ({ match, index }: { match: Match; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative border-b border-white/10 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group hover:z-20"
    >
      {match.bgUrl && (
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(${match.bgUrl})` }}
          variants={{
            hover: { opacity: 0.15 },
          }}
          initial={{ opacity: 0 }}
        />
      )}
      <div className="flex flex-col relative z-10">
        <div className="flex md:flex-row items-start md:items-center justify-between p-6">
          <div className="flex items-center gap-6">
            <div
              className={`w-3 h-16 rounded-full   ${
                match.result === "Won" ? "bg-blue-500" : "bg-red-500"
              } group-hover:h-20 transition-all duration-300 hidden md:block`}
            />
            <div>
              <h4 className="text-3xl font-bold text-white mb-1">
                {match.score}
              </h4>
              <p
                className={`${
                  match.opponent === "Pakistan" ? "text-green-600" : ""
                } ${
                  match.opponent === "Australia"
                    ? "text-yellow-600"
                    : "text-blue-800"
                } ${
                  match.opponent === "Sri Lanka" ? "text-orange-200" : ""
                } text-lg`}
              >
                vs {match.opponent}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-end mt-4 md:mt-0 gap-2 md:text-right">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} /> {match.date}
            </div>
            <div className="flex items-center gap-2 text-blue-500 text-sm font-bold">
              <MapPin size={16} /> {match.venue}
            </div>
          </div>
        </div>
        {match.details && (
          <motion.div
            variants={{
              hover: { height: "auto", opacity: 1, marginBottom: 24 },
            }}
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden px-6"
          >
            <p className="text-gray-300 text-sm md:text-base max-w-2xl">
              {match.details}
            </p>
          </motion.div>
        )}
      </div>
      {match.imageUrl && (
        <motion.img
          src={match.imageUrl}
          alt={match.opponent}
          className="absolute right-40 bottom-0 top-20 h-48 object-contain z-20 origin-bottom-right hidden md:block pointer-events-none"
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          variants={{
            hover: {
              opacity: 1,
              scale: 2,
              y: -20,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            },
          }}
        />
      )}
    </motion.div>
  );
};
export { MatchRow };
