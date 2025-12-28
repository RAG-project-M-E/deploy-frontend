export interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    createdAt: Date
}

export interface ChatState {
    messages: Message[]
    isLoading: boolean
}

export interface ChatSession {
    id: string
    title: string
    messages: Message[]
    updatedAt: string // ISO Date string for storage
}
