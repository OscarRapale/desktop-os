import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getClientIP, checkRateLimit } from "@/lib/rate-limiter";
import { checkInput } from "@/lib/guardrails";
import { buildContext } from "@/lib/context-builder";
import { getSystemPrompt } from "@/lib/system-prompt";

export async function POST(request) {
  // Rate limit check
  const ip = getClientIP(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return Response.json({ error: rateLimit.message }, { status: 429 });
  }

  // Parse body
  const { messages } = await request.json();
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required" }, { status: 400 });
  }

  // Validate the latest user message
  const lastMessage = messages.at(-1);
  const inputCheck = checkInput(lastMessage?.content ?? "");
  if (!inputCheck.allowed) {
    if (inputCheck.reason === "off_topic") {
      return Response.json(
        { error: inputCheck.redirectMessage },
        { status: 200 },
      );
    }
    return Response.json({ error: inputCheck.reason }, { status: 400 });
  }

  // Build context + system prompt
  const context = buildContext(messages);
  const systemPrompt = getSystemPrompt(context);

  // Stream response via Vercel AI SDK + Claude
  const anthropic = createAnthropic();
  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system: systemPrompt,
    messages,
    maxTokens: 500,
  });

  return result.toTextStreamResponse();
}
