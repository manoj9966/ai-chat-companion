import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "@/hooks/useChatStream";
import { Sparkles } from "lucide-react";

interface ChatWindowProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onExampleClick: (prompt: string) => void;
}

const EXAMPLES = [
  "Explain quantum computing in simple terms",
  "Give me a 5-day beginner workout plan",
  "Write a Python function to reverse a string",
];

export const ChatWindow = ({ messages, isStreaming, onExampleClick }: ChatWindowProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">How can I help you today?</h2>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          Ask anything — I'll explain it clearly with examples when useful.
        </p>
        <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => onExampleClick(ex)}
              className="rounded-xl border bg-card p-3 text-left text-sm text-card-foreground shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const lastIsAssistant = messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      {messages.map((m, i) => {
        const isLast = i === messages.length - 1;
        const streamingThis = isStreaming && isLast && m.role === "assistant";
        return (
          <MessageBubble
            key={i}
            role={m.role}
            content={m.content}
            isStreaming={streamingThis}
          />
        );
      })}
      {isStreaming && !lastIsAssistant && (
        <div className="flex items-center gap-2 px-11 text-sm text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
          AI is thinking…
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};
