export interface PlayerStatisticsAPIjson {
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
    hitWoodwork: number;
    bigChanceMissed: number;
    fouls: number;
    accurateCross: number;
    duelLost: number;
    challengeLost: number;
    onTargetScoringAttempt: number;
    totalTackle: number;
    expectedGoals: number;
    successfulDribbles: number;
    tackles: number;
    assists: number;
    accuratePassesPercentage: number;
    isHome: boolean;
    totalContest: number,
    wonContest: number,
    totalKeeperSweeper: number,
    accurateKeeperSweeper: number,
    player: {
        shirtNumber: number
        jerseyNumber: number,
        position: number,
        substitute: false,
        name: string;
        slug: string;
        userCount: number;
        id: number;
        fieldTranslations: {
            nameTranslation: {
                [key: string]: string;
            };
            shortNameTranslation: {
                [key: string]: string;
            };
        };
    }
    team: {
        name: string;
        slug: string;
        shortName: string;
        id: number;
        teamColors: {
            primary: string;
            secondary: string;
            text: string;
        };
        fieldTranslations: {
            nameTranslation: {
                [key: string]: string;
            };
            shortNameTranslation: {
                [key: string]: string;
            };
        };
    }
}


