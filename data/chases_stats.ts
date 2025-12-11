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
        value: "7800+",
        sub: "Highest overall",
        icon: ArrowUpRight,
        imageUrl: "/vk_chasing.png",
        details: [{ nation: "Australia", runs: 3200 }, { nation: "England", runs: 2500 }, { nation: "Sri Lanka", runs: 2100 }],

    },
    {
        label: "Centuries in Chases",
        value: "27",
        sub: "Most by any player",
        icon: Flame,
        imageUrl: "/vk_chases_century.png",
        details: [{ nation: "Australia", centuries: 8 }, { nation: "England", centuries: 5 }, { nation: "Sri Lanka", centuries: 4 }],
    },
    {
        label: "50+ Scores in Chases",
        value: "45",
        sub: "Top in history",
        icon: FlameKindling,
        imageUrl: "/vk_chase50.png",
        details: [{ nation: "Australia", fifties: 12 }, { nation: "England", fifties: 9 }, { nation: "Sri Lanka", fifties: 7 }],
    },
    {
        label: "Avg in Successful Chases",
        value: "88.98",
        sub: "#1 All-time",
        icon: Target,
        imageUrl: "/vk_success_chases.png",
        details: [{ nation: "Australia", avg: 102.5 }, { nation: "England", avg: 95.2 }, { nation: "Sri Lanka", avg: 88.1 }],
    },
    {
        label: "Avg in successful chases (ODI)",
        value: "90.23",
        sub: "Highest in ODIs",
        icon: Target,
        imageUrl: "/vk_chase_avgODI.png",
        details: [{ nation: "Australia", avg: 110.5 }, { nation: "England", avg: 98.2 }, { nation: "Sri Lanka", avg: 90.1 }],
    },
    {
        label: "Avg in successful chases (T20I)",
        value: "95.40",
        sub: "Highest in T20Is",
        icon: Skull,
        imageUrl: "/vk_chase_avgT20I.png",
        details: [{ nation: "Australia", avg: 120.5 }, { nation: "England", avg: 105.2 }, { nation: "Sri Lanka", avg: 99.1 }],
    },
];

export const CHASES_STATS_DATA = CHASES_STATS;