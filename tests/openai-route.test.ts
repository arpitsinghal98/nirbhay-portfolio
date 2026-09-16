import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "@/app/api/chat/route";
import { chatErrors, chatLimits } from "@/lib/assistant/limits";

function request() {
  return new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          parts: [{ type: "text", text: "What does Nirbhay build?" }],
        },
      ],
    }),
  });
}

test("OpenAI route requires its own key and streams directly with storage disabled", async () => {
  const originalFetch = globalThis.fetch;
  const environmentKeys = [
    "OPENAI_API_KEY",
    "AI_GATEWAY_API_KEY",
    "VERCEL_OIDC_TOKEN",
    "AI_MODEL",
  ] as const;
  const originalEnvironment = environmentKeys.map((key) => process.env[key]);
  let calls = 0;
  let expectedModel = "gpt-5.6-luna";
  let failProvider = false;

  // Intercept every provider request: never use credentials or make network calls.
  globalThis.fetch = (async (input, init) => {
    calls++;
    assert.equal(String(input), "https://api.openai.com/v1/responses");
    assert.equal(
      new Headers(init?.headers).get("authorization"),
      "Bearer test-key-not-a-real-secret",
    );
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, expectedModel);
    assert.equal(body.stream, true);
    assert.equal(body.store, false);
    assert.equal(body.max_output_tokens, chatLimits.outputTokens);
    assert.equal(body.reasoning.effort, "none");
    assert.match(JSON.stringify(body), /NewgenDigital/);
    if (failProvider)
      return Response.json(
        { error: { message: "PRIVATE_OPENAI_ERROR", type: "invalid_api_key" } },
        { status: 401 },
      );

    const events = [
      {
        type: "response.created",
        response: { id: "resp_test", created_at: 0, model: expectedModel },
      },
      {
        type: "response.output_item.added",
        output_index: 0,
        item: { type: "message", id: "msg_test" },
      },
      {
        type: "response.output_text.delta",
        item_id: "msg_test",
        output_index: 0,
        delta: "LOCAL TEST FIXTURE: Nirbhay builds full-stack applications.",
      },
      {
        type: "response.output_item.done",
        output_index: 0,
        item: { type: "message", id: "msg_test" },
      },
      { type: "response.completed", response: {} },
    ];
    return new Response(
      events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""),
      { headers: { "content-type": "text/event-stream" } },
    );
  }) as typeof fetch;

  try {
    process.env.AI_GATEWAY_API_KEY = "test-unused-gateway-key";
    process.env.VERCEL_OIDC_TOKEN = "test-unused-oidc-token";
    delete process.env.OPENAI_API_KEY;
    const missingKey = await POST(request());
    assert.equal(missingKey.status, 503);
    assert.equal(await missingKey.text(), chatErrors.unavailable);
    process.env.OPENAI_API_KEY = "  ";
    assert.equal((await POST(request())).status, 503);
    assert.equal(calls, 0);

    process.env.OPENAI_API_KEY = "test-key-not-a-real-secret";
    for (const configuredModel of [
      undefined,
      "gpt-5.6-sol",
      "openai/gpt-5.6-luna",
    ]) {
      if (configuredModel) process.env.AI_MODEL = configuredModel;
      else delete process.env.AI_MODEL;
      expectedModel =
        configuredModel?.replace(/^openai\//, "") || "gpt-5.6-luna";
      const response = await POST(request());
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-type"), "text/event-stream");
      const stream = await response.text();
      assert.match(stream, /LOCAL TEST FIXTURE/);
      assert.match(stream, /text-end/);
      assert.match(stream, /\[DONE\]/);
      assert.doesNotMatch(stream, /"type":"error"/);
      assert.doesNotMatch(stream, /test-key-not-a-real-secret/);
    }
    assert.equal(calls, 3);

    failProvider = true;
    const failure = await (await POST(request())).text();
    assert.match(failure, /couldn’t answer/);
    assert.doesNotMatch(
      failure,
      /PRIVATE_OPENAI_ERROR|test-key-not-a-real-secret/,
    );
  } finally {
    globalThis.fetch = originalFetch;
    environmentKeys.forEach((key, index) => {
      const value = originalEnvironment[index];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});
