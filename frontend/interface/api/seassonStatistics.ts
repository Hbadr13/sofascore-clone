export interface IUniqueTournament {
    name: string,
    slug: string,
    primaryColorHex: string,
    secondaryColorHex: string,
    category: {
        name: string,
        slug: string,
        sport: {
            name: string,
            slug: string,
            id: number
        },
        id: number,
        flag: string
    },
    userCount: number,
    id: number,
    displayInverseHomeAwayTeams: boolean
}

export interface ISeasons {
    name: string,
    year: string,
    editor: boolean,
    id: number
}

interface IUniqueTournamentSeasons {
    uniqueTournament: IUniqueTournament
    seasons: ISeasons[]
}
interface ITypesMap {

    [key: string]: {
        [key: string]: string[];
    };

}

export interface ISeassonStatisticsAPIJson {
    uniqueTournamentSeasons: IUniqueTournamentSeasons[]
    typesMap: ITypesMap
}