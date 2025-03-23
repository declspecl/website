"use client";

import Link from "next/link";
import { useState } from "react";
import { LucideSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSidebarState } from "@/context/SidebarContext";
import { CreateProjectButton } from "./CreateProjectButton";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";

interface RepoSidebarProps {}

export function RepoSidebar({}: RepoSidebarProps) {
    const [sidebarState, setSidebarState] = useSidebarState();
    const { accessToken, allRepositories, userRepositories } = sidebarState;

    const [searchQuery, setSearchQuery] = useState("");
    const filteredRepos = sidebarState.userRepositories.filter((repo) => repo.repositoryName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Sidebar collapsible="none" className="min-w-60">
            <SidebarHeader className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Projects</h2>
                </div>
                <div className="relative">
                    <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search repositories..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="p-2">
                    <CreateProjectButton />

                    {filteredRepos.length > 0 ? (
                        filteredRepos.map((repo) => (
                            <SidebarMenuItem key={`repository-${repo.repositoryName}`}>
                                <SidebarMenuButton className="justify-start">
                                    <Link href={`/chat/${repo.repositoryName}`}>{repo.repositoryName}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-muted-foreground">No repositories found</div>
                    )}
                </SidebarMenu>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
