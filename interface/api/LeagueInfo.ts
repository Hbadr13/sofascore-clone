import { Team } from "./topPlayers"

export interface LeagueInfoAPIJson {
    goals: number,
    homeTeamWins: number,
    awayTeamWins: number,
    draws: number,
    yellowCards: number,
    totalMatchs: number,
    redCards: number,
    newcomersUpperDivision: Team[]
    newcomersLowerDivision: Team[]
    newcomersOther: any[]
    numberOfCompetitors: number,
    id: number,
    hostCountries: []
}