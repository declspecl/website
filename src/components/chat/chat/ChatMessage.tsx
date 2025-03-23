"use client";

import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebarState } from "@/context/SidebarContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
    message: string;
    from: "user" | "website";
    createdAt: string;
}

export function ChatMessage({ message, from, createdAt }: ChatMessageProps) {
    const [sidebarState, setSidebarState] = useSidebarState();
    const [userInfo, setUserInfo] = useState<{ avatar_url: string; } | null>(null);

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            const octokit = new Octokit({ auth: sidebarState.accessToken });
            const userInfo = await octokit.rest.users.getAuthenticated();

            if (isCancelled) {
                setUserInfo({
                    avatar_url: userInfo.data.avatar_url
                });
            }
        })();

        return () => {
            isCancelled = true;
        }
    }, [sidebarState.accessToken]);

    return (
        <div className={cn("flex flex-row justify-end items-end gap-4", { "flex-row-reverse justify-start": from === "website" })}>
            <Card>
                <CardContent className="mt-4 flex flex-row items-end justify-between gap-2">
                    <p>{message}</p>
                </CardContent>
            </Card>

            <Avatar>
                <AvatarImage src={from === "user" ? userInfo?.avatar_url : "/logo.png"} alt="Avatar" />
            </Avatar>
        </div>
    );
}