import fetch from "node-fetch";

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
    const timeout = setTimeout(() => controller.abort(), 60000);
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          // eslint-disable-next-line no-undef
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      return res.status(200).json({
        choices: [
          { message: { content: "AI is taking too long or unavailable. Try again later." } }
        ]
      });
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return res.status(200).json({
        choices: [
          { message: { content: "AI response invalid or timeout." } }
        ]
      });
    }

    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(200).json({
        choices: [{ message: { content: "AI did not return any message." } }]
      });
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    const isTimeout = err.name === "AbortError";
    return res.status(200).json({
      choices: [
        { message: { content: isTimeout ? "AI request timed out. Try again." : "Server error occurred." } }
      ]
    });
  }
}
