"use client";

import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebarState } from "@/context/SidebarContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LucideLoader2 } from "lucide-react";

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
        <div className={cn("flex flex-row self-end items-end gap-4", { "flex-row-reverse self-start": from === "website" })}>
            <Card>
                <CardContent className="mt-4 flex flex-row items-end justify-between gap-2">
                    {message.length ? (
                        <p>{message}</p>
                    ) : (
                        <p className="inline-flex items-center flex-row gap-2">
                            <span>I'm working on it...</span>
                            <LucideLoader2 className="animate-spin" />
                        </p>
                    )}
                </CardContent>
            </Card>

            <Avatar>
                <AvatarImage src={from === "user" ? userInfo?.avatar_url : "/logo.png"} alt="Avatar" />
            </Avatar>
        </div>
    );
}