import { IPlayer } from "./lineups";


export interface _IPlyer {
    player: IPlayer
}


export interface AllPlayersAPIJson {

    players: _IPlyer[]
    foreignPlayers: _IPlyer[]
    nationalPlayers: _IPlyer[]
    supportStaff: _IPlyer[]
}





