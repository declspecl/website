import "server-only";

import { Octokit } from "octokit";
import { DynamoDBService } from "@/lib/ddb";
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export async function GET(request: NextRequest) {
	const searchParams = new URL(request.url).searchParams;

	const gitResponse = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			client_id: "Iv23liqvu5cGEtM5aQcC",
			client_secret: "ef719bac13a8e9aba932f81ef176a3f6e80e5731",
			code: searchParams.get("code")
		})
	});
	const body = await gitResponse.json();
	console.log(body.access_token);

    const octokit = new Octokit({
        auth: body.access_token
    });
    const userInfo = await octokit.rest.users.getAuthenticated();

    const ddbClient = new DynamoDBClient();
    const ddbService = new DynamoDBService(ddbClient);
    console.log(`Creating user with id: ${userInfo.data.id}`);
    await ddbService.createUser({
        userId: userInfo.data.id.toString(),
        name: userInfo.data.name || "",
        githubUsername: userInfo.data.login,
        email: userInfo.data.email || "",
        avatarUrl: userInfo.data.avatar_url,
    });
    console.log("Created user");
    console.log(`Creating access token for user with id: ${userInfo.data.id}`);
    await ddbService.createAccessToken({
        token: body.access_token,
        userId: userInfo.data.id.toString()
    });
    console.log("Created access token");

    const response = NextResponse.redirect("http://localhost:3000/chat");
    response.cookies.set({
        name: "accessToken",
        value: body.access_token,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
    });
    return response;
}