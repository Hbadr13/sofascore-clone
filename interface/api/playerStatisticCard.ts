import { IPlayer } from "./lineups";
import { ITeam } from "./nationalTeam";

export interface IPlayerStatisticCardJson {
    player: IPlayer
    team: ITeam
    statistics: {
        [statisName: string]: string
    }
    position: string
}