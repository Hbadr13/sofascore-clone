export interface SuggestionsApiProps {
    type: string,
    entity: {
        name: string,
        slug: string,
        shortName: string,
        gender: string,
        sport: {
            name: string,
            slug: string,
            id: number
        },
        userCount: number,
        nameCode: string,
        national: boolean,
        parentTeam: {
            name: string,
            slug: string,
            shortName: string,
            gender: string,
            sport: {
                name: string,
                slug: string,
                id: number
            },
            userCount: number,
            nameCode: string,
            national: boolean,
            type: number,
            id: number,
            country: {
                alpha2: string,
                name: string
            },
            subTeams: [],
            teamColors: {
                primary: string,
                secondary: string,
                text: string
            }
        },
        type: number,
        id: number,
        country: {
            alpha2: string,
            name: string
        },
        subTeams: [],
        teamColors: {
            primary: string,
            secondary: string,
            text: string
        }
    },
    score: number
}


