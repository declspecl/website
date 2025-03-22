import "server-only";

import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: accessToken });
    const repos = await octokit.rest.repos.listForAuthenticatedUser({
        type: "owner",
        sort: "created",
        direction: "desc",
        per_page: 80
    });

    return NextResponse.json(
        repos.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url
        }))
    );
}
