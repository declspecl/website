import "server-only";

import { z } from "zod";
import { Octokit } from "octokit";
import { DynamoDBService } from "@/lib/ddb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { NextRequest, NextResponse } from "next/server";

const CreateRepositorySchema = z.object({
    repositoryName: z.string(),
    repositoryBranch: z.string()
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
        payload = CreateRepositorySchema.parse(await request.json());
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const octokit = new Octokit({ auth: accessToken });
    const userInfo = await octokit.rest.users.getAuthenticated();
    const repo = await octokit.rest.repos.get({
        owner: userInfo.data.login,
        repo: payload.repositoryName
    });

    const branches = await octokit.rest.repos.listBranches({
        owner: userInfo.data.login,
        repo: payload.repositoryName
    });
    if (!branches.data.some((branch) => branch.name === payload.repositoryBranch)) {
        return NextResponse.json({ error: "Invalid branch" }, { status: 400 });
    }

    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    console.log(`Creating user with id: ${userInfo.data.id}`);
    await ddbService.createRepository({
        userId: userInfo.data.id.toString(),
        repositoryId: repo.data.id.toString(),
        repositoryName: repo.data.name,
        repositoryDescription: repo.data.description || "",
        repositoryBranch: payload.repositoryBranch,
        repositoryUrl: repo.data.html_url,
        chats: []
    });
    console.log("Created repository");

    return NextResponse.json({ message: "Repository created successfully" }, { status: 200 });
}
