const express = require("express");
const cors = require("cors");

const API_KEY = process.env.API_KEY;

const app = express();

app.use(cors());
app.use(express.json());

// 🤖 special response
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "Please send a message." });
    }

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("who are you")) {
      return res.json({
        reply: "I am an AI chatbot created by M. Hayyan Zahid."
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
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
      return res.json({
        reply: "⚠ AI is busy. Try again."
      });
    }

    const data = await response.json();

    const aiReply = data?.choices?.[0]?.message?.content;

    res.json({ reply: aiReply || "⚠ No response from AI" });

  } catch (err) {
    console.log(err);
    res.json({ reply: "⚠ Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});