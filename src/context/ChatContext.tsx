"use client";

import { RepositoryItem } from "@/lib/ddb";
import React, { createContext, useContext, useState } from "react";

export interface ChatState {
    repositoryItem: RepositoryItem;
}

const ChatStateContext = createContext<ChatState | null>(null);
const SetChatStateContext = createContext<React.Dispatch<React.SetStateAction<ChatState>> | null>(null);

interface ChatProviderProps {
    initialValue: ChatState;
    children: React.ReactNode;
}

export function ChatStateProvider({ initialValue, children }: ChatProviderProps) {
    const [state, setState] = useState<ChatState>(initialValue);

    return (
        <ChatStateContext.Provider value={state}>
            <SetChatStateContext.Provider value={setState}>{children}</SetChatStateContext.Provider>
        </ChatStateContext.Provider>
    );
}

export function useChatState(): [ChatState, React.Dispatch<React.SetStateAction<ChatState>>] {
    const state = useContext(ChatStateContext);
    const setState = useContext(SetChatStateContext);

    if (!state || !setState) {
        throw new Error("useChatState must be used within a ChatProvider");
    }

    return [state, setState];
}
