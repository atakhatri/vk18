import { Flame, FlameIcon, Trophy } from "lucide-react";

interface iplruns {
    label: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
    details?: iplRunsDetail[] | iplAvgDetail[] | iplCenturiesDetail[] | iplFiftiesDetail[];
}

interface iplRunsDetail {
    year: string;
    runs: number;
    won?: boolean;
    orangeCap?: boolean;
}

interface iplAvgDetail {
    year: string;
    average: number;
}

interface iplCenturiesDetail {
    matches: string;
    centuries: number;
}

interface iplFiftiesDetail {
    matches: string;
    fifties: number;
}

export const IPL_RUNS: iplruns[] = [
    {
        label: "Total-Runs",
        value: "8661",
        sub: "Highest run-scorer in IPL history",
        icon: Flame,
        details: [
            { year: "2008", runs: 165 },
            { year: "2009", runs: 246 },
            { year: "2010", runs: 307 },
            { year: "2011", runs: 557 },
            { year: "2012", runs: 364 },
            { year: "2013", runs: 634 },
            { year: "2014", runs: 359 },
            { year: "2015", runs: 505 },
            { year: "2016", runs: 973, orangeCap: true },
            { year: "2017", runs: 308 },
            { year: "2018", runs: 530 },
            { year: "2019", runs: 464 },
            { year: "2020", runs: 466 },
            { year: "2021", runs: 405 },
            { year: "2022", runs: 341 },
            { year: "2023", runs: 639 },
            { year: "2024", runs: 741, orangeCap: true },
            { year: "2025", runs: 657, won: true },
        ],
    },
];

export const IPL_AVG: iplruns[] = [
    {
        label: "BATTING-AVERAGE",
        value: "39.55",
        sub: "in 267* matches",
        icon: Flame,
        details: [
            { year: "2008", average: 15.00 },
            { year: "2009", average: 22.36 },
            { year: "2010", average: 27.90 },
            { year: "2011", average: 46.41 },
            { year: "2012", average: 28.00 },
            { year: "2013", average: 45.28 },
            { year: "2014", average: 27.61 },
            { year: "2015", average: 45.90 },
            { year: "2016", average: 81.08 },
            { year: "2017", average: 30.80 },
            { year: "2018", average: 48.18 },
            { year: "2019", average: 33.14 },
            { year: "2020", average: 42.36 },
            { year: "2021", average: 28.92 },
            { year: "2022", average: 22.73 },
            { year: "2023", average: 53.25 },
            { year: "2024", average: 61.75 },
            { year: "2025", average: 54.75 },
        ],
    },
];

export const IPL_CENTURIES: iplruns[] = [
    {
        label: "Centuries",
        value: "8",
        sub: "Most by any player in IPL",
        icon: Flame,
        details: [{ matches: "267*", centuries: 8 }],
    },
];

export const IPL_FIFTIES: iplruns[] = [
    {
        label: "Fifties",
        value: "63",
        sub: "Most by any player in IPL",
        icon: Flame,
        details: [{ matches: "267*", fifties: 63 }],
    },
];

interface orangecap {
    label: string;
    value: string | number;
    year: string;
    icon: React.ElementType;
    imageUrl?: string;
    details?: string;
}
export const ORANGE_CAPS: orangecap[] = [
    {
        label: "THE PRIME OF THE DEVIL",
        value: "973 runs",
        year: "2016",
        icon: Flame,
        imageUrl: "/ipl/oc16.jpeg",
        details: "Virat Kohli won the Orange Cap in IPL 2016 by scoring a record-breaking 973 runs in a single season, the highest ever by any player in IPL history. This season is often regarded as the peak of his IPL career.",
    },
    {
        label: "THE RUN MACHINE",
        value: "741 runs",
        year: "2024",
        icon: Flame,
        imageUrl: "/ipl/oc24.jpeg",
        details: "Virat Kohli won the Orange Cap in IPL 2024 by scoring 741 runs in the season, showcasing his consistent performance. This made him the only second player to win the Orange Cap twice.",
    },
];


interface topPships {
    label: string;
    value: string | number;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
    details?: string;
}


export const TOP_PSHIPS: topPships[] = [
    {
        label: "Highest Partnership in IPL",
        value: "229",
        sub: "vs. Gujarat Lions, 2016",
        icon: Flame,
        imageUrl: "/ipl/vsGL.jpeg",
        details: "Virat Kohli (108*) & AB de Villiers (115*)",
    },
    {
        label: "2nd Highest Partnership in IPL",
        value: "215*",
        sub: "vs. Mumbai Indians, 2015",
        icon: FlameIcon,
        imageUrl: "/ipl/vsMI.jpeg",
        details: "Virat Kohli (82*) & AB de Villiers (133*)",
    },
];

interface winningmoments {
    label: string;
    value: string | number;
    sub: string;
    icon: React.ElementType;
    imageUrl?: string;
    details?: string;
    bgimageUrl?: string;
}

export const WINNING_MOMENTS: winningmoments[] = [
    {
        label: "Maiden IPL Title",
        value: "2025",
        sub: "Champions vs PBKS",
        icon: Trophy,
        bgimageUrl: "/ipl/trophy.jpeg",
        details: "after a long wait of 18 years, The IPL trophy finally gets the touch of Virat Kohli's hands. Royal Challengers Bangalore won their first-ever IPL title by defeating Punjab Kings in a nail-biting final. and comes to IPL 2026 as defending champions.",
    },
];