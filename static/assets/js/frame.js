function isUrl(val = "") {
  return /^https?:\/\//.test(val) || (val.includes(".") && !val.startsWith(" "));
}

function decodeURL(url) {
  return __uv$config.decodeUrl(url);
}

async function loadNewPage(url) {
  document.getElementById("searchBar")?.blur();
  await window.navigator.serviceWorker.register("/assets/uv/sw.js", {
    scope: "/assets/uv/service/",
  });

  if (!isUrl(url)) {
    url = `https://www.google.com/search?q=${url}`;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  let urlEncoded = __uv$config.encodeUrl(url);
  urlEncoded = `/assets/uv/service/${urlEncoded}`;

  const iframe = document.getElementById("iframeid");
  if (iframe) {
    iframe.src = urlEncoded;
  }

  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.value = url;
  }
}

window.addEventListener("load", () => {
  let encodedUrl = sessionStorage.getItem("encodedUrl");
  if (encodedUrl) {
    encodedUrl = `/assets/uv/service/${encodedUrl}`;
    console.log(encodedUrl);
    const iframe = document.getElementById("iframeid");
    if (iframe) {
      iframe.src = encodedUrl;
    } else {
      console.error('Iframe with id "iframeid" does not exist');
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.setAttribute("value", decodeURL(sessionStorage.getItem("encodedUrl")));
    searchBar.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const url = searchBar.value.trim();
        loadNewPage(url);
      }
    });
  } else {
    console.error('Search bar with id "searchBar" does not exist');
  }
});

function reload() {
  const iframe = document.getElementById("iframeid");
  iframe?.contentWindow.location.reload();
}

document.onfullscreenchange = () => {
  document.body.classList.toggle("fullscreen-active", document.fullscreenElement);
  const iframe = document.getElementById("iframeid");
  if (iframe) {
    iframe.style.height = document.fullscreenElement
      ? "100vh"
      : "calc(100vh - 47.5px)";
  }
};

function fullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen?.();
  }
}

function home() {
  window.location.href = "/";
}

function erudaToggle() {
  const iframe = document.getElementById("iframeid");
  if (!iframe) return;

  const erudaWindow = iframe.contentWindow;
  const erudaDocument = iframe.contentDocument;

  if (!erudaWindow || !erudaDocument) return;

  if (erudaWindow.eruda?._isInit) {
    erudaWindow.eruda.destroy();
  } else {
    const script = erudaDocument.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      erudaWindow.eruda.init();
      erudaWindow.eruda.show();
    };
    erudaDocument.head.appendChild(script);
  }
}

function back() {
  const iframe = document.getElementById("iframeid");
  iframe?.contentWindow.history.back();
}

function forward() {
  const iframe = document.getElementById("iframeid");
  iframe?.contentWindow.history.forward();
}

function hideBar() {
  const classesToHide = [
    "bar",
    "bar-left",
    "bar-right",
    "icon",
    "search",
    "search-icon",
    "navbtn",
  ];

  for (const className of classesToHide) {
    const elements = document.getElementsByClassName(className);
    for (const element of elements) {
      element.style.display = "none";
    }
  }

  const iframe = document.getElementById("iframeid");
  if (iframe) {
    iframe.style.height = "100vh";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
  }
}

function cloak() {
  let inFrame;
  try {
    inFrame = window !== top;
  } catch {
    inFrame = true;
  }

  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = window.open("about:blank", "_blank");
    if (popup?.closed) {
      alert("Please allow popups and redirects.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const link = doc.createElement("link");
      const name = tabData.title || "Dashboard";
      const icon = tabData.icon || "/img/canvas.ico";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;

      iframe.src = location.href;
      iframe.style.position = "fixed";
      iframe.style.top =
        iframe.style.bottom =
        iframe.style.left =
        iframe.style.right =
          "0";
      iframe.style.border = iframe.style.outline = "none";
      iframe.style.width = iframe.style.height = "100%";

      doc.head.appendChild(link);
      doc.body.appendChild(iframe);

      const pLink =
        localStorage.getItem(encodeURI("pLink")) || "https://www.google.com/";
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(script);
    }
  }
}
