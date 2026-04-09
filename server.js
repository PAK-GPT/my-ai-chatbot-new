const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/*
🔐 PASTE YOUR API KEY HERE MANUALLY
*/
const API_KEY = "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";

// 🤖 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "Please send a message." });
    }

    // 💬 custom response
    if (message.toLowerCase().includes("who are you")) {
      return res.json({
        reply: "I am an AI chatbot created by M. Hayyan Zahid."
      });
    }

    // 🤖 OpenRouter request
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://replit.com",
        "X-Title": "My Chatbot"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message }
        ]
      })
    });

    // ❌ error handling
    if (!response.ok) {
      const err = await response.text();
      console.log("OPENROUTER ERROR:", err);

      return res.json({
        reply: "⚠ AI is busy (API error)."
      });
    }

    // ✅ success
    const data = await response.json();

    const aiReply = data?.choices?.[0]?.message?.content;

    return res.json({
      reply: aiReply || "⚠ No response from AI"
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);

    return res.json({
      reply: "⚠ Server error. Try again later."
    });
  }
});