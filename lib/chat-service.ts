
export type StreamEventType = 'status' | 'delta' | 'error' | 'done';

export interface StreamEvent {
    type: StreamEventType;
    content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000";

export function streamChatResponse(
    query: string,
    onEvent: (event: StreamEvent) => void,
    onFinish: () => void,
    onError: (error: Error) => void
): () => void { // Returns a cleanup/close function
    const url = new URL(`${API_BASE_URL}/chat/stream`);
    url.searchParams.append("query", query);

    const eventSource = new EventSource(url.toString());

    eventSource.onmessage = (event) => {
        try {
            const parsedData = JSON.parse(event.data);
            const { type, content } = parsedData;

            if (type === 'done') {
                eventSource.close();
                onFinish();
            } else if (type === 'error') {
                eventSource.close();
                onError(new Error(content));
            } else {
                onEvent({ type, content });
            }
        } catch (e) {
            console.error("Error parsing SSE data", e);
        }
    };

    eventSource.onerror = (err) => {
        console.error("SSE Error:", err);
        eventSource.close();
        onError(new Error("Bağlantı hatası oluştu."));
    };

    return () => {
        eventSource.close();
    };
}
