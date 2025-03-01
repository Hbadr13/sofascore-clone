
'use client'

import { createContext, useContext, useState } from "react";

type windowAttributesContextType = {
    windowAttributes: { width: number, height: number };
    setWindowAttributes: (windowAttributes: { width: number, height: number }) => void
};
const windowAttributesContextDefaultValues: windowAttributesContextType = {
    windowAttributes: { width: 0, height: 0 },
    setWindowAttributes: () => { }
};
const windowAttributesContext = createContext<windowAttributesContextType>(windowAttributesContextDefaultValues);

export function useWindowAttributes() {
    return useContext(windowAttributesContext);
}
type Props = {
    children: React.ReactNode;
};

export function WindowAttributesProvider({ children }: Props) {
    const [windowAttributes, setWindowAttributes] = useState<{ width: number, height: number }>({ width: 0, height:  0 });
    const value = {
        windowAttributes,
        setWindowAttributes
    };
    return (
        <windowAttributesContext.Provider value={value}>
            {children}
        </windowAttributesContext.Provider>
    );
}
