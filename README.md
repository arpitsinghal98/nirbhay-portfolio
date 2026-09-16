# Nirbhay’s portfolio

A warm, editorial portfolio with a résumé-grounded AI guide. Built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui (Base UI), Vercel AI SDK, and AI Elements. Bun is the package manager.

## Run locally

```sh
bun install
bun dev
```

Open http://localhost:3000. The portfolio works without an AI key; the assistant displays a clear unavailable message until connected.

## Connect the assistant

Copy `.env.example` to `.env.local` (or update your existing local file), then set `OPENAI_API_KEY` to your OpenAI API key. Restart the dev server. Never commit the key or prefix it with `NEXT_PUBLIC_`. No Vercel AI Gateway account, key, or credits are required.

The default model is `gpt-5.6-luna`, called directly through the OpenAI Responses API using `@ai-sdk/openai`. Set `AI_MODEL` to an OpenAI model ID to change it without editing components. The previous `openai/` model prefix is also accepted for existing local configurations. The model must support `reasoning: "none"`; adjust that setting in the handler if you choose one that does not. Your OpenAI API project needs access to the selected model and available quota/billing. No database, embeddings service, or vector store is required for this small curated knowledge base.

The route validates and bounds text-only input, restricts message history and output length, applies a 25-second timeout, checks browser origins, and provides best-effort in-memory request limits. It doesn't provide tools or browse the web. Model output links are restricted to approved portfolio destinations and remote images are not rendered.

Chat stays in browser memory and is cleared on reload. The application does not persist messages or log prompts/provider errors. Questions and conversation history are sent directly to OpenAI with Responses storage disabled (`store: false`). This is not a guarantee of zero data retention; OpenAI's applicable retention policies still apply. Do not send sensitive information.

## Content and design

- `content/profile.ts` holds identity, public links, and navigation.
- `content/portfolio.ts` holds projects, experience, education, skills, and suggested questions. It feeds both the page and the assistant’s context.
- `lib/assistant/knowledge.ts` defines the guide’s boundaries. Unknown facts must stay unknown, including current employment/availability after the supplied 2025 history.
- Fonts stay in the standard `app/layout.tsx`; theme tokens stay in `app/globals.css`.
- The supplied portrait and résumé live in `public/`.

Project covers are illustrations, not screenshots. E-commerce projects are learning recreations, not work for those brands. No results, impact metrics, or missing repository links are invented.

## Verify

```sh
bun run lint
bun run typecheck
bun test
bun run build
```

If a restricted environment prevents Turbopack worker startup, use `bun run build --webpack`. A build needs access to Google Fonts for `next/font`.

Automated tests cover input validation, request size, origins, rate limiting, configuration errors, safe links, streamed protocol output using an SDK mock model, direct OpenAI routing with a stubbed HTTP response, and provider-error redaction. They do not call a paid model or evaluate its factual quality.

Before release, test a real provider response for each suggested question, a follow-up, unknown current availability, and an instruction-injection attempt. Check keyboard focus/Escape for dialogs, mobile layouts, stop/retry/reset chat controls, and résumé download.

For no-key browser testing, build the app, run `bun start --hostname 127.0.0.1 --port 3001`, and run `bun tests/browser-harness.ts` in another terminal. Open http://localhost:3210. This loopback-only proxy substitutes a clearly labeled SDK fixture for `/api/chat`, while serving the actual production UI. It tests streaming, Markdown, approved/blocked links, follow-ups, cancellation, and reset without paid API calls. Stop both test servers afterward; never deploy the harness.

## Deploy checklist

1. Import the repository into your hosting provider; use the `portfolio` project directory if the parent folder is the repository root.
2. Set server-side `OPENAI_API_KEY`, optionally `AI_MODEL`, and `SITE_URL` to the final HTTPS origin. On Vercel, add these in Project Settings → Environment Variables for the appropriate environments, then redeploy. Never put credentials in client variables. Old `AI_GATEWAY_API_KEY` and `VERCEL_OIDC_TOKEN` values are not used by the assistant.
3. **Before public launch, add an edge or distributed rate limit to POST `/api/chat` and set a provider spending budget.** The included memory limiter is per process and resets on cold starts; it is not a distributed abuse or cost-control solution.
4. Verify the provider’s retention policy and Nirbhay’s approval of the public résumé, contact details, dates, and project links.
5. Build and test a preview, including a genuine streamed reply. Local and Vercel preview builds are marked noindex; the canonical URL, sitemap, and production share metadata use `SITE_URL`.

Deployment, domain setup, provider billing, and a live-key model evaluation are separate release actions. No service is provisioned automatically.
