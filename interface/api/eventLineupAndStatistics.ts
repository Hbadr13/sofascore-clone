

import { IPlayer } from "./lineups";

interface IStatistics {
    hitWoodwork: number;
    bigChanceMissed: number;
    totalPass: number;
    accuratePass: number;
    totalLongBalls: number;
    accurateLongBalls: number;
    goalAssist: number;
    duelWon: number;
    wasFouled: number;
    savedShotsFromInsideTheBox: number;
    saves: number;
    minutesPlayed: number;
    touches: number;
    rating: number;
    possessionLostCtrl: number;
    ratingVersions: {
        original: number;
        alternative: number | null;
    };
    goalsPrevented: number;
    totalCross: number;
    aerialWon: number;
    shotOffTarget: number;
    blockedScoringAttempt: number;
    goals: number;
    totalClearance: number;
    clearanceOffLine: number;
    outfielderBlock: number;
    expectedAssists: number;
    dispossessed: number;
    aerialLost: number;
    interceptionWon: number;
    fouls: number;
    expectedGoals: number;
    accurateCross: number;
    duelLost: number;
    challengeLost: number;
    onTargetScoringAttempt: number;
    totalTackle: number;
}

export interface IPlayers {
    avgRating: number
    player: IPlayer
    shirtNumber: number,
    jerseyNumber: string,
    position: string,
    substitute: boolean,
    statistics: IStatistics
    goals: number
    yellowCard: boolean
    redCard: boolean
    yellowRedCard: boolean
}


interface IMissingPlayers {
    player: IPlayer
    type: string,
    reason: number
}
export interface TeamLineupsInfo {
    // home: TeamInfo;
    players: IPlayers[]
    supportStaff: [],
    formation: string,
    playerColor: {
        primary: string,
        number: string,
        outline: string,
        fancyNumber: string
    },
    goalkeeperColor: {
        primary: string,
        number: string,
        outline: string,
        fancyNumber: string
    },
    missingPlayers: IMissingPlayers[]
}

export interface IEventLineupAndStatisticsAPIJson {
    confirmed: true,
    home: TeamLineupsInfo
    away: TeamLineupsInfo
}