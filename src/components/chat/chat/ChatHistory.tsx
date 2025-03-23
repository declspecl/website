"use client";

import { useState } from "react";
import { LucideSend } from "lucide-react";
import { RepositoryItem } from "@/lib/ddb";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat/chat/ChatMessage";

interface ChatHistoryProps {
    repositoryItem: RepositoryItem;
}

export function ChatHistory({ repositoryItem }: ChatHistoryProps) {
    const [userPrompt, setUserPrompt] = useState<string>("");
    const [repositoryState, setRepositoryState] = useState<RepositoryItem>(repositoryItem);
    const [chatSubmissionState, setChatSubmissionState] = useState<"idle" | "loading">("idle");

    return (
        <div className="p-4 h-[100dvh] grow flex flex-col gap-4">
            <ScrollArea className="grow">
                {repositoryState.chats.length === 0 ? (
                    <p>You haven't said anything yet</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {repositoryState.chats.map((chat) => (
                            <ChatMessage
                                key={`chat-${chat.createdAt}`}
                                message={chat.message}
                                from={chat.from}
                                createdAt={chat.createdAt}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>

            <div className="w-full flex flex-row items-center justify-between gap-2">
                <Textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    disabled={chatSubmissionState === "loading"}
                    className="grow"
                    placeholder="Type your message here..."
                    rows={1}
                /> 

                <Button disabled={chatSubmissionState === "loading"} className="py-6 px-4 flex flex-row gap-2" onClick={async () => {
                    setChatSubmissionState("loading");

                    const prevState = repositoryState;
                    setRepositoryState((prevState) => ({
                        ...prevState,
                        chats: [
                            ...prevState.chats,
                            {
                                message: userPrompt,
                                from: "user",
                                createdAt: new Date().toISOString()
                            }
                        ]
                    }));

                    try {
                        await fetch(`/api/repository/${repositoryState.repositoryName}/chat`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                message: userPrompt
                            })
                        });
                    }
                    catch (e) {
                        console.error(e);
                        setRepositoryState(prevState);
                        alert("An error occurred while sending the message");
                    }

                    setUserPrompt("");
                    setChatSubmissionState("idle");
                }}>
                    <LucideSend className="w-8 h-8" />
                </Button>
            </div>
        </div>
    );
}
