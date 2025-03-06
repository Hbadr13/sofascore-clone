


export interface PregameFormdProps {
    avgRating: string,
    position: number,
    value: string,
    form: string[]
}
export interface pregameFormAPIJson {
    homeTeam: PregameFormdProps
    awayTeam: PregameFormdProps
    label: string
}