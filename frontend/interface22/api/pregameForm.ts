


export interface PregameFormdProps {
    avgRating: string,
    position: number,
    value: string,
    form: string[]
}
export interface pregameFormApiProps {
    homeTeam: PregameFormdProps
    awayTeam: PregameFormdProps
    label: string
}