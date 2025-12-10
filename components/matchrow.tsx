import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Match } from "../types/match";

const MatchRow = ({ match, index }: { match: Match; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-white/10 hover:bg-white/5 px-6 rounded-xl transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-6">
        <div
          className={`w-3 h-16 rounded-full ${
            match.result === "Won" ? "bg-green-500" : "bg-red-500"
          } group-hover:h-20 transition-all duration-300`}
        />
        <div>
          <h4 className="text-3xl font-bold text-white mb-1">{match.score}</h4>
          <p className="text-gray-400 text-lg">vs {match.opponent}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-end mt-4 md:mt-0 gap-2 md:text-right">
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} /> {match.date}
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} /> {match.venue}
        </div>
      </div>
    </motion.div>
  );
};
export { MatchRow };
