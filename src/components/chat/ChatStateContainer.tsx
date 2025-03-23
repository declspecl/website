"use client";

import { RepositoryItem } from "@/lib/ddb";
import { SidebarStateProvider } from "@/context/SidebarContext";

interface ChatStateContainerProps {
    accessToken: string;
    allRepos: {
        id: number;
        name: string;
        description: string | null;
        url: string;
    }[];
    initialUserRepos: RepositoryItem[];
    children: React.ReactNode;
}

export function ChatStateContainer({ accessToken, allRepos, initialUserRepos, children }: ChatStateContainerProps) {
    return (
        <SidebarStateProvider initialValue={{
            accessToken,
            allRepositories: allRepos,
            userRepositories: initialUserRepos
        }}>
            {children}
        </SidebarStateProvider>
    );
}