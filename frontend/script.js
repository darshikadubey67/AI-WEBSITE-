async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const message = userInput.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerText = message;
  chatBox.appendChild(userMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  console.log("Message sent:", message); // debug

  userInput.value = "";

  try {
    const response = await fetch("http://192.168.31.79:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Server error " + response.status);

    const data = await response.json();
    console.log("AI Response:", data); // debug

    const botMsg = document.createElement("div");
    botMsg.className = "ai-message";
    botMsg.innerText = data.reply;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    console.error("Chat error:", err);
    const errorMsg = document.createElement("div");
    errorMsg.className = "ai-message";
    errorMsg.innerText = "⚠️ Could not connect to AI server.";
    chatBox.appendChild(errorMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

document.getElementById("send-btn").addEventListener("click", sendMessage);

document.getElementById("user-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
