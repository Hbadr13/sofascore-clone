import { MatchDetailsAPIJson } from "./matchs"
import { ITeam } from "./nationalTeam"

export interface ILastRatingsAPIJson {
    eventId: number
    event: MatchDetailsAPIJson
    startTimestamp: number
    rating: string
    opponent: ITeam
    isHome: boolean
}