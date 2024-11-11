import React, { createContext, useContext } from 'react';
import { useDisclosure } from '@mantine/hooks';

const DashboardContext = createContext<{ desktopOpened: boolean, toggleDesktop: () => void } | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <DashboardContext.Provider value={{ desktopOpened, toggleDesktop }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}