import "server-only";

import Link from "next/link";
import { Octokit } from "octokit";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBService } from "@/lib/ddb";
import { CreateProjectButton } from "./CreateProjectButton";

export default async function ChatPage() {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const octokit = new Octokit({
        auth: accessToken
    });
    const userInfo = await octokit.rest.users.getAuthenticated();
    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    const allRepos = (await octokit.rest.repos.listForAuthenticatedUser({
        type: "owner",
        sort: "created",
        direction: "desc",
        per_page: 100
    })).data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url
    }));
    const repos = await ddbService.getRepositoriesForUser(userInfo.data.id.toString());

    console.log(repos.length)
    console.log(repos);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-[100dvh]">
                <CreateProjectButton accessToken={accessToken} allRepositories={allRepos} />

                {repos.map((repo) => (
                    <Button key={`repository-${repo.repositoryName}`} asChild>
                        <Link href={`/chat/${repo.repositoryName}`}>
                            {repo.repositoryName}
                        </Link>
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-12">
                <Card className="px-8 py-2 w-fit flex flex-row items-center gap-2">
                    <img className="w-16 h-16 rounded-full" src={userInfo.data.avatar_url} alt="User Avatar" />
                    <p>{userInfo.data.login}</p>
                </Card>

                {accessToken}
            </div>
        </div>
    );
}
