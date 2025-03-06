import { IPlayer } from './lineups'
import { ITeam } from './nationalTeam'

export interface ITransferHistoryAPIJson {
    player: IPlayer
    transferFrom: ITeam
    transferTo: ITeam
    fromTeamName: string,
    toTeamName: string,
    type: number,
    transferFee: number,
    transferFeeDescription: string,
    id: number,
    transferDateTimestamp: number,
    transferFeeRaw: {
        value: number,
        currency: string
    }
}