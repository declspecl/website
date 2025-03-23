"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProjectSidebar } from "@/components/ui/project-sidebar"
import { CreateProjectDialog } from "@/components/ui/create-project-dialog";import { Send } from "lucide-react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function ChatPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { text: inputValue, sender: "user" }])
    setInputValue("")

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `This is a response to your message about ${selectedRepo || "your project"}`,
          sender: "bot",
        },
      ])
    }, 1000)
  }

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <ProjectSidebar
          onCreateProject={() => setIsDialogOpen(true)}
          onSelectRepo={setSelectedRepo}
          selectedRepo={selectedRepo}
        />

        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            {selectedRepo ? (
              <>
                <div className="border-b p-4">
                  <h2 className="text-xl font-semibold">{selectedRepo}</h2>
                  <p className="text-sm text-muted-foreground">Chat about this repository</p>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center text-center p-8">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                          <h3 className="text-xl font-semibold">Start a conversation</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Ask questions about your repository or discuss code with your team
                          </p>
                          <div className="grid w-full max-w-sm gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setMessages([...messages, { text: "Tell me about this repository", sender: "user" }])
                                setTimeout(() => {
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      text: `This is a repository called ${selectedRepo}. You can ask specific questions about the code, issues, or pull requests.`,
                                      sender: "bot",
                                    },
                                  ])
                                }, 1000)
                              }}
                            >
                              Tell me about this repository
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setMessages([...messages, { text: "What are the recent changes?", sender: "user" }])
                                setTimeout(() => {
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      text: `Here are the recent changes to ${selectedRepo}:\n- Updated README.md\n- Fixed bug in login component\n- Added new feature`,
                                      sender: "bot",
                                    },
                                  ])
                                }, 1000)
                              }}
                            >
                              What are the recent changes?
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center p-8">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-semibold">No repository selected</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a repository from the sidebar or create a new project to start chatting
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>Create New Project</Button>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>

      <CreateProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSelectRepo={setSelectedRepo} />
    </SidebarProvider>
  )
}

