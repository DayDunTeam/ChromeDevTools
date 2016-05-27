var consoleHistory = [
    {
        type: "clear"
    },
    {
        type: ""
    }
];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "ping") {
        sendResponse({type: "pong"});
    } else if (request.type == "documentRequest") {
        sendResponse({type: "document", html: new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML});
    }
});