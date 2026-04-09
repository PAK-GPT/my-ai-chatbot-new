const express = require("express");
const cors = require("cors");

const API_KEY = process.env.API_KEY;

console.log("API KEY:", API_KEY);

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // IMPORTANT (fixes website loading)

// 🤖 CHAT ROUTE
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        // 🔥 CUSTOM RESPONSE
        if (
            userMessage &&
            (
                userMessage.toLowerCase().includes("who are you") ||
                userMessage.toLowerCase().includes("who r you") ||
                userMessage.toLowerCase().includes("what are you")
            )
        ) {
            return res.json({
                reply: "I am an AI chatbot created by M. Hayyan Zahid."
            });
        }

        // 🤖 AI REQUEST
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://replit.com",
                "X-Title": "AI Chatbot"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI chatbot."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

        const reply = data?.choices?.[0]?.message?.content;

        res.json({
            reply: reply || "No response from AI"
        });

    } catch (error) {
        console.log(error);
        res.json({
            reply: "Error connecting AI"
        });
    }
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});