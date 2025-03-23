import "server-only";

import { z } from "zod";
import { Octokit } from "octokit";
import { DynamoDBService } from "@/lib/ddb";
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const PublishChatSchema = z.object({
    message: z.string().nonempty()
});

interface PublishChatProps {
    params: Promise<{
        repositoryName: string;
    }>;
}

export async function POST(request: NextRequest, { params }: PublishChatProps): Promise<NextResponse> {
    const repositoryName = (await params).repositoryName;
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload;
    try {
        payload = PublishChatSchema.parse(await request.json());
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const octokit = new Octokit({ auth: accessToken });
    const userInfo = await octokit.rest.users.getAuthenticated();
    const repo = await octokit.rest.repos.get({
        owner: userInfo.data.login,
        repo: repositoryName
    });

    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);

    const repositoryItem = await ddbService.getRepository(userInfo.data.id.toString(), repositoryName);
    if (!repositoryItem) {
        return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    if (repositoryItem.chats.length && repositoryItem.chats[repositoryItem.chats.length - 1].from === "user") {
        return NextResponse.json({ error: "You can only send one message at a time" }, { status: 400 });
    }

    const newChats = [
        ...repositoryItem.chats,
        {
            from: "user" as "user" | "website",
            message: payload.message,
            createdAt: new Date().toISOString()
        }
    ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    await ddbService.createRepository({
        userId: userInfo.data.id.toString(),
        repositoryId: repo.data.id.toString(),
        repositoryName: repo.data.name,
        repositoryDescription: repo.data.description || "",
        repositoryBranch: repositoryItem.repositoryBranch,
        repositoryUrl: repo.data.html_url,
        chats: newChats,
        lastUpdatedAt: new Date().toISOString()
    });

    const lambdaClient = new LambdaClient();
    await lambdaClient.send(
        new InvokeCommand({
            FunctionName: "DdcLambda",
            Payload: JSON.stringify({
                accessToken,
                repositoryName: repo.data.name,
                repositoryBranch: repositoryItem.repositoryBranch,
                userPrompt: payload.message
            })
        })
    );

    return NextResponse.json(
        {
            message: "Chat published successfully",
            chat: newChats[newChats.length - 1]
        },
        { status: 200 }
    );
}
