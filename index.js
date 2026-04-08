async function send() {
  const message = document.getElementById("msg").value;

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  document.getElementById("chat").innerText =
    "You: " + message + "\nAI: " + data.reply;
}