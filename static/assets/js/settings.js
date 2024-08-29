let cloakElement;

document.addEventListener("DOMContentLoaded", () => {
  cloakElement = document.getElementById("premadecloaks");
  const cloak = cloakElement.value;

  const tab = localStorage.getItem("tab");
  let tabData = {};
  if (tab) {
    try {
      tabData = JSON.parse(tab);
    } catch {
      tabData = {};
    }
  }

  const titleElement = document.getElementById("title");
  const iconElement = document.getElementById("icon");

  if (tabData.title && titleElement) titleElement.value = tabData.title;
  if (tabData.icon && iconElement) iconElement.value = tabData.icon;

  const panicKey = localStorage.getItem("panicKey") || "`";
  const panicLink =
    localStorage.getItem("PanicLink") || "https://canvas.houstonisd.org/";

  if (document.getElementById("key"))
    document.getElementById("key").value = panicKey;
  if (document.getElementById("link"))
    document.getElementById("link").value = panicLink;
});

const settingsDefaultTab = {
  title: "Dashboard",
  icon: "/img/canvas.ico",
};

function setTitle(title = "") {
  document.title = title || settingsDefaultTab.title;

  const tab = localStorage.getItem("tab");
  let tabData = {};
  if (tab) {
    try {
      tabData = JSON.parse(tab);
    } catch {
      tabData = {};
    }
  }

  tabData.title = title || undefined;
  localStorage.setItem("tab", JSON.stringify(tabData));
}

function setFavicon(icon) {
  document.querySelector("link[rel='icon']").href = icon || settingsDefaultTab.icon;

  const tab = localStorage.getItem("tab");
  let tabData = {};
  if (tab) {
    try {
      tabData = JSON.parse(tab);
    } catch {
      tabData = {};
    }
  }

  tabData.icon = icon || undefined;
  localStorage.setItem("tab", JSON.stringify(tabData));
}

function setCloak() {
  const cloak = cloakElement.value;

  const cloakSettings = {
    search: { title: "Google", favicon: "/assets/cloaks/Google Search.ico" },
    wikipedia: {
      title: "Wikipedia, the free encyclopedia",
      favicon: "/assets/cloaks/Wikipedia.ico",
    },
    bsite: { title: "Billibilli", favicon: "/assets/cloaks/Billibilli.ico" },
    drive: {
      title: "My Drive - Google Drive",
      favicon: "/assets/cloaks/Google Drive.ico",
    },
    gmail: { title: "Gmail", favicon: "/assets/cloaks/Gmail.ico" },
    calendar: { title: "Google Calendar", favicon: "/assets/cloaks/Calendar.ico" },
    meets: { title: "Google Meet", favicon: "/assets/cloaks/Meet.ico" },
    classroom: { title: "Classes", favicon: "/assets/cloaks/Classroom.png" },
    canvas: { title: "Dashboard", favicon: "/assets/cloaks/Canvas.ico" },
    zoom: { title: "Zoom", favicon: "/assets/cloaks/Zoom.ico" },
    khan: {
      title: "Dashboard | Khan Academy",
      favicon: "/assets/cloaks/Khan Academy.ico",
    },
    itchio: {
      title: "Download the latest indie games - itch.io",
      favicon: "/assets/cloaks/itchio.ico",
    },
    deltamath: {
      title: "DeltaMath Student Application",
      favicon: "/assets/cloaks/deltamath.png",
    },
    ed: { title: "Edpuzzle", favicon: "/assets/cloaks/edpuzzle.png" },
  };

  const settings = cloakSettings[cloak] || {
    title: "Dashboard",
    favicon: "/assets/cloaks/Canvas.ico",
  };
  setTitle(settings.title);
  setFavicon(settings.favicon);
}

function resetTab() {
  document.title = "Dashboard";
  document.querySelector("link[rel='icon']").href = "/img/canvas.ico";
  const titleElement = document.getElementById("title");
  const iconElement = document.getElementById("icon");
  if (titleElement) titleElement.value = "";
  if (iconElement) iconElement.value = "";
  localStorage.setItem("tab", JSON.stringify({}));
}

function setPanicKey() {
  const key = document.getElementById("key").value;
  localStorage.setItem("panicKey", key);
}

function setPanicLink() {
  const link = document.getElementById("link").value;
  localStorage.setItem("PanicLink", link);
}

function cloak() {
  let inFrame;
  try {
    inFrame = window !== top;
  } catch {
    inFrame = true;
  }

  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Please allow popups and redirects.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const link = doc.createElement("link");

      const tab = localStorage.getItem("tab");
      let tabData = { title: "Dashboard", icon: "/img/canvas.ico" };
      if (tab) {
        try {
          tabData = JSON.parse(tab);
        } catch {
          tabData = { title: "Dashboard", icon: "/img/canvas.ico" };
        }
      }

      doc.title = tabData.title;
      link.rel = "icon";
      link.href = tabData.icon;

      iframe.src = location.href;
      iframe.style.position = "fixed";
      iframe.style.top =
        iframe.style.bottom =
        iframe.style.left =
        iframe.style.right =
          0;
      iframe.style.border = iframe.style.outline = "none";
      iframe.style.width = iframe.style.height = "100%";

      doc.head.appendChild(link);
      doc.body.appendChild(iframe);

      const pLink =
        localStorage.getItem("pLink") || "https://canvas.houstonisd.org/";
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

fetch("https://api.github.com/repos/xenonnet/astro/commits")
  .then(response => response.json())
  .then(data => {
    const lastCommitDate = new Date(data[0].commit.author.date).toLocaleDateString();
    document.querySelector("#updated").textContent =
      `Last Updated: ${lastCommitDate}`;
  });
