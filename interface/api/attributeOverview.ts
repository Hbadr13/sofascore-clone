
interface PlayerAttributeOverview {
    attacking: number;
    technical: number;
    tactical: number;
    defending: number;
    creativity: number;
    position: string;
    yearShift: number;
    id: number;
}

interface IAttributeOverviewsAPI {
    averageAttributeOverviews: PlayerAttributeOverview[];
    playerAttributeOverviews: PlayerAttributeOverview[];
}