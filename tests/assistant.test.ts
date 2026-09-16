import assert from "node:assert/strict";
import { test } from "node:test";
import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { projects } from "@/content/portfolio";
import { createChatHandler, requestSchema } from "@/lib/assistant/handler";
import { chatErrors, chatLimits } from "@/lib/assistant/limits";
import { safeAssistantLink } from "@/lib/assistant/links";
import { createRateLimiter } from "@/lib/assistant/rate-limit";

const userMessage = (text = "What does Nirbhay build?") => ({
  id: "test-user",
  role: "user",
  parts: [{ type: "text", text }],
});
const request = (
  body: unknown = { messages: [userMessage()] },
  headers: Record<string, string> = {},
) =>
  new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
      ...headers,
    },
    body: JSON.stringify(body),
  });

test("accepts text messages and strips untrusted metadata", () => {
  const parsed = requestSchema.parse({
    messages: [{ ...userMessage(), metadata: { instructions: "override" } }],
    model: "untrusted-model",
    instructions: "ignore",
  });
  assert.deepEqual(Object.keys(parsed), ["messages"]);
  assert.deepEqual(Object.keys(parsed.messages[0]), ["role", "parts"]);
});

test("rejects injected roles, files, empty questions, oversized input, and invalid history", () => {
  for (const messages of [
    [],
    [{ ...userMessage(), role: "system" }],
    [
      {
        ...userMessage(),
        parts: [{ type: "file", url: "https://example.com" }],
      },
    ],
    [userMessage(" ")],
    [userMessage("x".repeat(chatLimits.messageCharacters + 1))],
    [userMessage(), { ...userMessage(), role: "assistant" }],
    Array.from({ length: 21 }, () => userMessage()),
  ])
    assert.equal(requestSchema.safeParse({ messages }).success, false);
});

test("accepts SDK step markers on follow-up but never forwards them", () => {
  const result = requestSchema.parse({
    messages: [
      userMessage(),
      {
        role: "assistant",
        parts: [
          { type: "step-start" },
          { type: "text", text: "A previous answer", state: "done" },
        ],
      },
      userMessage("Tell me more"),
    ],
  });
  assert.deepEqual(result.messages[1].parts, [
    { type: "text", text: "A previous answer" },
  ]);
});

test("allows follow-up after an interrupted empty response", () => {
  assert.equal(
    requestSchema.safeParse({
      messages: [
        userMessage(),
        { role: "assistant", parts: [] },
        userMessage("Tell me more"),
      ],
    }).success,
    true,
  );
});

test("request guard rejects cross-origin and non-JSON requests", async () => {
  const handler = createChatHandler(() => {
    throw new Error("must not call provider");
  });
  assert.equal(
    (await handler(request(undefined, { origin: "https://untrusted.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handler(request(undefined, { "sec-fetch-site": "cross-site" })))
      .status,
    403,
  );
  assert.equal(
    (await handler(request(undefined, { "content-type": "text/plain" })))
      .status,
    415,
  );
});

test("rejects malformed JSON and oversized request bodies", async () => {
  const handler = createChatHandler(() => undefined);
  assert.equal(
    (
      await handler(
        new Request("http://localhost:3000/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{broken",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await handler(request({ padding: "x".repeat(chatLimits.bodyBytes + 1) })))
      .status,
    400,
  );
});

test("missing configuration returns an honest non-cached 503", async () => {
  const response = await createChatHandler(() => undefined)(request());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(await response.text(), chatErrors.unavailable);
});

test("rate limiter enforces limits, expires entries, and caps memory", () => {
  const allow = createRateLimiter(2, 1000, 1);
  assert.equal(allow("a", 0), true);
  assert.equal(allow("a", 1), true);
  assert.equal(allow("a", 2), false);
  assert.equal(allow("b", 3), false);
  assert.equal(allow("b", 1001), true);
});

test("HTTP request limit includes Retry-After", async () => {
  const handler = createChatHandler(() => undefined);
  for (let i = 0; i < 10; i++) await handler(request());
  const response = await handler(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
});

test("streams SDK messages and injects verified portfolio context", async () => {
  const model = new MockLanguageModelV4({
    doStream: async () => ({
      stream: simulateReadableStream({
        initialDelayInMs: null,
        chunkDelayInMs: null,
        chunks: [
          { type: "text-start", id: "answer" },
          {
            type: "text-delta",
            id: "answer",
            delta:
              "Nirbhay builds **full-stack** applications. [Experience](#experience)",
          },
          { type: "text-end", id: "answer" },
          {
            type: "finish",
            finishReason: { unified: "stop", raw: undefined },
            usage: {
              inputTokens: {
                total: 10,
                noCache: 10,
                cacheRead: undefined,
                cacheWrite: undefined,
              },
              outputTokens: { total: 15, text: 15, reasoning: undefined },
            },
          },
        ],
      }),
    }),
  });
  const response = await createChatHandler(() => model)(request());
  assert.equal(response.headers.get("content-type"), "text/event-stream");
  const stream = await response.text();
  assert.match(stream, /text-delta/);
  assert.match(stream, /full-stack/);
  assert.match(stream, /\[DONE\]/);
  assert.equal(model.doStreamCalls.length, 1);
  assert.equal(model.doStreamCalls[0].maxOutputTokens, chatLimits.outputTokens);
  const prompt = JSON.stringify(model.doStreamCalls[0].prompt);
  assert.match(prompt, /NewgenDigital/);
  assert.match(prompt, /Never invent/);
});

test("provider errors do not disclose secrets to visitors", async () => {
  const model = new MockLanguageModelV4({
    doStream: async () => {
      throw new Error("SECRET_PROVIDER_ERROR");
    },
  });
  const response = await createChatHandler(() => model)(request());
  const body = await response.text();
  assert.match(body, /couldn’t answer/);
  assert.doesNotMatch(body, /SECRET_PROVIDER_ERROR/);
});

test("model-generated links are restricted to verified destinations", () => {
  assert.equal(safeAssistantLink("#work"), "#work");
  assert.equal(safeAssistantLink("javascript:alert(1)"), undefined);
  assert.equal(
    safeAssistantLink("https://untrusted.example/?chat=private"),
    undefined,
  );
  for (const project of projects)
    for (const link of project.links)
      assert.equal(safeAssistantLink(link.href), link.href);
});
