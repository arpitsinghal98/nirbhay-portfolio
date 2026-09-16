import { openai } from "@ai-sdk/openai";
import { createChatHandler } from "@/lib/assistant/handler";

export const maxDuration = 30;

export const POST = createChatHandler(() => {
  if (!process.env.OPENAI_API_KEY?.trim()) return undefined;
  // Accept the previous Gateway model prefix when migrating an existing env file.
  const model = (process.env.AI_MODEL?.trim() || "gpt-5.6-luna").replace(
    /^openai\//,
    "",
  );
  return openai(model);
});
