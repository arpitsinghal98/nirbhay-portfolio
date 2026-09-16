export const chatLimits = {
  messageCharacters: 2000,
  historyMessages: 20,
  historyCharacters: 18000,
  bodyBytes: 64000,
  outputTokens: 800,
} as const;

export const chatErrors = {
  unavailable:
    "The assistant isn’t connected yet. You can still explore the portfolio or email Nirbhay directly.",
  busy: "A few too many questions at once. Please wait a minute and try again.",
  invalid: "Please send a shorter question, or start a new conversation.",
  failed:
    "The assistant couldn’t answer just now. Please try again in a moment.",
  origin: "Please open the assistant from this portfolio.",
} as const;
