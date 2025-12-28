"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageBubble } from "@/components/chat/message-bubble"
import { streamChatResponse } from "@/lib/chat-service"
import { Message, ChatSession } from "@/lib/types"
import { Send, Plus, Info, MessageSquare, History, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const topics = ["İş Hukuku", "Kira Hukuku", "Aile Hukuku", "Ceza Hukuku", "Ticaret Hukuku", "İcra Hukuku"]

const STORAGE_KEY = "lexdanisman_sessions"

function ChatContent() {
    const searchParams = useSearchParams()
    const initialTopic = searchParams.get("topic")

    const [sessions, setSessions] = useState<ChatSession[]>([])
    const [activeSessionId, setActiveSessionId] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [editingTitle, setEditingTitle] = useState("")

    const scrollRef = useRef<HTMLDivElement>(null)

    // Initialization
    useEffect(() => {
        setIsClient(true)
        const savedSessions = localStorage.getItem(STORAGE_KEY)

        if (savedSessions) {
            try {
                const parsed = JSON.parse(savedSessions)
                setSessions(parsed)
                if (parsed.length > 0) {
                    // Load most recent
                    const mostRecent = parsed.sort((a: ChatSession, b: ChatSession) =>
                        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                    )[0]
                    setActiveSessionId(mostRecent.id)
                    setMessages(mostRecent.messages)
                } else {
                    createNewSession()
                }
            } catch (e) {
                createNewSession()
            }
        } else {
            createNewSession()
        }
    }, [])

    // Handle URL Param (Topic)
    useEffect(() => {
        if (initialTopic && isClient) {
            // If we just landed and have a topic, set it in input provided we are in a fresh session or user intent
            // Simplification: just prepend to input if empty
            if (!input) setInput(`${initialTopic} hakkında: `)
        }
    }, [initialTopic, isClient])

    // Save Sessions to Storage whenever they change
    useEffect(() => {
        if (isClient && sessions.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
        }
    }, [sessions, isClient])

    // Sync current messages to active session
    useEffect(() => {
        if (!activeSessionId || sessions.length === 0) return

        // Update the active session in the sessions list with new messages
        setSessions(prev => prev.map(s => {
            if (s.id === activeSessionId) {
                // Generate title if only 1 user message (it's the first one)
                let title = s.title
                const userMessages = messages.filter(m => m.role === 'user')
                if (s.title === 'Yeni Sohbet' && userMessages.length > 0) {
                    title = userMessages[0].content.slice(0, 30) + (userMessages[0].content.length > 30 ? '...' : '')
                }
                return {
                    ...s,
                    messages: messages,
                    title: title,
                    updatedAt: new Date().toISOString()
                }
            }
            return s
        }))

        // Auto scroll
        if (scrollRef.current) {
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
        }
    }, [messages, activeSessionId])

    const createNewSession = () => {
        const newId = Date.now().toString()
        const initialMsg: Message = {
            id: "init-" + newId,
            role: "assistant",
            content: "Merhaba! Ben LexDanisman. Size hukuki süreçlerinizde nasıl yardımcı olabilirim?",
            createdAt: new Date()
        }
        const newSession: ChatSession = {
            id: newId,
            title: "Yeni Sohbet",
            messages: [initialMsg],
            updatedAt: new Date().toISOString()
        }

        setSessions(prev => [...prev, newSession])
        setActiveSessionId(newId)
        setMessages([initialMsg])
        setInput("")
    }

    const loadSession = (id: string) => {
        const session = sessions.find(s => s.id === id)
        if (session) {
            setActiveSessionId(session.id)
            setMessages(session.messages)
        }
    }

    const deleteSession = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        // Optimistically update
        const newSessions = sessions.filter(s => s.id !== id)
        setSessions(newSessions)

        // If we deleted the active session, switch to another one
        if (activeSessionId === id) {
            if (newSessions.length > 0) {
                const mostRecent = [...newSessions].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
                setActiveSessionId(mostRecent.id)
                setMessages(mostRecent.messages)
            } else {
                // If it was the last session, create a new one (but we need to address state update async issue, 
                // effectively createNewSession triggers state update too. 
                // Simpler: just clear UI or trigger createNew. 
                // Since this runs in event handler, we can just call:
                // createNewSession() // But createNewSession uses previous state.

                // Let's manually do what createNewSession does but with forced empty list
                const newId = Date.now().toString()
                const initialMsg: Message = {
                    id: "init-" + newId,
                    role: "assistant",
                    content: "Merhaba! Ben LexDanisman. Size hukuki süreçlerinizde nasıl yardımcı olabilirim?",
                    createdAt: new Date()
                }
                const newSession: ChatSession = {
                    id: newId,
                    title: "Yeni Sohbet",
                    messages: [initialMsg],
                    updatedAt: new Date().toISOString()
                }
                setSessions([newSession])
                setActiveSessionId(newId)
                setMessages([initialMsg])
                setInput("")
            }
        }
    }


    const [statusMessage, setStatusMessage] = useState<string>("")

    // ...

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            createdAt: new Date()
        }

        const newHistory = [...messages, userMsg]
        setMessages(newHistory)
        setInput("")
        setIsLoading(true)
        setStatusMessage("Bağlanıyor...")

        // Placeholder for assistant
        const assistantMsgId = (Date.now() + 1).toString();
        const assistantMsg: Message = {
            id: assistantMsgId,
            role: "assistant",
            content: "",
            createdAt: new Date()
        }
        setMessages(prev => [...prev, assistantMsg])

        streamChatResponse(
            userMsg.content,
            (event) => {
                if (event.type === 'status') {
                    setStatusMessage(event.content);
                } else if (event.type === 'delta') {
                    // Start clearing status when we get first token
                    setStatusMessage("");
                    setMessages(prev => prev.map(m => {
                        if (m.id === assistantMsgId) {
                            return { ...m, content: m.content + event.content }
                        }
                        return m
                    }))
                }
            },
            () => { // onFinish
                setIsLoading(false)
                setStatusMessage("")
            },
            (err) => { // onError
                setIsLoading(false)
                setStatusMessage("")
                toast.error(err.message || "Bir hata oluştu")
                // Remove the empty message if it failed completely? 
                // Or leave it as error indicator? Let's leave it.
            }
        )
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!isClient) return null

    // Sorted sessions for sidebar
    const sortedSessions = [...sessions].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row bg-background">
            {/* Sidebar - History */}
            <aside className="hidden md:flex w-64 flex-col border-r border-border/40 bg-card/30 p-4">
                <div className="mb-4">
                    <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" onClick={createNewSession}>
                        <Plus className="h-4 w-4" /> Yeni Sohbet
                    </Button>
                </div>
                <div className="flex items-center gap-2 px-2 pb-2 text-xs font-semibold uppercase text-muted-foreground/70">
                    <History className="h-3 w-3" /> Geçmiş
                </div>
                <ScrollArea className="flex-1 -mx-2">
                    <div className="space-y-1 p-2">
                        {sortedSessions.map(session => (
                            <div key={session.id} className="group flex items-center w-full">
                                <Button
                                    variant={activeSessionId === session.id ? "secondary" : "ghost"}
                                    className={cn(
                                        "flex-1 justify-start text-sm font-normal truncate px-2.5",
                                        activeSessionId === session.id ? "bg-secondary/50 text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => loadSession(session.id)}
                                >
                                    <MessageSquare className="h-3 w-3 mr-2 opacity-70 shrink-0" />
                                    <span className="truncate">{session.title}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                    onClick={(e) => deleteSession(e, session.id)}
                                    title="Sohbeti Sil"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Chat Area */}
            <main className="flex flex-1 flex-col overflow-hidden relative">
                {/* Chat Header */}
                <header className="flex items-center h-14 border-b border-border/40 px-4 bg-background/50 backdrop-blur z-10 shrink-0">
                    {activeSessionId && (
                        <div className="flex-1">
                            {isEditingTitle ? (
                                <Input
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => {
                                        setIsEditingTitle(false)
                                        if (editingTitle.trim()) {
                                            setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, title: editingTitle } : s))
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.currentTarget.blur()
                                        }
                                    }}
                                    autoFocus
                                    className="h-8 font-serif font-bold text-lg border-none hover:bg-transparent focus-visible:ring-0 px-0 md:w-1/2"
                                />
                            ) : (
                                <h2
                                    onClick={() => {
                                        const session = sessions.find(s => s.id === activeSessionId)
                                        if (session) {
                                            setEditingTitle(session.title)
                                            setIsEditingTitle(true)
                                        }
                                    }}
                                    className="font-serif font-bold text-lg cursor-pointer hover:bg-muted/50 rounded px-2 py-1 -ml-2 inline-block transition-colors truncate max-w-[80%]"
                                    title="Başlığı düzenlemek için tıklayın"
                                >
                                    {sessions.find(s => s.id === activeSessionId)?.title || "Sohbet"}
                                </h2>
                            )}
                        </div>
                    )}
                </header>
                {/* Info Banner */}
                <div className="bg-yellow-600/10 border-b border-yellow-600/20 px-4 py-2 text-center text-xs text-yellow-600/80 flex items-center justify-center gap-2">
                    <Info className="h-3 w-3" />
                    <span>Bu servis bilgilendirme amaçlıdır. Nihai karar için avukata danışınız.</span>
                </div>

                <ScrollArea className="flex-1 p-4 md:p-6 pb-2">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-2 text-muted-foreground text-sm ml-2">
                                <span className="animate-pulse">LexDanisman yazıyor...</span>
                            </div>
                        )}
                        <div ref={scrollRef} className="h-2" />
                    </div>
                </ScrollArea>

                {/* Composer */}
                <div className="border-t border-border/40 bg-background/95 backdrop-blur p-4 pt-2">
                    <div className="max-w-3xl mx-auto space-y-3">
                        {/* Quick Prompts (Chips) */}
                        <ScrollArea className="w-full whitespace-nowrap pb-2">
                            <div className="flex w-max space-x-2 p-1">
                                {topics.map(topic => (
                                    <button
                                        key={topic}
                                        onClick={() => setInput(prev => `${topic} hakkında: `)}
                                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                            <div className="h-1.5" /> {/* Scrollbar spacer */}
                        </ScrollArea>

                        <div className="relative flex items-end gap-2">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Hukuki sorunuzu buraya yazın..."
                                className="min-h-[60px] max-h-[180px] resize-none pr-12 bg-muted/30 focus:bg-background border-primary/20 focus:border-primary/50 transition-colors shadow-inner rounded-xl"
                            />
                            <div className="absolute right-3 bottom-3 flex items-center gap-2">
                                <Button size="icon" className="h-8 w-8 rounded-full shadow-lg shadow-primary/20 mb-1" onClick={handleSend} disabled={isLoading || !input.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] text-muted-foreground opacity-50">LexDanisman yapay zeka altyapısı kullanmaktadır. Hatalı bilgi verebilir.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Yükleniyor...</div>}>
            <ChatContent />
        </Suspense>
    )
}

