interface IStatisticsItems {
    name: string
    home: string
    away: string
    compareCode: number
    statisticsType: string
    valueType: string
    homeValue: number
    awayValue: number
    homeTotal: number
    awayTotal: number
    renderType: number
    key: string
}

interface IGroups {
    groupName: string
    statisticsItems: IStatisticsItems[]
}
export interface IMatchStatisticsAPIJson {
    period: string
    groups: IGroups[]
}