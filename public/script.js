function typeMessage(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

function sendMessage() {
    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    // USER MESSAGE
    const userMsg = document.createElement("p");
    userMsg.classList.add("message");
    userMsg.innerText = "You: " + input.value;
    chat.appendChild(userMsg);

    // AI MESSAGE
    const aiMsg = document.createElement("p");
    aiMsg.classList.add("message");
    chat.appendChild(aiMsg);

    // SIMPLE AI RESPONSE
    let reply = "I am AI chatbot created by M.Hayyan Zahid 🤖";

    if (input.value.toLowerCase() === "hello") {
        reply = "Hello! How can I help you?";
    }

    typeMessage(aiMsg, "AI: " + reply);

    input.value = "";
} if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}