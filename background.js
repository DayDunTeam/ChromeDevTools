function openInspect(info, tab) {
    chrome.windows.create({
        url: "inspector.html",
        type: "popup"
    });
    chrome.tabs.executeScript(tab.id, {file: "getDocument.js"});
}

chrome.contextMenus.create({
    title: "Inspect With [Dev Tools+]",
    contexts: ["all"],
    onclick: openInspect
});