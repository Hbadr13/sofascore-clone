interface Country {
    alpha2: string;
    alpha3: string;
    name: string;
}

interface Sport {
    name: string;
    slug: string;
    id: number;
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

interface Tournament {
    name: string;
    slug: string;
    category: Category;
    uniqueTournament: UniqueTournament;
    priority: number;
    isLive: boolean;
    id: number;
}

interface UniqueTournament {
    name: string;
    slug: string;
    primaryColorHex: string;
    secondaryColorHex: string;
    category: Category;
    userCount: number;
    id: number;
    country: Record<string, never>;
    displayInverseHomeAwayTeams: boolean;
}

interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}

interface FieldTranslations {
    nameTranslation: { [key: string]: string };
    shortNameTranslation: { [key: string]: string };
}

interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: Sport;
    tournament: Tournament;
    primaryUniqueTournament: UniqueTournament;
    userCount: number;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    country: Country;
    teamColors: TeamColors;
    fieldTranslations: FieldTranslations;
}

interface ProposedMarketValueRaw {
    value: number;
    currency: string;
}

export interface PlayerAPIJson {
    name: string;
    slug: string;
    shortName: string;
    team: Team;
    position: string;
    jerseyNumber: string;
    height: number;
    preferredFoot: string;
    retired: boolean;
    userCount: number;
    deceased: boolean;
    gender: string;
    id: number;
    country: Country;
    shirtNumber: number;
    dateOfBirthTimestamp: number;
    contractUntilTimestamp: number;
    proposedMarketValue: number;
    proposedMarketValueRaw: ProposedMarketValueRaw;
    fieldTranslations: FieldTranslations;
}

