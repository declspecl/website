"use client";

import { useSidebarState } from "@/context/SidebarContext";

interface ChatHistoryProps {}

export function ChatHistory() {
    const [sidebarState, setSidebarState] = useSidebarState();
}
