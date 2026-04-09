async function sendMessage() {
  const input = document.getElementById("msg");
  const message = input.value;

  if (!message) return;

  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;

  input.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
}