"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageBubble } from "@/components/chat/message-bubble"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Message } from "@/lib/types"
import { streamChatResponse } from "@/lib/chat-service"
import { MessageSquare, Send } from "lucide-react"

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Initial message
    useEffect(() => {
        if (messages.length === 0 && isOpen) {
            setMessages([{
                id: "init-widget",
                role: "assistant",
                content: "Merhaba! Hukuki bir sorunuz mu var? Buradan hızlıca sorabilirsiniz.",
                createdAt: new Date()
            }])
        }
    }, [isOpen])

    // Scroll
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages, isOpen])

    const [status, setStatus] = useState("")

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, createdAt: new Date() }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)
        setStatus("Bağlanıyor...")

        const assistantMsgId = (Date.now() + 1).toString();
        const assistantMsg: Message = { id: assistantMsgId, role: "assistant", content: "", createdAt: new Date() }
        setMessages(prev => [...prev, assistantMsg])

        streamChatResponse(
            userMsg.content,
            (event) => {
                if (event.type === 'status') {
                    setStatus(event.content)
                } else if (event.type === 'delta') {
                    setStatus("")
                    setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: m.content + event.content } : m))
                }
            },
            () => { // onFinish
                setIsLoading(false)
                setStatus("")
            },
            (err) => { // onError
                setIsLoading(false)
                setStatus("")
                // Leave the partial message or show error?
                // Just keep silent or maybe update content?
                setMessages(prev => prev.map(m => m.id === assistantMsgId ? { ...m, content: m.content + "\n\n(Bağlantı hatası oluştu)" } : m))
            }
        )
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl shadow-primary/20 z-50 animate-in fade-in zoom-in duration-300 hover:scale-110 transition-transform"
                    size="icon"
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[100vw] sm:w-[500px] flex flex-col p-0 gap-0 border-l border-border/50 rounded-none sm:rounded-l-2xl">
                <SheetHeader className="p-4 border-b border-border/40 bg-muted/20">
                    <SheetTitle className="flex items-center gap-2">
                        <span className="text-primary text-xl">⚖️</span> LexDanisman Asistan
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex flex-col overflow-hidden bg-background">
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4 pb-4">
                            {messages.map(m => <MessageBubble key={m.id} role={m.role} content={m.content} />)}
                            {isLoading && <p className="text-xs text-muted-foreground animate-pulse ml-2">Yazıyor...</p>}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t border-border/40 bg-muted/10">
                        <div className="relative flex items-center gap-2">
                            <Textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Sorunuzu yazın..."
                                className="min-h-[50px] resize-none pr-10"
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                            <Button size="icon" className="absolute right-2 bottom-3 h-8 w-8 rounded-full" onClick={handleSend} disabled={isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
