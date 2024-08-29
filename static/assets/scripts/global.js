const panicKey = localStorage.getItem("panicKey") || "`";
const panicLink = localStorage.getItem("PanicLink") || "https://google.com";

document.addEventListener("keydown", e => {
  if (e.key === panicKey) {
    window.location.href = panicLink;
  }
});
