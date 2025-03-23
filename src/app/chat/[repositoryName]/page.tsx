import "server-only";

import { Octokit } from "octokit";
import { cookies } from "next/headers";
import { DynamoDBService } from "@/lib/ddb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Card } from "@/components/ui/card";
import { ChatHistory } from "@/components/chat/chat/ChatHistory";

interface RepositoryChatPageProps {
    params: Promise<{
        repositoryName: string;
    }>;
}

export default async function RepositoryChatPage({ params }: RepositoryChatPageProps) {
    const repositoryName = (await params).repositoryName;

    console.log(repositoryName);

    const accessToken = (await cookies()).get("accessToken")!.value;
    const octokit = new Octokit({ auth: accessToken });
    const userInfo = await octokit.rest.users.getAuthenticated();

    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    const repositoryItem = await ddbService.getRepository(userInfo.data.id.toString(), repositoryName);
    if (!repositoryItem) {
        return <div>Repository not found</div>;
    }

    return (
        <div className="h-full">
            <ChatHistory messages={repositoryItem.chats} userAvatarUrl={userInfo.data.avatar_url} />
        </div>
    );
}
