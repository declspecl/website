import "server-only";

import { Octokit } from "octokit";
import { cookies } from "next/headers";
import { DynamoDBService } from "@/lib/ddb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RepoSidebar } from "@/components/chat/RepoSidebar";
import { ChatStateContainer } from "@/components/chat/ChatStateContainer";

interface ChatPageLayoutProps {
    children: React.ReactNode;
}

export default async function ChatPageLayout({ children }: ChatPageLayoutProps) {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const octokit = new Octokit({
        auth: accessToken
    });
    const userInfo = await octokit.rest.users.getAuthenticated();
    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    const allRepos = (
        await octokit.rest.repos.listForAuthenticatedUser({
            type: "owner",
            sort: "created",
            direction: "desc",
            per_page: 100
        })
    ).data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url
    }));
    const repos = await ddbService.getRepositoriesForUser(userInfo.data.id.toString());

    return (
        <SidebarProvider>
            <div className="flex flex-row h-screen">
                <ChatStateContainer
                    accessToken={accessToken}
                    allRepos={allRepos}
                    initialUserRepos={repos}
                >
                    <RepoSidebar />

                    {children}
                </ChatStateContainer>
            </div>
        </SidebarProvider>
    );
}