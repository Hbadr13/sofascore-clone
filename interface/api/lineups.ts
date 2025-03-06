export interface IPlayer {
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

export interface PlayerAPIJson {
    avgRating: null,
    player: IPlayer
    shirtNumber: number,
    position: string,
    jerseyNumber: string,
    substitute: boolean
    type: string,
    reason: 1

}
export interface LineupsAPIJson {
    confirmed: boolean
    home: {
        players: PlayerAPIJson[]
        supportStaff: {}
        formation: string
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
        missingPlayers: PlayerAPIJson[]

    }
    away: {
        players: PlayerAPIJson[]
        supportStaff: {}
        formation: string
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
        missingPlayers: PlayerAPIJson[]

    }
}
