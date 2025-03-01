import { ITeam } from "./nationalTeam"

export interface IOverallStatisticsAPIJson {
    statistics: {
        [statisticName: string]: number
    }
    team: ITeam
}