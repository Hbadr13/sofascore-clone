import { ITransferHistoryAPIJson } from "./transferHistory"

export interface ITeamTransfersAPIJson {
    transfersIn: ITransferHistoryAPIJson[]
    transfersOut: ITransferHistoryAPIJson[]
}