"use client";

import type React from "react";
import { CreateProjectButton } from "@/components/chat/sidebar/CreateProjectButton";

export default function ChatPage() {
    return (
        <div className="grow h-[100dvh] flex flex-row items-center justify-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-semibold">Start a conversation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Ask questions about your repository or discuss code with your team
                </p>

                <CreateProjectButton />
            </div>
        </div>
    );
}
