/* eslint-disable no-undef */
import { systemMessage } from "../src/components/chatPopup/data/systemPrompt.js";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Property 'messages' is required." });
  }

  try {
    const apiKeys = [
      process.env.OPENROUTER_API_KEY,
      process.env.OPENROUTER_API_KEY2,
      process.env.OPENROUTER_API_KEY3,
    ].filter(Boolean);

    if (apiKeys.length === 0) {
      throw new Error("API Keys tidak ditemukan di dalam file .env Vercel");
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
            models: [
              "openai/gpt-oss-120b:free",
              "google/gemma-4-31b-it:free",
              "poolside/laguna-m.1:free",
            ],
            temperature: 0.2,
            messages: apiMessages,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }

      const errorText = await response.text();
      console.warn(
        `[Key ke-${i + 1} Gagal] Status: ${response.status} - ${errorText}`,
      );
    }

    return res
      .status(500)
      .json({ error: "Semua API Key limit atau gagal dihubungi." });
  } catch (err) {
    console.error("Server Error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}
