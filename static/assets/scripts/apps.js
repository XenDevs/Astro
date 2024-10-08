window.addEventListener("load", async () => {
  const gameContainer = document.getElementById("game-container");

  try {
    const response = await fetch("/assets/json/apps.json?v=2");
    const apps = await response.json();

    apps.sort((a, b) => a.name.localeCompare(b.name));

    for (const game of apps) {
      const gameHtml = `
        <div class="card">
          <a href="#" onclick="${game.alert ? `alert('${game.alert}');` : ""} hire('${game.url}'); return false;">
            <div class="image-container">
              <img loading="lazy" src="${game.image}" alt="${game.name}">
              <p class="item-name">${game.name}</p>
            </div>
          </a>
        </div>
      `;

      gameContainer.insertAdjacentHTML("beforeend", gameHtml);
    }

    const searchbar = document.getElementById("searchbar");
    if (searchbar) {
      searchbar.placeholder = `Click here to search through our ${apps.length} apps!`;
    }
  } catch (error) {
    console.error("Error loading apps:", error);
  }
});
