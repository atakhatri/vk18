import { Flame } from "lucide-react";

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
            { year: "2016", runs: 973 },
            { year: "2017", runs: 308 },
            { year: "2018", runs: 530 },
            { year: "2019", runs: 464 },
            { year: "2020", runs: 466 },
            { year: "2021", runs: 405 },
            { year: "2022", runs: 341 },
            { year: "2023", runs: 639 },
            { year: "2024", runs: 741 },
            { year: "2025", runs: 657 },
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