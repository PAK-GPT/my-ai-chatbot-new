 const chatBox = document.getElementById("chat");
const input = document.getElementById("msg");

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  // show user message
  addMessage("You", message);

  input.value = "";

  // typing animation
  const typingId = addMessage("AI", "Typing...");

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // replace typing text with real response
    document.getElementById(typingId).innerText = data.reply;

  } catch (error) {
    document.getElementById(typingId).innerText =
      "⚠ Error connecting to server";
  }
}

// add message to chat
function addMessage(sender, text) {
  const id = "msg_" + Date.now() + Math.random();

  const div = document.createElement("div");
  div.id = id;
  div.className = sender === "You" ? "user-msg" : "ai-msg";

  div.innerHTML = `<b>${sender}:</b> ${text}`;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;

  return id;
}