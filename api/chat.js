/* eslint-disable no-undef */
import { systemMessage } from "../src/components/chatPopup/data/systemPrompt.js";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    const apiKeys = [
      process.env.OPENROUTER_API_KEY,
      process.env.OPENROUTER_API_KEY2,
      process.env.OPENROUTER_API_KEY3,
    ].filter(Boolean);

    if (apiKeys.length === 0) {
      throw new Error("No API keys found in environment variables");
    }

    const apiMessages = [systemMessage, ...messages];

    for (let i = 0; i < apiKeys.length; i++) {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKeys[i]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "qwen/qwen3-next-80b-a3b-instruct:free",
            temperature: 0.2,
            messages: apiMessages,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }

      console.warn(`Attempt ${i + 1} failed with status: ${response.status}`);
    }

    throw new Error("All API keys failed");
  } catch (err) {
    console.error("FATAL ERROR:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
