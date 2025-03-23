"use client";

import Link from "next/link";
import { useSidebarState } from "@/context/SidebarContext";
import { CreateProjectButton } from "./CreateProjectButton";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";

interface RepoSidebarProps {}

export function RepoSidebar({}: RepoSidebarProps) {
    const [sidebarState, setSidebarState] = useSidebarState();
    const { accessToken, allRepositories, userRepositories } = sidebarState;

    return (
        <Sidebar collapsible="none">
            <SidebarContent>
                <SidebarMenu>
                    <CreateProjectButton />

                    {userRepositories.map((repo) => (
                        <SidebarMenuItem key={`repository-${repo.repositoryName}`}>
                            <SidebarMenuButton className="justify-start">
                                <Link href={`/chat/${repo.repositoryName}`}>{repo.repositoryName}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
