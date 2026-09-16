import {
  createUIMessageStreamResponse,
  type LanguageModel,
  streamText,
  toUIMessageStream,
} from "ai";
import { z } from "zod";
import { assistantInstructions } from "@/lib/assistant/knowledge";
import { chatErrors, chatLimits } from "@/lib/assistant/limits";
import { createRateLimiter } from "@/lib/assistant/rate-limit";

const messageSchema = z
  .object({
    role: z.enum(["user", "assistant"]),
    parts: z
      .array(
        z.union([
          z.object({
            type: z.literal("text"),
            text: z.string().trim().max(6000),
          }),
          z.object({ type: z.literal("step-start") }),
        ]),
      )
      .max(8),
  })
  .transform((message) => ({
    ...message,
    parts: message.parts.filter((part) => part.type === "text"),
  }));
export const requestSchema = z
  .object({
    messages: z.array(messageSchema).min(1).max(chatLimits.historyMessages),
  })
  .superRefine(({ messages }, ctx) => {
    let total = 0;
    messages.forEach((message) => {
      const length = message.parts.reduce(
        (sum, part) => sum + part.text.length,
        0,
      );
      total += length;
      if (
        message.role === "user" &&
        (length === 0 || length > chatLimits.messageCharacters)
      )
        ctx.addIssue({ code: "custom", message: "Invalid conversation" });
    });
    if (
      messages[0]?.role !== "user" ||
      messages.at(-1)?.role !== "user" ||
      total > chatLimits.historyCharacters
    )
      ctx.addIssue({ code: "custom", message: "Invalid conversation" });
  });

function failure(message: string, status: number) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...(status === 429 ? { "Retry-After": "60" } : {}),
    },
  });
}

async function readBoundedBody(request: Request) {
  if (Number(request.headers.get("content-length")) > chatLimits.bodyBytes)
    throw new Error("Body too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  let size = 0;
  let text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > chatLimits.bodyBytes) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export function createChatHandler(getModel: () => LanguageModel | undefined) {
  const allowClient = createRateLimiter();
  const allowInstance = createRateLimiter(150);
  return async function handleChat(request: Request) {
    const origin = request.headers.get("origin");
    if (
      (origin && origin !== new URL(request.url).origin) ||
      request.headers.get("sec-fetch-site") === "cross-site"
    )
      return failure(chatErrors.origin, 403);
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return failure(chatErrors.invalid, 415);
    // Vercel overwrites x-vercel-forwarded-for. Don't trust arbitrary forwarded
    // headers on other hosts: use one shared bucket there instead.
    const client = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "shared"
      : "shared";
    if (!allowInstance("instance") || !allowClient(client))
      return failure(chatErrors.busy, 429);
    let parsed: z.infer<typeof requestSchema>;
    try {
      parsed = requestSchema.parse(await readBoundedBody(request));
    } catch {
      return failure(chatErrors.invalid, 400);
    }
    try {
      const model = getModel();
      if (!model) return failure(chatErrors.unavailable, 503);
      const result = streamText({
        model,
        instructions: assistantInstructions,
        messages: parsed.messages
          .filter((message) => message.parts.some((part) => part.text))
          .map((message) => ({
            role: message.role,
            content: message.parts.map((part) => part.text).join("\n"),
          })),
        maxOutputTokens: chatLimits.outputTokens,
        reasoning: "none",
        maxRetries: 1,
        abortSignal: AbortSignal.any([
          request.signal,
          AbortSignal.timeout(25_000),
        ]),
        onError: () => {
          /* Provider errors are deliberately not logged: they may contain request data. */
        },
      });
      return createUIMessageStreamResponse({
        stream: toUIMessageStream({
          stream: result.stream,
          sendReasoning: false,
          onError: () => chatErrors.failed,
        }),
        headers: { "Cache-Control": "no-store" },
      });
    } catch {
      return failure(chatErrors.failed, 502);
    }
  };
}
