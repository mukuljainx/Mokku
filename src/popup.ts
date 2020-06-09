const getDomain = (url: string) => {
  if (!url) {
    return "";
  }
  let domain = url;
  domain = domain.replace("https://www.", "");
  domain = domain.replace("http://www.", "");
  domain = domain.replace("https://", "");
  domain = domain.replace("http://", "");
  const domainLastIndex = domain.indexOf("/");
  if (domainLastIndex !== -1) {
    domain = domain.substr(0, domainLastIndex);
  }
  return domain;
};

let notAValidUrl = false;
let storeKey = "";
let initialActiveStatus = false;
const toggleBtn = document.querySelector("#toggle") as HTMLElement;
const statusText = document.querySelector(
  "#toggle-container span"
) as HTMLElement;
const infoText = document.querySelector("#toggle-container div") as HTMLElement;
const logo = document.querySelector("#logo") as HTMLElement;
const refreshContainer = document.querySelector(
  "#refresh-container"
) as HTMLElement;

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const host = getDomain(tab?.url);
  if (!host) {
    notAValidUrl = true;
    return;
  }

  const isLocalhost = tab.url.includes("http://localhost");
  storeKey = `mokku.extension.active.${host}`;
  chrome.storage.local.get([storeKey], function (result) {
    let active = result[storeKey];
    if (isLocalhost && active === undefined) {
      active = true;
    }
    initialActiveStatus = active;
    if (active) {
      toggleBtn.innerText = "toggle_on";
      toggleBtn.classList.add("primary-text");
      statusText.innerText = "Mocking Enabled";
      infoText.style.display = "block";
      logo.style.filter = "";
    }
  });
});

const toggleActive = () => {
  const current = toggleBtn.innerText === "toggle_on";

  const newStatus = !current;
  toggleBtn.innerText = newStatus ? "toggle_on" : "toggle_off";
  if (!newStatus) {
    toggleBtn.classList.remove("primary-text");
    logo.style.filter = "grayscale(1)";
  } else {
    toggleBtn.classList.add("primary-text");
    logo.style.filter = "";
  }

  refreshContainer.style.display =
    initialActiveStatus === newStatus ? "none" : "block";
};

toggleBtn.addEventListener("click", toggleActive);

(document.querySelector(
  "#refresh-container button"
) as HTMLElement).addEventListener("click", () => {
  chrome.storage.local.set(
    { [storeKey]: toggleBtn.innerText === "toggle_on" },
    () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        window.close();
      });
    }
  );
});
