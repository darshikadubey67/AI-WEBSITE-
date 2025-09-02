let favorites = [];

// Enhance new messages with reactions + pinning
function enhanceMessage(msg) {
  const actions = msg.querySelector(".actions");
  if (!actions) return;

  actions.innerHTML = `
    <span onclick="react(this)">👍</span>
    <span onclick="react(this)">❤️</span>
    <span onclick="pinMessage(this)">⭐</span>
  `;
}

// Reactions
function react(el) {
  el.style.transform = "scale(1.3)";
  setTimeout(() => el.style.transform = "scale(1)", 200);
}

// Pin message
function pinMessage(el) {
  const msgText = el.closest(".message").querySelector("p").innerText;
  if (!favorites.includes(msgText)) {
    favorites.push(msgText);
    updateFavorites();
  }
}

// Update favorites panel
function updateFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  favoritesList.innerHTML = "";
  favorites.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    favoritesList.appendChild(li);
  });
}

// Toggle favorites panel
document.getElementById("toggle-favorites").addEventListener("click", () => {
  document.getElementById("favorites-panel").classList.toggle("hidden");
});

// Theme toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
