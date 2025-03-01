
'use client'

import { MatchDetailsAPIJson } from "@/interface/api/matchs";
import { createContext, useContext, useState } from "react";

type currentMatchContextType = {
    currentMatch: null | MatchDetailsAPIJson;
    setCurrentMatch: (currentMatch: MatchDetailsAPIJson | null) => void
};
const currentMatchContextDefaultValues: currentMatchContextType = {
    currentMatch: null,
    setCurrentMatch: () => { }
};
const currentMatchContext = createContext<currentMatchContextType>(currentMatchContextDefaultValues);

export function useCurrentMatch() {
    return useContext(currentMatchContext);
}
type Props = {
    children: React.ReactNode;
};

export function CurrentMatchProvider({ children }: Props) {
    const [currentMatch, setCurrentMatch] = useState<null | MatchDetailsAPIJson>(null);
    const value = {
        currentMatch,
        setCurrentMatch
    };
    return (
        <currentMatchContext.Provider value={value}>
            {children}
        </currentMatchContext.Provider>
    );
}