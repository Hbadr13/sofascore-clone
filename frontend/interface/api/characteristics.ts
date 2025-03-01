export interface IPlayerCharacteristics {
    positive: IAttributeProps[];
    negative: IAttributeProps[];
    positions: string[];
}

interface IAttributeProps {
    type: number;
    rank: number;
}