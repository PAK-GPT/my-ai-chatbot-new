const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 PUT NEW API KEY HERE (IMPORTANT: regenerate old one!)
const API_KEY = "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";

app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

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
                    {
                        role: "system",
                        content: "You are a helpful AI chatbot. When someone asks who you are, say: I am an AI bot created by Hayyan."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

        const reply =
            data?.choices?.[0]?.message?.content ||
            data?.error?.message ||
            "No response";

        res.json({ reply });

    } catch (error) {
        console.log("Server Error:", error);
        res.json({ reply: "Error connecting AI" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});