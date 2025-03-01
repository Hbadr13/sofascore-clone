export interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: {
        name: string;
        slug: string;
        id: number;
    };
    userCount: number;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    teamColors: {
        primary: string;
        secondary: string;
        text: string;
    };
    fieldTranslations: {
        nameTranslation: {
            [key: string]: string; // Translation language as key, translation as value
        };
        shortNameTranslation: {
            [key: string]: string; // Translation language as key, translation as value
        };
    };
}

interface Player {
    name: string;
    firstName: string;
    lastName: string;
    slug: string;
    shortName: string;
    position: string;
    jerseyNumber: string;
    userCount: number;
    id: number;
    marketValueCurrency: string;
    dateOfBirthTimestamp: number;
}
interface TeamScore {
    current: number;
    display: number;
    period1: number;
    period2: number;
    normaltime: number;
    penalties: number;
    overtime: number;
}

interface Event {
    tournament: {
        name: string;
        slug: string;
        category: {
            name: string;
            slug: string;
            sport: {
                name: string;
                slug: string;
                id: number;
            };
            id: number;
            flag: string;
        };
        uniqueTournament: {
            name: string;
            slug: string;
            primaryColorHex: string;
            secondaryColorHex: string;
            category: {
                name: string;
                slug: string;
                sport: {
                    name: string;
                    slug: string;
                    id: number;
                };
                id: number;
                flag: string;
            };
            userCount: number;
            id: number;
            displayInverseHomeAwayTeams: boolean;
        };
        priority: number;
        isLive: boolean;
        id: number;
    };
    customId: string;
    status: {
        code: number;
        description: string;
        type: string;
    };
    winnerCode: number;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: TeamScore;
    awayScore: TeamScore;
    id: number;
    startTimestamp: number;
    slug: string;
    finalResultOnly: boolean;
}

interface RatingVersions {
    original: number;
    alternative: number;
}

export interface TopPlayersAPIJson {
    event: Event;
    totalPass: number;
    accuratePass: number;
    aerialLost: number;
    aerialWon: number;
    duelLost: number;
    duelWon: number;
    totalContest: number;
    wonContest: number;
    shotOffTarget: number;
    onTargetScoringAttempt: number;
    goals: number;
    totalTackle: number;
    wasFouled: number;
    penaltyWon: number;
    totalOffside: number;
    minutesPlayed: number;
    touches: number;
    rating: number;
    possessionLostCtrl: number;
    team: Team;
    player: Player;
    keyPass: number;
    ratingVersions: RatingVersions;
}
