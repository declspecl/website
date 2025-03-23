"use client";

import Link from "next/link";
import { useState } from "react";
import { RepositoryItem } from "@/lib/ddb";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

interface RepoSidebarProps {
    accessToken: string;
    allRepos: {
        id: number;
        name: string;
        description: string | null;
        url: string;
    }[];
    initialUserRepos: RepositoryItem[];
}

export function RepoSidebar({ accessToken, allRepos, initialUserRepos }: RepoSidebarProps) {
    const [repos, setRepos] = useState(initialUserRepos);

    return (
        <Sidebar collapsible="none">
            <SidebarContent>
                <SidebarMenu>
                    {repos.map((repo) => (
                        <SidebarMenuItem key={`repository-${repo.repositoryName}`}>
                            <SidebarMenuButton
                                className="justify-start"
                            >
                                <Link href={`/chat/${repo.repositoryName}`}>{repo.repositoryName}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}