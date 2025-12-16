interface Stat {
    label: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
    details?: chaseRunsDetail[] | chaseAvgDetail[] | chaseCenturiesDetail[] | chaseFiftiesDetail[] | ODIchaseAvgDetail[] | T20IchaseAvgDetail[];
}

import {
    ArrowUpRight,
    Flame,
    FlameKindling,
    Skull,
    Target,
    Trophy,
} from "lucide-react";

interface chaseRunsDetail {
    nation: string;
    runs: string | number;
}

interface chaseAvgDetail {
    nation: string;
    avg: number;
}

interface chaseCenturiesDetail {
    nation: string;
    centuries: number;
}

interface chaseFiftiesDetail {
    nation: string;
    fifties: number;
}

interface ODIchaseAvgDetail {
    nation: string;
    avg: number;
}
interface T20IchaseAvgDetail {
    nation: string;
    avg: number;
}


const CHASES_STATS: Stat[] = [
    {
        label: "Runs in Chases",
        value: "11,000+",
        sub: "All Formats",
        icon: ArrowUpRight,
        imageUrl: "/vk_chasing.png",
        details: [
            { nation: "Sri Lanka", runs: "2100+" },
            { nation: "West Indies", runs: "1900+" },
            { nation: "Australia", runs: "1850+" }
        ],

    },
    {
        label: "Centuries in Chases",
        value: "30",
        sub: "Most by any player",
        icon: Flame,
        imageUrl: "/vk_chases_century.png",
        details: [
            { nation: "Sri Lanka", centuries: 10 },
            { nation: "West Indies", centuries: 7 },
            { nation: "Australia", centuries: 7 } // 6 ODI + 1 Test
        ],
    },
    {
        label: "50+ Scores in Chases",
        value: "90+",
        sub: "Includes 100s & 50s",
        icon: FlameKindling,
        imageUrl: "/vk_chase50.png",
        details: [
            { nation: "West Indies", fifties: 18 },
            { nation: "Sri Lanka", fifties: 16 },
            { nation: "Australia", fifties: 16 }
        ],
    },
    {
        label: "Avg in Successful Chases",
        value: "84.50",
        sub: "Combined Limited Overs",
        icon: Trophy,
        imageUrl: "/vk_success_chases.png",
        details: [
            { nation: "Sri Lanka", avg: 92.5 },
            { nation: "England", avg: 80.2 },
            { nation: "Australia", avg: 72.1 }
        ],
    },
    {
        label: "Avg in successful chases (ODI)",
        value: "90.40",
        sub: "World Record",
        icon: Target,
        imageUrl: "/vk_chase_avgODI.png",
        details: [
            { nation: "Sri Lanka", avg: 95.84 },
            { nation: "England", avg: 85.14 },
            { nation: "South Africa", avg: 84.09 }
        ],
    },
    {
        label: "Avg in successful chases (T20I)",
        value: "78.61",
        sub: "Highest (Min 1000 runs)",
        icon: Skull,
        imageUrl: "/vk_chase_avgT20I.png",
        details: [
            { nation: "Sri Lanka", avg: 84.00 },
            { nation: "Pakistan", avg: 70.29 },
            { nation: "West Indies", avg: 57.00 }
        ],
    },
];

export const CHASES_STATS_DATA = CHASES_STATS;