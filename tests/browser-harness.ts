/** Local-only streaming fixture. Run `bun tests/browser-harness.ts` while a
 * production preview runs on port 3001. Never deploy this server. No API key used. */
import { createServer } from "node:http";
import { Readable } from "node:stream";
import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import { createChatHandler } from "@/lib/assistant/handler";

const fixture =
  "**LOCAL TEST FIXTURE — not a live AI response.**\n\nNirbhay builds full-stack applications and AI workflows.\n\n- React and .NET Core\n- Document retrieval and AI agents\n\nExplore his [experience](#experience). [Unsafe link](https://untrusted.example)\n\n";
const model = new MockLanguageModelV4({
  doStream: async () => ({
    stream: simulateReadableStream({
      initialDelayInMs: 100,
      chunkDelayInMs: 200,
      chunks: [
        { type: "text-start", id: "fixture" },
        ...(fixture.match(/[\s\S]{1,16}/g)?.map((delta) => ({
          type: "text-delta" as const,
          id: "fixture",
          delta,
        })) ?? []),
        { type: "text-end", id: "fixture" },
        {
          type: "finish",
          finishReason: { unified: "stop", raw: undefined },
          usage: {
            inputTokens: {
              total: 1,
              noCache: 1,
              cacheRead: undefined,
              cacheWrite: undefined,
            },
            outputTokens: { total: 1, text: 1, reasoning: undefined },
          },
        },
      ],
    }),
  }),
});
const chat = createChatHandler(() => model);

const server = createServer(async (incoming, outgoing) => {
  try {
    const path = incoming.url || "/";
    const headers = new Headers();
    for (const [key, value] of Object.entries(incoming.headers))
      if (value && key !== "host")
        headers.set(key, Array.isArray(value) ? value.join(",") : value);
    const abort = new AbortController();
    outgoing.on("close", () => abort.abort());
    let response: Response;
    if (path === "/api/chat") {
      const chunks: Buffer[] = [];
      for await (const chunk of incoming) chunks.push(Buffer.from(chunk));
      response = await chat(
        new Request(`http://localhost:3210${path}`, {
          method: "POST",
          headers,
          body: Buffer.concat(chunks),
          signal: abort.signal,
        }),
      );
    } else {
      response = await fetch(`http://localhost:3001${path}`, {
        headers,
        signal: abort.signal,
      });
    }
    outgoing.writeHead(
      response.status,
      Object.fromEntries(
        [...response.headers].filter(
          ([key]) =>
            ![
              "content-encoding",
              "transfer-encoding",
              "content-length",
            ].includes(key),
        ),
      ),
    );
    if (response.body)
      Readable.fromWeb(
        response.body as Parameters<typeof Readable.fromWeb>[0],
      ).pipe(outgoing);
    else outgoing.end();
  } catch {
    if (!outgoing.headersSent) outgoing.writeHead(502);
    outgoing.end();
  }
});
server.listen(3210, "127.0.0.1", () =>
  console.info("Local test fixture: http://localhost:3210 — no live AI calls"),
);
process.on("SIGINT", () => server.close(() => process.exit(0)));
