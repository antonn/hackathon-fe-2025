"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, Bot, User, FileText, Loader2, Plus, History, Trash2, AlertCircle } from "lucide-react"
import { mockRegulatoryCases } from "../lib/mock-data"
import {
  type ChatMessage,
  type ChatSession,
  createChatSession,
  getChatSession,
  getChatSessionsForCase,
  addMessageToSession,
  chatWithCase,
} from "../lib/chat-service"

export function RegulatoryChat() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("")
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [error, setError] = useState<string>("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedCase = mockRegulatoryCases.find((c) => c.id === selectedCaseId)
  const currentSession = getChatSession(currentSessionId)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load chat sessions when case changes
  useEffect(() => {
    if (selectedCaseId) {
      const sessions = getChatSessionsForCase(selectedCaseId)
      setChatSessions(sessions)

      // If there's an active session for this case, load it
      const activeSession = sessions.find((s) => s.id === currentSessionId)
      if (activeSession) {
        setMessages(activeSession.messages)
      } else {
        setMessages([])
        setCurrentSessionId("")
      }
    } else {
      setChatSessions([])
      setMessages([])
      setCurrentSessionId("")
    }
  }, [selectedCaseId, currentSessionId])

  const startNewChat = () => {
    if (!selectedCaseId) return

    const newSession = createChatSession(selectedCaseId)
    setCurrentSessionId(newSession.id)
    setMessages([])
    setChatSessions((prev) => [...prev, newSession])

    // Add welcome message
    const welcomeMessage = addMessageToSession(newSession.id, {
      role: "assistant",
      content: `Hello! I'm your AI assistant for the regulatory case "${selectedCase?.name}". I have comprehensive knowledge about this case including its compliance status, risk assessment, impact analysis, and implementation recommendations. How can I help you today?`,
      caseId: selectedCaseId,
    })

    setMessages([welcomeMessage])
  }

  const loadChatSession = (sessionId: string) => {
    const session = getChatSession(sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages(session.messages)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSessionId || !selectedCaseId || isLoading) return

    setError("")
    setIsLoading(true)

    try {
      // Add user message
      const userMessage = addMessageToSession(currentSessionId, {
        role: "user",
        content: inputMessage.trim(),
        caseId: selectedCaseId,
      })

      setMessages((prev) => [...prev, userMessage])
      setInputMessage("")

      // Get AI response
      const conversationMessages = [...messages, userMessage]
      const stream = await chatWithCase(conversationMessages, selectedCaseId)

      // Create assistant message
      const assistantMessage = addMessageToSession(currentSessionId, {
        role: "assistant",
        content: "", // Will be filled by streaming
        caseId: selectedCaseId,
      })

      setMessages((prev) => [...prev, assistantMessage])

      // Stream the response
      const reader = stream.getReader()
      let accumulatedContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        accumulatedContent += value

        // Update the assistant message content
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg)),
        )
      }

      // Update the session with final content
      const session = getChatSession(currentSessionId)
      if (session) {
        const messageIndex = session.messages.findIndex((m) => m.id === assistantMessage.id)
        if (messageIndex !== -1) {
          session.messages[messageIndex].content = accumulatedContent
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setError("Failed to get response. Please try again.")
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const clearChat = () => {
    if (currentSessionId) {
      const session = getChatSession(currentSessionId)
      if (session) {
        session.messages = []
        setMessages([])
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Chat with your regulatory cases using AI-powered analysis and insights
          </p>
        </div>

        {/* Case Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Regulatory Case</CardTitle>
            <CardDescription>Choose a regulatory case to start chatting with AI assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a regulatory case..." />
              </SelectTrigger>
              <SelectContent>
                {mockRegulatoryCases.map((regulatoryCase) => (
                  <SelectItem key={regulatoryCase.id} value={regulatoryCase.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{regulatoryCase.name}</span>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant="outline" className="text-xs">
                          {regulatoryCase.category}
                        </Badge>
                        <Badge
                          variant={
                            regulatoryCase.priority === "high"
                              ? "destructive"
                              : regulatoryCase.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {regulatoryCase.priority}
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedCase && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">{selectedCase.name}</p>
                    <p className="text-sm text-blue-700">
                      {selectedCase.category} • {selectedCase.documentsCount} documents • Created{" "}
                      {selectedCase.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant={selectedCase.status === "analyzed" ? "default" : "secondary"} className="capitalize">
                  {selectedCase.status.replace("_", " ")}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      {selectedCaseId && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Chat Sessions Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Chat Sessions</CardTitle>
                <Button size="sm" onClick={startNewChat} disabled={!selectedCaseId}>
                  <Plus className="h-4 w-4 mr-1" />
                  New Chat
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {chatSessions.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {chatSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentSessionId === session.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onClick={() => loadChatSession(session.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <History className="h-4 w-4" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Chat {session.id.slice(-4)}</p>
                            <p className="text-xs opacity-75">
                              {session.messages.length} messages • {formatTimestamp(session.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No chat sessions yet</p>
                    <p className="text-xs">Start a new chat to begin</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Chat Area */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                    <CardDescription>
                      {currentSession
                        ? `Chat Session ${currentSession.id.slice(-4)}`
                        : "Select or start a chat session"}
                    </CardDescription>
                  </div>
                </div>
                {currentSessionId && (
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>

            {currentSessionId ? (
              <>
                {/* Messages Area */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[500px] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start space-x-3 ${
                            message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex-1 max-w-[80%] p-3 rounded-lg ${
                              message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-gray-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-75 mt-2">{formatTimestamp(message.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 max-w-[80%] p-3 rounded-lg bg-gray-100">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <p className="text-sm">AI is thinking...</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                <Separator />

                {/* Input Area */}
                <CardContent className="p-4">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about compliance requirements, risks, implementation strategies..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Start a Conversation</h3>
                  <p className="text-sm mb-4">
                    Select a regulatory case and start a new chat to begin asking questions about compliance, risks, and
                    implementation strategies.
                  </p>
                  <Button onClick={startNewChat} disabled={!selectedCaseId}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Chat
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedCaseId && (
        <Card className="flex items-center justify-center h-64">
          <CardContent className="text-center">
            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">AI Assistant Ready</h3>
            <p className="text-muted-foreground">
              Please select a regulatory case from the dropdown above to start chatting with the AI assistant.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
