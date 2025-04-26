const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');



async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("👤 Tú", userMessage);
  appendMessage("🤖 GPT (demo)", "Escribiendo...");
  fetch("https://api.aimlapi.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: input.value,
        },
      ],
      max_tokens: 512,
      stream: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const response = data.choices[0].message.content;
      appendMessage("🤖 GPT (demo)", response);
      input.value = '';
    });

  // Reemplazamos el último mensaje por una respuesta aleatoria
  const allMessages = chatBox.querySelectorAll("div");
  const last = allMessages[allMessages.length - 1];
  last.innerHTML = `<strong>🤖 GPT (demo):</strong> ${fakeResponses[Math.floor(Math.random() * fakeResponses.length)]}`;
}

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
