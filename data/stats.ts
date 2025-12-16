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
    details?: centuriesDetail[] | runsDetail[] | avgDetail[] | potsDetail[] | highScoreDetail[] | captaincyDetail[] | fiftiesDetail[] | awardsDetail[];
}

interface centuriesDetail {
    nation: string;
    centuries: number;
}

interface runsDetail {
    nation: string;
    runs: string | number;
}

interface avgDetail {
    nation: string;
    avg: number;
}

interface potsDetail {
    nation: string;
    pots: number;
}

interface highScoreDetail {
    nation: string;
    highScore: number;
}

interface captaincyDetail {
    format: string;
    winPercentage: number;
}

interface fiftiesDetail {
    nation: string;
    fifties: number;
}

interface awardsDetail {
    awards: string;
    years: number | string;
}

const STATS: Stat[] = [
    {
        label: "Intl. Centuries",
        value: "84",
        sub: "Second Highest",
        icon: Trophy,
        imageUrl: "/vk_centuries.png",
        details: [{ nation: "Australia", centuries: 17 }, { nation: "Sri Lanka", centuries: 15 }, { nation: "England", centuries: 14 }],
    },
    {
        label: "Intl. Runs",
        value: "27K+",
        sub: "Active Legend",
        icon: BarChart3,
        imageUrl: "/vk_runs.png",
        details: [{ nation: "Australia", runs: "4600+" }, { nation: "Sri Lanka", runs: "4200+" }, { nation: "England", runs: "4900+" }],
    },
    {
        label: "Batting Avg",
        value: "52.38",
        sub: "in Internationals",
        icon: Target,
        imageUrl: "/vk_avg.png",
        details: [{ nation: "Australia", avg: 55.2 }, { nation: "Sri Lanka", avg: 50.1 }, { nation: "England", avg: 58.7 }],
    },
    {
        label: "Player of Series",
        value: "22",
        sub: "Highest in Internationals",
        icon: Award,
        imageUrl: "/vk_pots.png",
        details: [{ nation: "Australia", pots: 5 }, { nation: "Sri Lanka", pots: 4 }, { nation: "England", pots: 6 }],
    },
    {
        label: "Highest Score", value: "254", sub: "vs South Africa", icon: Zap, imageUrl: "/vk_highest.png", details: [{ nation: "Australia", highScore: 254 }, { nation: "Sri Lanka", highScore: 248 }, { nation: "England", highScore: 250 }]
    },
    { label: "Captaincy Wins", value: "64%", sub: "Overall", icon: HomeIcon, imageUrl: "/vk_cap.png", details: [{ format: "Tests", winPercentage: 59 }, { format: "ODIs", winPercentage: 68 }, { format: "T20Is", winPercentage: 64 }] },
    { label: "T20I Fifties", value: "38", sub: "Second Highest", icon: Flame, imageUrl: "/vk2016.png", details: [{ nation: "Australia", fifties: 8 }, { nation: "West Indies", fifties: 6 }, { nation: "Pakistan", fifties: 5 }] },
    {
        label: "ICC Awards",
        value: "10",
        sub: "Most by any player",
        icon: TrophyIcon,
        imageUrl: "/vk_awards.png",
        details: [{ awards: "Sir Garfield Sobers Trophy", years: 2 }, { awards: "ICC ODI Player of the Year", years: 4 }, { awards: "ICC Male Cricketer of the Decade", years: "2011-20" }],
    },
];

export { STATS };