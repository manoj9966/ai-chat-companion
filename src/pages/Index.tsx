import { Sparkles, RotateCcw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "@/components/Chat/ChatWindow";
import { ChatInput } from "@/components/Chat/ChatInput";
import { useChatStream } from "@/hooks/useChatStream";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { messages, isStreaming, send, reset } = useChatStream();
  const { user, signOut } = useAuth();

  return (
    <main className="flex h-screen flex-col bg-background" style={{ backgroundImage: "var(--gradient-bg)" }}>
      <header className="flex items-center justify-between border-b border-border/50 bg-background/60 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-base font-semibold tracking-tight">Mano</h1>
            {user?.email && (
              <span className="text-[10px] text-muted-foreground">{user.email}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={messages.length === 0 || isStreaming}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">New chat</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto" aria-label="Conversation">
        <ChatWindow messages={messages} isStreaming={isStreaming} onExampleClick={send} />
      </section>

      <ChatInput onSend={send} disabled={isStreaming} />
    </main>
  );
};

export default Index;
