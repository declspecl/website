import "server-only";

import { Octokit } from "octokit";
import { cookies } from "next/headers";
import { DynamoDBService } from "@/lib/ddb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Card } from "@/components/ui/card";

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
        <div>
            {repositoryItem.chats.length === 0 && <p>Start the conversation!</p>}

            {repositoryItem.chats.map((chat) => (
                <Card key={`chat-${chat.createdAt}`} className="flex flex-row w-fit">
                    <div className={`flex flex-col ${chat.from === "user" ? "items-end" : "items-start"}`}>
                        <p>{chat.message}</p>
                    </div>

                    {chat.from === "user" && <img className="w-8 h-8 rounded-full" src={userInfo.data.avatar_url} alt="User Avatar" />}
                </Card>
            ))}
        </div>
    );
}
