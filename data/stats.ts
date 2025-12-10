// --- Data (VK18 Theme) ---
import {
    Trophy,
    BarChart3,
    Target,
    Award,
    Zap,
    HomeIcon,
    Flame,
    TrophyIcon,
} from "lucide-react";
interface Stat {
    label: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
}


const STATS: Stat[] = [
    {
        label: "Intl. Centuries",
        value: "84",
        sub: "Second Highest",
        icon: Trophy,
        imageUrl: "/vk_centuries.png",
    },
    {
        label: "Intl. Runs",
        value: "27K+",
        sub: "Active Legend",
        icon: BarChart3,
        imageUrl: "/vk_runs.png",
    },
    {
        label: "Batting Avg",
        value: "52.38",
        sub: "in Internationals",
        icon: Target,
        imageUrl: "/vk_avg.png",
    },
    {
        label: "Player of Series",
        value: "22",
        sub: "Highest in Internationals",
        icon: Award,
        imageUrl: "/vk_pots.png",
    },
    { label: "Highest Score", value: "254", sub: "vs South Africa", icon: Zap, imageUrl: "/vk_highest.png" },
    { label: "Captaincy Wins", value: "70%", sub: "Overall", icon: HomeIcon, imageUrl: "/vk_cap.png" },
    { label: "T20I Fifties", value: "28", sub: "Second Highest", icon: Flame, imageUrl: "/vk2016.png" },
    {
        label: "ICC Awards",
        value: "9",
        sub: "Most by any player",
        icon: TrophyIcon,
        imageUrl: "/vk_awards.png",
    },
];

export { STATS };