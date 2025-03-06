import { MatchDetailsAPIJson } from "./matchs";
interface IPlayedForTeamMap {
    [eventId: number]: number;
}
interface IOnBenchMap {
    [eventId: number]: boolean;
}

interface IStatisticsMap {
    [eventId: number]: {
        rating: number;
    };
}
interface IIncidentsMap {
    [eventId: number]: {
        goals: number
        assists: number
        yellowCards: number
        redCards: number
        ownGoals: number
        penaltyGoals: number
        
    };
}

export interface IMatchDetails extends MatchDetailsAPIJson {
    penaltyGoals: number
    rating: number
    goals: number
    assists: number
    yellowCards: number
    redCards: number
    ownGoals: number
}

export interface IMatchesOfplayerAPIJson {
    events: IMatchDetails[]
    hasNextPage: boolean
    playedForTeamMap: IPlayedForTeamMap
    statisticsMap: IStatisticsMap
    incidentsMap: IIncidentsMap
    onBenchMap: IOnBenchMap
}
