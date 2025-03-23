"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

// Mock data for repositories
const mockRepositories = [
  "frontend-app",
  "backend-api",
  "mobile-app",
  "design-system",
  "documentation",
  "analytics-dashboard",
  "auth-service",
  "payment-gateway",
  "notification-service",
  "user-management",
]

interface ProjectSidebarProps {
  onCreateProject: () => void
  onSelectRepo: (repo: string) => void
  selectedRepo: string | null
}

export function ProjectSidebar({ onCreateProject, onSelectRepo, selectedRepo }: ProjectSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRepos = mockRepositories.filter((repo) => repo.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button size="sm" onClick={onCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
        <SidebarMenu>
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <SidebarMenuItem key={repo}>
                <SidebarMenuButton isActive={selectedRepo === repo} onClick={() => onSelectRepo(repo)}>
                  {repo}
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
  )
}

