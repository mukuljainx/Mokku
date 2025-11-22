const inject = () => {
    // Inject Script to user's DOM
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL("js/hook.js");
    link.rel = "preload";
    link.as = "script";
    (document.head || document.documentElement).prepend(link);

    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("js/hook.js");
    s.async = false;
    (document.head || document.documentElement).prepend(s);
};

export default inject;
