import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getReposForAccessToken } from "@/lib/server/repos";

export async function GET(request: NextRequest): Promise<NextResponse> {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(getReposForAccessToken(accessToken), {
        status: 200
    });
}
