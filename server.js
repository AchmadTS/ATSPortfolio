import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// eslint-disable-next-line no-undef
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: "gpt-3.5-turbo", messages, max_tokens: 500 }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
