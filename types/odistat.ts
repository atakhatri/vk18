interface OdiStat {
    matches: number;
    runs: number;
    average: number;
    strikeRate: number;
    hundreds: number;
    fifties: number;
    hs?: number;
}
export type { OdiStat };

interface briefOdiStat {
    matches: number;
    runs: number;
    average: number;
    strikeRate: number;
}
export type { briefOdiStat };

