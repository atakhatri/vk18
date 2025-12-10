interface Stat {
    label: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
}

import {
    ArrowUpRight,
    Flame,
    FlameKindling,
    Skull,
    Target,
} from "lucide-react";


const CHASES_STATS: Stat[] = [
    {
        label: "Runs in Chases",
        value: "7800+",
        sub: "Highest overall",
        icon: ArrowUpRight,
        imageUrl: "/vk_chasing.png",

    },
    {
        label: "Centuries in Chases",
        value: "27",
        sub: "Most by any player",
        icon: Flame,
        imageUrl: "/vk_chases_century.png",
    },
    {
        label: "50+ Scores in Chases",
        value: "45",
        sub: "Top in history",
        icon: FlameKindling,
        imageUrl: "/vk_chase50.png",
    },
    {
        label: "Avg in Successful Chases",
        value: "88.98",
        sub: "#1 All-time",
        icon: Target,
        imageUrl: "/vk_success_chases.png",
    },
    {
        label: "Avg in successful chases (ODI)",
        value: "90.23",
        sub: "Highest in ODIs",
        icon: Target,
        imageUrl: "/vk_chase_avgODI.png",
    },
    {
        label: "Avg in successful chases (T20I)",
        value: "95.40",
        sub: "Highest in T20Is",
        icon: Skull,
        imageUrl: "/vk_chase_avgT20I.png",
    },
];

export const CHASES_STATS_DATA = CHASES_STATS;