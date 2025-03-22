import "server-only";

import { NextRequest, NextResponse } from "next/server";

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

    const response = NextResponse.redirect("http://localhost:3000/chat");
    response.cookies.set({
        name: "accessToken",
        value: body.access_token,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
    });
    return response;
}