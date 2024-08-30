function search() {
  const searchbarVal = document.getElementById("searchbar").value.toLowerCase();
  const gameNames = document.getElementsByClassName("card");
  let results = 0;

  for (let t = 0; t < gameNames.length; t++) {
    if (gameNames[t].innerText.toLowerCase().includes(searchbarVal)) {
      gameNames[t].style.display = "";
      results++;
    } else {
      gameNames[t].style.display = "none";
    }
  }

  const noResultsElement = document.getElementById("no-results");
  if (noResultsElement) {
    if (results === 0) {
      noResultsElement.style.display = "block";
    } else {
      noResultsElement.style.display = "none";
    }
  }
}
