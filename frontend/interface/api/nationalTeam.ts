interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}

interface NameTranslation {
    ar: string;
    ru: string;
}

interface FieldTranslations {
    nameTranslation: NameTranslation;
    shortNameTranslation: Record<string, string>;
}

interface Sport {
    name: string;
    slug: string;
    id: number;
}

export interface ITeam {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: Sport;
    userCount: number;
    nameCode: string;
    ranking: number;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    teamColors: TeamColors;
    fieldTranslations: FieldTranslations;
}

export interface INationalTeamStatisticsAPIJson {
    team: ITeam;
    appearances: number;
    goals: number;
    debutTimestamp: number;
}

// interface INationalTeamStatisticsAPIJson {
//     statistics: Statistic[];
// }