## AI Chatbot — what we're building

A clean, modern chatbot website where anyone can ask any question and get a clear, accurate answer with examples. Replies stream in token-by-token (ChatGPT-style) and render properly formatted markdown (code blocks, lists, bold).

> **Note on stack:** Lovable apps run on React + Vite, not vanilla HTML/Express. The end result is the same chatbot you described — clean UI, a `/chat` backend endpoint, AI integration with your exact system prompt — just built on Lovable's stack so it deploys instantly with no `.env` setup or `npm install` needed.

---

## 1. Chat UI (the page)

A single full-height page with:

- **Header bar** — app title ("AI Chatbot") and a subtle "New chat" button to clear the conversation.
- **Message window** — scrollable area showing the conversation:
  - User messages aligned right, in a colored bubble.
  - AI messages aligned left, in a neutral bubble, with markdown rendering (headings, **bold**, lists, `inline code`, fenced code blocks with syntax styling).
  - A blinking cursor on the assistant bubble while a reply is streaming in.
  - Auto-scroll to the bottom as new tokens arrive.
  - Empty state: a friendly welcome message and 3 example prompts the user can click to send.
- **Input bar** (sticky at the bottom):
  - Auto-growing textarea (Enter to send, Shift+Enter for newline).
  - Send button (disabled while empty or while a reply is streaming).
  - Subtle "AI is thinking…" indicator before the first token arrives.

Styling: modern minimalist — rounded bubbles, soft shadows, generous spacing, light/dark friendly via the design system. Mobile-responsive.

## 2. Backend (the `/chat` endpoint equivalent)

A serverless **edge function** named `chat` that plays the exact role your Express endpoint would:

- Accepts a `POST` with the conversation messages.
- Forwards them to the AI with this system prompt (your exact wording):
  > *"You are an advanced AI chatbot that answers any question clearly, accurately, and in simple language with examples when needed."*
- Streams the AI response back to the browser as Server-Sent Events.
- Handles errors cleanly:
  - `429` (rate limit) → friendly toast: "Too many requests, please slow down."
  - `402` (out of credits) → toast pointing to workspace billing.
  - Network errors → toast "Something went wrong, please try again."

## 3. AI Integration

- **Provider:** Lovable AI Gateway (no API key setup — handled automatically).
- **Model:** `google/gemini-3-flash-preview` — fast, high-quality, cost-effective. Easy to swap later.
- **System prompt:** the exact text you specified, set on the backend (not the client) so users can't override it.
- **Full conversation memory:** every request sends the entire chat history so the AI has context.

## 4. Project structure (Lovable equivalent of your layout)

| You asked for | Lovable equivalent |
|---|---|
| `server.js` | `supabase/functions/chat/index.ts` (edge function) |
| `package.json` | Already managed by Lovable |
| `.env` for API key | `LOVABLE_API_KEY` auto-provisioned — nothing to configure |
| `public/index.html` | `index.html` + `src/main.tsx` |
| `public/style.css` | `src/index.css` + Tailwind design tokens |
| `public/script.js` | `src/pages/Index.tsx` + `src/components/Chat/*` |

New files we'll create:
- `src/pages/Index.tsx` — chatbot page
- `src/components/Chat/ChatWindow.tsx` — message list + auto-scroll
- `src/components/Chat/MessageBubble.tsx` — bubble with markdown rendering
- `src/components/Chat/ChatInput.tsx` — textarea + send button
- `src/hooks/useChatStream.ts` — handles SSE streaming, message state, errors
- `supabase/functions/chat/index.ts` — the AI backend

Plus `react-markdown` added for rendering.

## 5. Run instructions

Nothing to install or configure. Once implemented:
- The preview updates live — just start chatting.
- To deploy publicly, click **Publish** in the top right.
- To swap the model later, edit one line in `supabase/functions/chat/index.ts`.

## What's intentionally out of scope (ask if you want any of these)

- Login / saved chat history across sessions
- File or image uploads to the chat
- Voice input
- Multi-conversation sidebar

Approve this plan and I'll build it.