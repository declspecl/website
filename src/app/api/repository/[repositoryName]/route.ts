import "server-only";

import { Octokit } from "octokit";
import { DynamoDBService } from "@/lib/ddb";
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export async function GET(request: NextRequest, { params }: { params: { repositoryName: string } }): Promise<NextResponse> {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: accessToken });
    const userInfo = await octokit.rest.users.getAuthenticated();

    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    const repositoryItem = await ddbService.getRepository(userInfo.data.id.toString(), params.repositoryName);
    if (!repositoryItem) {
        return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    return NextResponse.json({
        repositoryItem
    }, { status: 200 });
}