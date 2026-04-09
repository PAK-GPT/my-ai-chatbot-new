async function sendMessage() {
    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const userText = input.value;

    // USER MESSAGE
    const userMsg = document.createElement("p");
    userMsg.innerText = "You: " + userText;
    chat.appendChild(userMsg);

    // AI MESSAGE BOX
    const aiMsg = document.createElement("p");
    chat.appendChild(aiMsg);

    // SIMPLE SMART LOGIC (FIX)
    let reply = "";

    if (userText.toLowerCase().includes("who are you")) {
        reply = "I am AI chatbot created by M.Hayyan Zahid 🤖";
    }
    else if (userText.toLowerCase().includes("hello")) {
        reply = "Hello! How can I help you?";
    }
    else if (userText.toLowerCase().includes("water")) {
        reply = "The chemical formula of water is H2O 💧";
    }
    else if (userText.toLowerCase().includes("website")) {
        reply = "You can create a website using HTML, CSS, and JavaScript.";
    }
    else {
        reply = "I am still learning 🤖. Please ask something else.";
    }

    aiMsg.innerText = "AI: " + reply;

    input.value = "";
}