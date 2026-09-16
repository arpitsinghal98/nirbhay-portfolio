import { gateway } from "ai";
import { createChatHandler } from "@/lib/assistant/handler";

export const maxDuration = 30;

export const POST = createChatHandler(() => {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN)
    return undefined;
  return gateway(process.env.AI_MODEL || "openai/gpt-5.6-luna");
});
