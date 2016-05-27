chrome.webNavigation.onCommitted.addListener(function(details) {
    if (!details.frameId) {
        //alert("Url: " + details.url + "\nTabId: " + details.tabId + "\nTransitionType: " + details.transitionType);
        chrome.tabs.executeScript(tab.id, {file: "contentScript.js", run_at: "document_start"});
    }
});

function tabHasContentScript(tabId) {
    chrome.tabs.sendMessage(tabId, {type: "ping"}, function(response) {
        if (response.type == "pong") {
            return true;
        }
        return false;
    });
}

function openInspect(info, tab) {
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