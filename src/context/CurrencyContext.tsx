"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CurrencyMode = 'JPY' | 'LOCAL';

interface CurrencyContextType {
    mode: CurrencyMode;
    toggleMode: () => void;
    setMode: (mode: CurrencyMode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<CurrencyMode>('JPY');

    const toggleMode = () => {
        setModeState((prev) => (prev === 'JPY' ? 'LOCAL' : 'JPY'));
    };

    const setMode = (newMode: CurrencyMode) => {
        setModeState(newMode);
    };

    return (
        <CurrencyContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
