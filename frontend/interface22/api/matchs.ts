export interface TournamentApiProps {
    name: string;
    slug: string;
    category: {
        name: string;
        slug: string;
        sport: {
            name: string;
            slug: string;
            id: number;
        };
        id: number;
        country: {
            alpha2: string;
            alpha3: string;
            name: string;
        };
        flag: string;
        alpha2: string;
    };
    uniqueTournament: {
        name: string;
        slug: string;
        primaryColorHex: string
        secondaryColorHex: string
        category: {
            name: string;
            slug: string;
            sport: {
                name: string;
                slug: string;
                id: number;
            };
            country: {
                alpha2: string;
                alpha3: string;
                name: string;
            };
            flag: string;
            id: number;
            alpha2: string;
        };
        userCount: number;
        id: number;
        hasEventPlayerStatistics: boolean;
        crowdsourcingEnabled: boolean;
        hasPerformanceGraphFeature: boolean;
        displayInverseHomeAwayTeams: boolean;
    };
    priority: number;
    id: number;
};
export interface MatchDetailsApiProps {
    tournament: TournamentApiProps
    season: {
        name: string;
        year: string;
        editor: boolean;
        id: number;
    };
    roundInfo: {
        round: number;
    };
    customId: string;
    status: {
        code: number;
        description: string;
        type: string;
    };
    winnerCode: number;
    homeTeam: {
        name: string;
        slug: string;
        shortName: string;
        sport: {
            name: string;
            slug: string;
            id: number;
        };
        userCount: number;
        nameCode: string;
        disabled: boolean;
        national: boolean;
        type: number;
        id: number;
        country: {
            alpha2: string;
            alpha3: string;
            name: string;
        };
        subTeams: any[]; // Array type can be specified if known
        teamColors: {
            primary: string;
            secondary: string;
            text: string;
        };
        fieldTranslations: {
            nameTranslation: {
                ru: string;
            };
            shortNameTranslation: any; // You can specify type if known
        };
    };
    awayTeam: {
        name: string;
        slug: string;
        shortName: string;
        sport: {
            name: string;
            slug: string;
            id: number;
        };
        userCount: number;
        nameCode: string;
        disabled: boolean;
        national: boolean;
        type: number;
        id: number;
        country: {
            alpha2: string;
            alpha3: string;
            name: string;
        };
        subTeams: any[];
        // Array type can be specified if known
        teamColors: {
            primary: string;
            secondary: string;
            text: string;
        };
        fieldTranslations: {
            nameTranslation: {
                ru: string;
            };
            shortNameTranslation: any; // You can specify type if known
        };
    };
    homeScore: {
        current: number;
        display: number;
        period1: number;
        period2: number;
        normaltime: number;
    };
    awayScore: {
        current: number;
        display: number;
        period1: number;
        period2: number;
        normaltime: number;
    };
    time: {
        injuryTime1: number;
        injuryTime2: number;
        currentPeriodStartTimestamp: number;
    };
    changes: {
        changes: string[];
        changeTimestamp: number;
    };
    hasGlobalHighlights: boolean;
    hasEventPlayerStatistics: boolean;
    hasEventPlayerHeatMap: boolean;
    detailId: number;
    crowdsourcingDataDisplayEnabled: boolean;
    id: number;
    crowdsourcingEnabled: boolean;
    startTimestamp: number;
    slug: string;
    finalResultOnly: boolean;
    feedLocked: boolean;
    isEditor: boolean;
}
