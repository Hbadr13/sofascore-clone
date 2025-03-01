interface Sport {
    name: string;
    slug: string;
    id: number;
}

interface Country {
    alpha2: string;
    alpha3: string;
    name: string;
}

interface Category {
    name: string;
    slug: string;
    sport: Sport;
    id: number;
    country: Country;
    flag: string;
    alpha2: string;
}

interface UniqueTournament {
    name: string;
    slug: string;
    primaryColorHex: string;
    secondaryColorHex: string;
    category: Category;
    userCount: number;
    hasPerformanceGraphFeature: boolean;
    id: number;
    country: Partial<Country>;
    displayInverseHomeAwayTeams: boolean;
}

interface Tournament {
    name: string;
    slug: string;
    category: Category;
    uniqueTournament: UniqueTournament;
    priority: number;
    isLive: boolean;
    id: number;
}

interface Manager {
    name: string;
    slug: string;
    shortName: string;
    id: number;
    country: Country;
    fieldTranslations: {
        nameTranslation: {
            [key: string]: string;
        };
        shortNameTranslation?: {
            [key: string]: string;
        };
    };
}

interface Venue {
    city: {
        name: string;
    };
    stadium: {
        name: string;
        capacity: number;
    };
    id: number;
    country: Country;
    fieldTranslations: {
        nameTranslation: {
            [key: string]: string;
        };
        shortNameTranslation?: {
            [key: string]: string;
        };
    };
}

interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}

interface ITeamAPIJson {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: Sport;
    category: Category;
    tournament: Tournament;
    primaryUniqueTournament: UniqueTournament;
    userCount: number;
    manager: Manager;
    venue: Venue;
    nameCode: string;
    class: number;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    country: Country;
    fullName: string;
    teamColors: TeamColors;
    foundationDateTimestamp: number;
    fieldTranslations: {
        nameTranslation: {
            [key: string]: string;
        };
        shortNameTranslation?: {
            [key: string]: string;
        };
    };
}

