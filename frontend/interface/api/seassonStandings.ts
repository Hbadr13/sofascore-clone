import { TournamentAPIJson } from "./matchs";

export interface ISeasons {
    name: string,
    year: string,
    editor: boolean,
    id: number
}

export interface ITournamentSeasons {
    tournament: TournamentAPIJson
    seasons: ISeasons[]
}

export interface ISeassonStandingsAPIJson {
    tournamentSeasons: ITournamentSeasons[]
}