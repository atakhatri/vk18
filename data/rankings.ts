interface ranking {
    format: string;
    rank: number;
    rating: number;
    year?: number;
    imageUrl?: string[];
}

export const RANKINGS: ranking[] = [
    { format: "ODI", rank: 1, rating: 911, year: 2018, imageUrl: ["/rank/odi1.png", "/rank/odi2.png"] },
    { format: "Test", rank: 1, rating: 937, year: 2018, imageUrl: ["/rank/test1.png", "/rank/test2.png"] },
    { format: "T20I", rank: 1, rating: 909, year: 2014, imageUrl: ["/rank/t201.png", "/rank/t202.png"] },
];