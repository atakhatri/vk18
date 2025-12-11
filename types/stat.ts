import React from "react";

export interface Stat {
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
    nation: string;
    winPercentage: number;
}

interface fiftiesDetail {
    nation: string;
    fifties: number;
}

interface awardsDetail {
    awards: string;
    years: number;
}
