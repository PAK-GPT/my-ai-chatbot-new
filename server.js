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

    // 💬 Custom response
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("who are you")) {
      return res.json({
        reply: "I am an AI chatbot created by M. Hayyan Zahid."
      });
    }

    // 🤖 AI request
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "MALIK AI ASSISTANT"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("AI ERROR:", err);

      return res.json({
        reply: "⚠ AI is busy. Try again later."
      });
    }

    const data = await response.json();

    const aiReply = data?.choices?.[0]?.message?.content;

    res.json({
      reply: aiReply || "⚠ No response from AI"
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);

    res.json({
      reply: "⚠ Server error. Try again later."
    });
  }
});

// 🌐 Home route
app.get("/", (req, res) => {
  res.send("AI Chatbot is running 🚀");
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});