interface IPlayer {
    value: string
    label: string
    player: {
        marketValueCurrency: string
        dateOfBirthTimestamp: number
        name: string
        firstName: string
        lastName: string
        slug: string
        shortName: string
        position: string
        jerseyNumber: string
        userCount: number
        id: number
        fieldTranslations: {
            nameTranslation: {
                ar: string
            }
            shortNameTranslation: {
                ar: string
            }
        }
    }
}


export interface IBestPlayersAPIJson {
    bestHomeTeamPlayers: IPlayer[]
    bestAwayTeamPlayers: IPlayer[]
}