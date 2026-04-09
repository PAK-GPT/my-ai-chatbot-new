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

    // SEND TO BACKEND
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    aiMsg.innerText = "AI: " + data.reply;

    input.value = "";
}