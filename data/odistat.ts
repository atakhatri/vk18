import {
    Crown,
    TrendingUp,
    Target,
    Zap,
    Award,
    BarChart3,
} from "lucide-react";

export const ODI_STATS: any[] = [
    {
        label: "ODI Matches",
        value: "295",
        sub: "Blue Jersey Legend",
        icon: BarChart3,
        imageUrl: "/odi/vk_odi_matches.png",
        details: [
            { nation: "Home", matches: 110 },
            { nation: "Away", matches: 125 },
            { nation: "Neutral", matches: 60 }
        ]
    },
    {
        label: "ODI Runs",
        value: "13,906",
        sub: "Run Machine",
        icon: TrendingUp,
        imageUrl: "/odi/vk_odi_runs.png",
        details: [
            { nation: "vs Sri Lanka", runs: 2594 },
            { nation: "vs West Indies", runs: 2261 },
            { nation: "vs Australia", runs: 2367 }
        ]
    },
    {
        label: "Batting Avg",
        value: "58.18",
        sub: "Consistency King",
        icon: Target,
        imageUrl: "/odi/vk_odi_avg.png",
        details: [
            { nation: "In Chases", avg: 64.3 },
            { nation: "Batting First", avg: 51.2 },
            { nation: "In Wins", avg: 74.8 }
        ]
    },
    {
        label: "Centuries",
        value: "50",
        sub: "World Record Holder",
        icon: Crown,
        imageUrl: "/vk_odi_100.png",
        details: [
            { nation: "vs Sri Lanka", centuries: 10 },
            { nation: "vs West Indies", centuries: 9 },
            { nation: "vs Australia", centuries: 8 }
        ]
    },
    {
        label: "Highest Score",
        value: "183",
        sub: "vs Pakistan (Asia Cup)",
        icon: Zap,
        imageUrl: "/vk_183.png",
        details: [
            { nation: "Fours", count: 22 },
            { nation: "Sixes", count: 1 },
            { nation: "Strike Rate", value: 123.64 }
        ]
    },
    {
        label: "Man of Match",
        value: "41",
        sub: "Match Winner",
        icon: Award,
        imageUrl: "/vk_odi_mom.png",
        details: [
            { nation: "2010-2015", awards: 20 },
            { nation: "2016-2020", awards: 15 },
            { nation: "2021-Present", awards: 6 }
        ]
    }
];