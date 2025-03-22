import { Card } from "@/components/ui/card";
import { cookies } from "next/headers";
import { Octokit } from "octokit";

export default async function ChatPage() {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const octokit = new Octokit({
        auth: accessToken
    });
    const userInfo = await octokit.rest.users.getAuthenticated();

    return (
        <div className="flex flex-col gap-12">
            <Card className="px-8 py-2 w-fit flex flex-row items-center gap-2">
                <img className="w-16 h-16 rounded-full" src={userInfo.data.avatar_url} alt="User Avatar" />
                <p>{userInfo.data.login}</p>
            </Card>

            {accessToken}
        </div>
    )
}