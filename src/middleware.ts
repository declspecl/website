import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (request.url.includes("/login") && accessToken) {
        return NextResponse.redirect(new URL("/chat", request.url));
    } else if (request.url.includes("/chat") && !accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
};
