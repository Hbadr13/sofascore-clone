

export interface IRoundProps {
    id: number
    round: 28,
    name: string,
    slug: string,
    prefix: string
}

export interface IRoundsAPIJson {
    currentRound: IRoundProps
    rounds: IRoundProps[]

}