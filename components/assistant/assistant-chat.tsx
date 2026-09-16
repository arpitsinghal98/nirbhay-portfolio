"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, ArrowUpRight, RotateCcw, Square } from "lucide-react";
import { useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { AssistantMessage } from "@/components/assistant/assistant-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { suggestedQuestions } from "@/content/portfolio";
import { profile } from "@/content/profile";
import { chatErrors, chatLimits } from "@/lib/assistant/limits";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export default function AssistantChat({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    regenerate,
    setMessages,
    clearError,
  } = useChat({ transport });
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";
  const full = messages.length >= chatLimits.historyMessages;
  const errorMessage =
    error &&
    Object.values(chatErrors).find((message) => message === error.message);

  function submit(text: string) {
    const question = text.trim();
    if (!question || busy || full) return;
    clearError();
    setInput("");
    void sendMessage({ text: question });
  }

  return (
    <>
      <Conversation
        aria-label="Conversation with Nirbhay’s AI guide"
        className="min-h-0"
        initial="instant"
        resize="instant"
      >
        <ConversationContent className="gap-6 p-6">
          {messages.length === 0 && (
            <div className="py-4">
              <p className="font-mono text-[0.5625rem] tracking-widest text-muted-foreground">
                A MORE PERSONAL WAY TO EXPLORE
              </p>
              <h3 className="mt-5 text-3xl leading-tight tracking-tight">
                A little curious?
                <br />
                <em className="font-serif font-normal text-brand">
                  You’re in the right place.
                </em>
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                I’m an AI guide to Nirbhay’s work, not Nirbhay himself. Ask
                about his projects, skills, or experience.
              </p>
              <div className="mt-6 grid gap-2">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    onClick={() => submit(question)}
                    className="h-auto min-h-11 justify-between gap-2 bg-card px-3 py-3 text-left text-xs font-normal whitespace-normal"
                  >
                    {question}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0"
                    />
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => (
            <AssistantMessage
              key={message.id}
              message={message}
              streaming={
                status === "streaming" && message.id === messages.at(-1)?.id
              }
              onNavigate={onNavigate}
            />
          ))}
          {status === "submitted" && (
            <output className="text-xs text-muted-foreground">
              Looking through Nirbhay’s background…
            </output>
          )}
          {error && (
            <div
              role="alert"
              className="rounded-md border border-brand/25 bg-brand/5 p-4"
            >
              <p className="text-xs leading-6">
                {errorMessage ?? chatErrors.failed}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  clearError();
                  void regenerate();
                }}
                className="mt-2 px-0 text-xs"
              >
                <RotateCcw aria-hidden="true" className="size-3" />
                Try again
              </Button>
            </div>
          )}
          {full && !busy && (
            <output className="text-xs leading-6 text-muted-foreground">
              That’s a full conversation. Start a new one to keep exploring.
            </output>
          )}
        </ConversationContent>
        <ConversationScrollButton aria-label="Scroll to latest message" />
      </Conversation>
      <div className="shrink-0 border-t px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[0.625rem] text-muted-foreground">
          <div className="flex gap-4">
            {/* biome-ignore lint/a11y/useValidAnchor: Native section navigation also closes the modal. */}
            <a
              href="#work"
              onClick={onNavigate}
              className="py-2 hover:text-brand"
            >
              Projects ↗
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 hover:text-brand"
            >
              Résumé ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="py-2 hover:text-brand"
            >
              Contact ↗
            </a>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              disabled={busy}
              className="h-8 px-0 text-[0.625rem]"
              onClick={() => {
                setMessages([]);
                clearError();
                setInput("");
                inputRef.current?.focus();
              }}
            >
              New conversation
            </Button>
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
          className="flex items-end gap-2 rounded-md border bg-card p-2 focus-within:ring-2 focus-within:ring-ring/40"
        >
          <label htmlFor="assistant-question" className="sr-only">
            Ask about Nirbhay
          </label>
          <Textarea
            ref={inputRef}
            id="assistant-question"
            name="question"
            value={input}
            maxLength={chatLimits.messageCharacters}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submit(input);
              }
            }}
            disabled={full}
            placeholder="Ask about Nirbhay…"
            rows={1}
            className="max-h-28 min-h-10 resize-none border-0 bg-transparent p-2 text-base shadow-none focus-visible:ring-0 sm:text-sm"
          />
          {busy ? (
            <Button
              type="button"
              size="icon"
              onClick={() => void stop()}
              aria-label="Stop response"
              className="shrink-0"
            >
              <Square aria-hidden="true" className="size-3" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || full}
              aria-label="Send question"
              className="shrink-0"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
            </Button>
          )}
        </form>
        <p className="mt-3 text-[0.5625rem] leading-4 text-muted-foreground">
          AI can make mistakes. Answers use his résumé and portfolio. Messages
          go to an AI provider; don’t share sensitive information. This site
          doesn’t save your chat.
        </p>
      </div>
    </>
  );
}
