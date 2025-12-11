interface Match {
    opponent: string;
    score: string;
    date: string;
    result: "Won" | "Lost";
    venue: string;
    imageUrl?: string;
    bgUrl?: string;
    details?: string;
}


export type { Match };