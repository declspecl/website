"use client";

import { RepositoryItem } from "@/lib/ddb";
import React, { createContext, useContext, useState } from "react";

export interface SidebarState {
    accessToken: string;
    allRepositories: {
        id: number;
        name: string;
        description: string | null;
        url: string;
    }[];
    userRepositories: RepositoryItem[];
}

const SidebarStateContext = createContext<SidebarState | null>(null);
const SetSidebarStateContext = createContext<React.Dispatch<React.SetStateAction<SidebarState>> | null>(null);

interface SidebarProviderProps {
	initialValue: SidebarState;
	children: React.ReactNode;
}

export function SidebarStateProvider({ initialValue, children }: SidebarProviderProps) {
	const [state, setState] = useState<SidebarState>(initialValue);

	return (
        <SidebarStateContext.Provider value={state}>
            <SetSidebarStateContext.Provider value={setState}>
                {children}
            </SetSidebarStateContext.Provider>
        </SidebarStateContext.Provider>
    );
}

export function useSidebarState(): [SidebarState, React.Dispatch<React.SetStateAction<SidebarState>>] {
	const state = useContext(SidebarStateContext);
    const setState = useContext(SetSidebarStateContext);

	if (!state || !setState) {
		throw new Error("useSidebarState must be used within a SidebarProvider");
	}

	return [state, setState];
}