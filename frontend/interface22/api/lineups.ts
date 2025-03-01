
export interface PlayerApiProps {
    avgRating: null,
    player: {
        name: string,
        slug: string,
        shortName: string,
        position: string,
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
    shirtNumber: number,
    position: string,
    jerseyNumber: string,
    substitute: boolean
    type: string,
    reason: 1
}
export interface LineupsApiProps {
    confirmed: boolean
    home: {
        players: PlayerApiProps[]
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
        missingPlayers: PlayerApiProps[]

    }
    away: {
        players: PlayerApiProps[]
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
        missingPlayers: PlayerApiProps[]

    }
}
