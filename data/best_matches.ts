interface Match {
    opponent: string;
    score: string;
    date: string;
    result: "Won" | "Lost";
    venue: string;
}

const BEST_MATCHES: Match[] = [
    {
        opponent: "Pakistan",
        score: "82* (53)",
        date: "Oct 23, 2022",
        result: "Won",
        venue: "The MCG",
    },
    {
        opponent: "Australia",
        score: "82* (52)",
        date: "Mar 27, 2016",
        result: "Won",
        venue: "Mohali",
    },
    {
        opponent: "New Zealand",
        score: "117 (113)",
        date: "Nov 15, 2023",
        result: "Won",
        venue: "Mumbai",
    },
];

export { BEST_MATCHES };