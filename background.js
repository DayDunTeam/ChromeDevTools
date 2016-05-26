function openInspect() {
    chrome.windows.create({
        url: "inspector.html",
        type: "popup"
    });
}

chrome.contextMenus.create({
    title: "Inspect With [Dev Tools+]",
    contexts: ["all"],
    onclick: openInspect
});