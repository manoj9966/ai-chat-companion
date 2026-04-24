import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "@/components/Chat/ChatWindow";
import { ChatInput } from "@/components/Chat/ChatInput";
import { useChatStream } from "@/hooks/useChatStream";

const Index = () => {
  const { messages, isStreaming, send, reset } = useChatStream();

  return (
    <main className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <h1 className="text-base font-semibold tracking-tight">Andf</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={messages.length === 0 || isStreaming}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          New chat
        </Button>
      </header>

      <section className="flex-1 overflow-y-auto" aria-label="Conversation">
        <ChatWindow messages={messages} isStreaming={isStreaming} onExampleClick={send} />
      </section>

      <ChatInput onSend={send} disabled={isStreaming} />
    </main>
  );
};

export default Index;
