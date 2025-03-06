import { TournamentApiProps } from "./matchs"
interface TeamRow {
    team: {
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
        nameCode: string;
        disabled: boolean;
        national: boolean;
        type: number;
        id: number;
        teamColors: {
            primary: string;
            secondary: string;
            text: string;
        };
        fieldTranslations: {
            nameTranslation: {
                ar: string;
                ru: string;
            };
            shortNameTranslation: Record<string, never>;
        };
    };
    descriptions: string[];
    promotion: {
        text: string;
        id: number;
    };
    position: number;
    matches: number;
    wins: number;
    scoresFor: number;
    scoresAgainst: number;
    id: number;
    losses: number;
    draws: number;
    points: number;
}

 
export interface StandingsApiProps {
    tournament: TournamentApiProps
    type: string
    name: string
    descriptions: []
    tieBreakingRule: {
        text: string
        id: number
    }
    rows: TeamRow[];

    id: number
    updatedAtTimestamp: number
}