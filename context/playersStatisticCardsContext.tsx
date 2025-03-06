"use client"

import { EventAPIJson } from "@/interface/api/event";
import { IPlayer } from "@/interface/api/lineups";
import { createContext, useContext, useState } from "react";

type playersStatisticCardsContextType = {
    playersOverview: Array<{ player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }>;
    setPlayersOverview: React.Dispatch<React.SetStateAction<Array<{ player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }>>>;
};

const playersStatisticCardsContextDefaultValues: playersStatisticCardsContextType = {
    playersOverview: [],
    setPlayersOverview: () => { }
};

const playersStatisticCardsContext = createContext<playersStatisticCardsContextType>(playersStatisticCardsContextDefaultValues);

export function usePlayersStatisticCards() {
    return useContext(playersStatisticCardsContext);
}
type Props = {
    children: React.ReactNode;
};

export function PlayersStatisticCardsProvider({ children }: Props) {
    const [playersOverview, setPlayersOverview] = useState<Array<{ player: IPlayer, event: EventAPIJson, playerSub: IPlayer | null, subTime: string, subType: string }>>([]);
    const value = {
        playersOverview,
        setPlayersOverview
    };
    return (
        <playersStatisticCardsContext.Provider value={value}>
            {children}
        </playersStatisticCardsContext.Provider>
    );
}