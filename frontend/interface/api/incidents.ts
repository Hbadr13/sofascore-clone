interface IPlayer {
    name: string,
    slug: string,
    shortName: string,
    position: string,
    firstName: string,
    lastName: string,
    jerseyNumber: string,
    userCount: number,
    id: number,
    country: {
        alpha2: string,
        alpha3: string,
        name: string
    },
    marketValueCurrency: string,
    dateOfBirthTimestamp: 992822400,
    fieldTranslations: {
        nameTranslation: {
            ar: string
        },
        shortNameTranslation: {
            ar: string
        }
    }
}

export interface IIncidentsAPIJson {
    playerIn: IPlayer,
    playerOut: IPlayer,
    player: IPlayer
    assist1: IPlayer
    id: number,
    time: number,
    injury: false,
    isHome: false,
    incidentClass: string,
    reversedPeriodTime: number,
    incidentType: string,
    playerName: string,
    reason: string,
    rescinded: boolean,
    text: string,
    homeScore: number,
    awayScore: number,
    isLive: boolean,
    addedTime: number,
    length: number,
    manager: {
        name: string,
        slug: string,
        shortName: string,
        id: number
    },
    type: string
    periodName: string
}
