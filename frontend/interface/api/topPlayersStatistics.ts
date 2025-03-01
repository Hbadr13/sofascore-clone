import { IPlayer } from "./lineups"
import { ITeam } from "./nationalTeam"

export interface ITopPlayersStatisticsAPIJson {
    [statisName: string]: [{
        statistics: {
            [rating: string]: number | string,
            id: number,
            type: string,
            appearances: number
        },
        playedEnough: boolean
        player: IPlayer
        team: ITeam | null
        value: string
    }]
}