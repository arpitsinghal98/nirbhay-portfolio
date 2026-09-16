"use client";

import type { UIMessage } from "ai";
import { memo, useMemo } from "react";
import {
  Message,
  MessageContent,
  MessageResponse,
  type MessageResponseProps,
} from "@/components/ai-elements/message";
import { safeAssistantLink } from "@/lib/assistant/links";

const transformUrl = (url: string) => safeAssistantLink(url) ?? "";

export const AssistantMessage = memo(function AssistantMessage({
  message,
  streaming,
  onNavigate,
}: {
  message: UIMessage;
  streaming: boolean;
  onNavigate: () => void;
}) {
  const components = useMemo<MessageResponseProps["components"]>(
    () => ({
      img: () => null,
      a: ({ href, children }) => {
        const safe = href && safeAssistantLink(href);
        return safe ? (
          <a
            href={safe}
            onClick={safe.startsWith("#") ? onNavigate : undefined}
            target={
              safe.startsWith("https:") || safe.endsWith(".pdf")
                ? "_blank"
                : undefined
            }
            rel="noopener noreferrer"
            className="underline decoration-brand/50 underline-offset-4"
          >
            {children}
          </a>
        ) : (
          <span>{children}</span>
        );
      },
    }),
    [onNavigate],
  );
  const text = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
  if (!text) return null;
  return (
    <Message from={message.role}>
      <p className="font-mono text-[0.5625rem] tracking-wider text-muted-foreground">
        {message.role === "user" ? "YOU" : "PORTFOLIO GUIDE · AI"}
      </p>
      <MessageContent className="leading-7 [overflow-wrap:anywhere]">
        {message.role === "assistant" ? (
          <MessageResponse
            isAnimating={streaming}
            urlTransform={transformUrl}
            components={components}
          >
            {text}
          </MessageResponse>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </MessageContent>
    </Message>
  );
});
