import "server-only";

import { Octokit } from "octokit";
import { Button } from "./ui/button";
import { cookies } from "next/headers"
import { LucideGithub } from "lucide-react";

interface NavBarProps {
    children: React.ReactNode;
}

export async function NavBar({ children }: NavBarProps) {
    console.log(await cookies());

    const clientId = "Iv23liqvu5cGEtM5aQcC";
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
        return (
            <div>
                <Button className="inline-flex flex-row gap-2" asChild>
                    <a href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}>
                        <LucideGithub className="w-4 h-4" />
                        <p>Login with Github</p>
                    </a>
                </Button>

                {children}
            </div>
        )
    }

    const octokit = new Octokit({
        auth: accessToken,
    })
    const userInfo = await octokit.rest.users.getAuthenticated();

    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <img src={userInfo.data.avatar_url} alt="avatar" className="w-40 h-40 rounded-full" />
                <p>{userInfo.data.login}</p>
            </div>
        </div>
    )
}
