async function fetchTmdbId() {
  const searchBar = document.getElementById("searchbar");
  if (!searchBar) return;

  const search = searchBar.value;
  const encodedSearch = encodeURIComponent(search);
  const url = `https://api.themoviedb.org/3/search/multi?api_key=66ca93aa37686b7a47476585271855c6&language=en-US&query=${encodedSearch}&page=1&include_adult=false`;
  const gameContainer = document.getElementById("game-container");
  if (gameContainer) {
    gameContainer.innerHTML = "";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;

    for (const movie of results) {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : "/img/no-media.svg";

      let gameHtml;
      if (movie.media_type === "tv") {
        gameHtml = `
          <div class="card" style="padding-top: 5px">
            <a onclick="promptForSeasonAndEpisode(${movie.id})">
              <div class="image-container">
                <img loading="eager" src="${poster}" style="border-radius: 25px" alt="${movie.name || movie.title}">
                <p class="item-name">${movie.name || movie.title}</p>
              </div>
            </a>
          </div>`;
      } else if (movie.media_type === "movie") {
        const link = getRandomLink(movie.id);
        gameHtml = `
          <div class="card" style="padding-top: 5px">
            <a onclick="hire('${link}');">
              <div class="image-container">
                <img loading="eager" src="${poster}" style="border-radius: 25px" alt="${movie.name || movie.title}">
                <p class="item-name">${movie.name || movie.title}</p>
              </div>
            </a>
          </div>`;
      }

      if (gameHtml && gameContainer) {
        gameContainer.insertAdjacentHTML("beforeend", gameHtml);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function promptForSeasonAndEpisode(videoId) {
  const season = prompt("Enter season number:");
  const episode = prompt("Enter episode number:");
  const link = getRandomLink(videoId, season, episode);
  hire(link);
}

function getRandomLink(videoId, season = null, episode = null) {
  const links = [
    "https://multiembed.mov/",
    "https://amethyst-liane-11.tiiny.io/",
    "https://lime-valaree-4.tiiny.io/",
  ];
  const randomLink = links[Math.floor(Math.random() * links.length)];
  return season && episode
    ? `${randomLink}?video_id=${videoId}&tmdb=1&s=${season}&e=${episode}`
    : `${randomLink}?video_id=${videoId}&tmdb=1`;
}

document.addEventListener("DOMContentLoaded", () => {
  let cooldown = false;

  const searchBar = document.getElementById("searchbar");
  const cooldownNotice = document.getElementById("cooldownNotice");

  if (searchBar && cooldownNotice) {
    searchBar.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        if (cooldown) {
          cooldownNotice.style.display = "block";
        } else {
          fetchTmdbId();
          cooldownNotice.style.display = "none";
          cooldown = true;
          setTimeout(() => {
            cooldown = false;
            cooldownNotice.style.display = "none";
          }, 3000);
        }
      }
    });
  }
});
