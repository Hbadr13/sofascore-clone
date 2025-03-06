export interface DuelProps {
    homeWins: 5,
    awayWins: 5,
    draws: 8
}
export interface DuelH2HApiProps {
    teamDuel: DuelProps
    managerDuel: DuelProps
}