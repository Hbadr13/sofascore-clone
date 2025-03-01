export interface LeaguesAPIJson {
    name: string
    slug: string
    sport: {
        name: string
        slug: string
        id: Number
    },
    priority: number
    id: number
    flag: string
    alpha2: string | undefined
}
