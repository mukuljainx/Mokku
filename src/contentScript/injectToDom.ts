const inject = () => {
  // Inject Script to user's DOM
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("js/inject.js");
  (document.head || document.documentElement).appendChild(s);
};

export default inject;
