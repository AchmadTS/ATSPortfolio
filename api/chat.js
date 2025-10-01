import fetch from "node-fetch";

export const config = {
  maxDuration: 60, // 1 minutes
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  // eslint-disable-next-line no-undef
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "API key not set in environment" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 1 minutes
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3.1:free",
          messages,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
