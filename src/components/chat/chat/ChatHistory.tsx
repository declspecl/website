"use client";

import { useSidebarState } from "@/context/SidebarContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatHistoryProps {
    messages: { from: string; message: string }[];
    userAvatarUrl: string;
}

export function ChatHistory({ messages, userAvatarUrl }: ChatHistoryProps) {
    const [sidebarState, setSidebarState] = useSidebarState();

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                {messages.map((chat, index) => (
                    <div
                        key={index}
                        className={`flex ${chat.from === "user" ? "justify-end" : "justify-start"} mb-4`}
                    >
                        {chat.from !== "user" && (
                            <div className="mr-2">
                                <Avatar>
                                    <AvatarImage src="/t-logo.png" alt="AI Avatar" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            </div>
                        )}

                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${chat.from === "user" ? "bg-blue-100 text-right" : "bg-gray-100"}`}
                        >
                            {chat.message}
                        </div>

                        {chat.from === "user" && (
                            <div className="ml-2">
                                <Avatar>
                                    <AvatarImage src={userAvatarUrl} alt="User Avatar" />
                                    <AvatarFallback>US</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <div className="flex rounded-md shadow-sm">
                    <Input type="text" placeholder="Send a message" className="rounded-r-none" />
                    <Button className="rounded-l-none">Send</Button>
                </div>
            </div>
        </div>
    );
}
