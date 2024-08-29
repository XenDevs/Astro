var panicKey = localStorage.getItem("panicKey") || "`";
var panicLink = localStorage.getItem("PanicLink") || "https://google.com";

document.addEventListener("keydown", e => {
  if (e.key === panicKey) {
    window.location.href = panicLink;
  }
});
