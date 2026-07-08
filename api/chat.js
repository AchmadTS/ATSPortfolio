/* eslint-disable no-undef */
/* eslint-env node */
import { systemMessage } from "../src/components/chatPopup/data/systemPrompt";

export const config = {
  maxDuration: 60, // 1 minutes
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  const apiKeys = [
    process.env.OPENROUTER_API_KEY,
    process.env.OPENROUTER_API_KEY2,
    process.env.OPENROUTER_API_KEY3,
  ].filter(Boolean);

  if (apiKeys.length === 0) {
    return res.status(500).json({ error: "No API keys configured" });
  }

  const apiMessages = [systemMessage, ...messages];
  for (let i = 0; i < apiKeys.length; i++) {
    const currentKey = apiKeys[i];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: apiMessages,
          }),
          signal: controller.signal,
        },
      );

      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }

      if (response.status === 429 || response.status === 402) {
        console.warn(`API Key ${i + 1} limit reached, trying next key...`);
        continue;
      } else {
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
      }
    } catch (err) {
      clearTimeout(timeout);
      console.error(`Error with Key ${i + 1}:`, err);
      if (i === apiKeys.length - 1) {
        return res.status(500).json({ error: "All API keys failed" });
      }
    }
  }

  return res
    .status(500)
    .json({ error: "Failed to get AI response after trying all keys" });
}
