import { cn } from "@/lib/utils"
import { Scale, User } from "lucide-react"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MessageBubbleProps {
    role: "user" | "assistant"
    content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
    return (
        <div className={cn("flex w-full items-start gap-4 mb-4", role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
                role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border")}>
                {role === "user" ? <User className="h-4 w-4" /> : <Scale className="h-4 w-4 text-primary" />}
            </div>
            <div className={cn("flex max-w-[85%] md:max-w-[75%] flex-col gap-2 rounded-2xl px-5 py-4 text-sm shadow-md overflow-hidden",
                role === "user" ? "bg-primary text-primary-foreground rounded-tr-none selection:bg-white selection:text-primary" : "bg-card border border-border/60 text-card-foreground rounded-tl-none")}>
                {/* <div className="whitespace-pre-wrap leading-relaxed">{content}</div> */}
                <div className={cn("prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed",
                    role === "user" ? "prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-li:text-primary-foreground" : "")}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                            li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                            strong: ({ node, ...props }) => <span className="font-bold text-primary dark:text-amber-500/90" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-500 underline underline-offset-4 hover:text-blue-600" target="_blank" rel="noopener noreferrer" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2 mt-4" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2 mt-3" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-1 mt-2" {...props} />,
                            code: ({ node, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <div className="bg-slate-950 rounded-md p-2 my-2 overflow-x-auto">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </div>
                                ) : (
                                    <code className="bg-slate-800/50 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
