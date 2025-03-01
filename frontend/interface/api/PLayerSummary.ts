
interface Isummary {
    type: string,
    timestamp: number,
    value: string,
    uniqueTournamentId: number
}


interface IUniqueTournamentsMap {
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
}
interface IPLayerSummaryAPIJson {
    summary: Isummary[]
    uniqueTournamentsMap: {
        [TournamentId: string]: IUniqueTournamentsMap
    }
}