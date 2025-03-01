interface Tournament {
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
        primaryColorHex: string;
        secondaryColorHex: string;
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
        userCount: number;
        id: number;
        country: any;
        hasEventPlayerStatistics: boolean;
        crowdsourcingEnabled: boolean;
        hasPerformanceGraphFeature: boolean;
        displayInverseHomeAwayTeams: boolean;
    };
    priority: number;
    isGroup: boolean;
    competitionType: number;
    isLive: boolean;
    id: number;
}

interface Season {
    name: string;
    year: string;
    editor: boolean;
    id: number;
}

interface RoundInfo {
    round: number;
}

interface Status {
    code: number;
    description: string;
    type: string;
}

interface City {
    name: string;
}

interface Stadium {
    name: string;
    capacity: number;
}

interface Country {
    alpha2: string;
    alpha3: string;
    name: string;
}

interface Referee {
    name: string;
    slug: string;
    yellowCards: number;
    redCards: number;
    yellowRedCards: number;
    games: number;
    sport: {
        id: number;
        slug: string;
        name: string;
    };
    id: number;
    country: Country;
}

interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: {
        name: string;
        slug: string;
        id: number;
    };
    userCount: number;
    manager: {
        name: string;
        slug: string;
        shortName: string;
        id: number;
        country: Country;
        fieldTranslations: {
            nameTranslation: {
                ar: string;
            };
            shortNameTranslation: {
                ar: string;
            };
        };
    };
    venue: {
        city: City;
        stadium: Stadium;
        id: number;
        country: Country;
        fieldTranslations: {
            nameTranslation: {
                ar: string;
            };
            shortNameTranslation: {};
        };
    };
    foundationDate: any;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    country: Country;
    subTeams: any[];
    fullName: string;
    teamColors: {
        primary: string;
        secondary: string;
        text: string;
    };
    foundationDateTimestamp: number;
    fieldTranslations: {
        nameTranslation: {
            ar: string;
            ru?: string;
        };
        shortNameTranslation: {};
    };
}

interface Venue {
    city: City;
    stadium: Stadium;
    id: number;
    country: Country;
    fieldTranslations: {
        nameTranslation: {
            ar: string;
        };
        shortNameTranslation: {};
    };
}

interface TeamScore {
    current: number;
    display: number;
    period1: number;
    period2: number;
    normaltime: number;
    penalties: number;
    overtime: number;
}

export interface EventAPIJson {
    tournament: Tournament;
    season: Season;
    roundInfo: RoundInfo;
    customId: string;
    status: Status;
    venue: Venue;
    referee: Referee;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: TeamScore;
    awayScore: TeamScore;
    time: any;
    changes: {
        changeTimestamp: number;
    };
    hasGlobalHighlights: boolean;
    detailId: number;
    crowdsourcingDataDisplayEnabled: boolean;
    id: number;
    defaultPeriodCount: number;
    defaultPeriodLength: number;
    defaultOvertimeLength: number;
    crowdsourcingEnabled: boolean;
    startTimestamp: number;
    slug: string;
    finalResultOnly: boolean;
    feedLocked: boolean;
    fanRatingEvent: boolean;
    seasonStatisticsType: string;
    showTotoPromo: boolean;
    isEditor: boolean;
}
