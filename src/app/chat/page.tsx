import "server-only";

import Link from "next/link";
import { Octokit } from "octokit";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReposForAccessToken } from "@/lib/server/repos";

export default async function ChatPage() {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const octokit = new Octokit({
        auth: accessToken
    });
    const userInfo = await octokit.rest.users.getAuthenticated();

    const repos = await getReposForAccessToken(accessToken);

    return (
        <div className="flex flex-row">
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-[100dvh]">
                {repos.map((repo) => (
                    <Button key={`repository-${repo.name}`} asChild>
                        <Link href={`/chat/${repo.name}`}>
                            {repo.name}
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
