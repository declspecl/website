import "server-only";

import { Octokit } from "octokit";

export async function getReposForAccessToken(accessToken: string) {
    const octokit = new Octokit({ auth: accessToken });
    const repos = await octokit.rest.repos.listForAuthenticatedUser({
        type: "owner",
        sort: "created",
        direction: "desc",
        per_page: 80
    });

    return repos.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url
    }));
}