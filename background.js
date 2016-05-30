var tabs = {};

function sendCommand(debuggee, command, params) {
    chrome.debugger.sendCommad(debuggee, command, params, function(result) {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            return false;
        }
        return result;
    });
}

chrome.tabs.onCreated.addListener(function(tab) {
    if (!details.frameId) {
        //alert("Url: " + details.url + "\nTabId: " + details.tabId + "\nTransitionType: " + details.transitionType);
        //chrome.tabs.executeScript(details.tabId, {file: "contentScript.js", run_at: "document_start"});
        chrome.debugger.attach({tabId: tab.id}, "1.1", function() {
            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message);
            } else {
                alert("Attached");
                tabs[tab.id] = {
                    document: null,
                    console: [],
                    getDocInterval: setInterval(chrome)
                };
                sendCommand({tabid: tab.id}, "Console.enable");
                sendCommand({tabid: tab.id}, "DOM.setInspectModeEnabled");
                tabs[tab.id].document = sendCommand({tabId: tab.id}, "DOM.getDocument").root;
            }
        });
    }
});

chrome.debugger.onEvent.addListener(function(source, method, params) {
    alert(method + ": \n" + JSON.stringify(params));
    if (mathod == "Console.messageAdded") {
        tabs[source.tabId].console.push(params.message);
    }
});

/*function tabHasContentScript(tabId) {
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
    }, function(inspectorWindow) {
        alert("callback");
        inspectorWindow.onload = function() {
            alert("load");
            chrome.runtime.sendMessage(chrome.runtime.id, {type: "tabId", tabId: tab.id});
            alert("send");
        };
    });
}

chrome.contextMenus.create({
    title: "Inspect With [Dev Tools+]",
    contexts: ["all"],
    onclick: openInspect
});*/