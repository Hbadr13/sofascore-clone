import { EventAPIJson } from "./event"
import { IPlayer, PlayerAPIJson } from "./lineups"
import { Team } from "./topPlayers"

interface playersProps {
    player: IPlayer
    team: Team
    event: EventAPIJson
    rating: number,
    order: number,
    id: number
}
export interface teamOfTheWeekAPIJson {
    formation: string
    players: playersProps[]
}