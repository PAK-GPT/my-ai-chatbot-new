async function sendMessage() {
    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const message = input.value;

    if (!message) return;

    // Show user message
    chat.innerHTML += `<p class="user">You: ${message}</p>`;

    const res = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await res.json();

    // Show bot reply
    chat.innerHTML += `<p class="bot">AI: ${data.reply}</p>`;

    chat.scrollTop = chat.scrollHeight;
    input.value = "";
}