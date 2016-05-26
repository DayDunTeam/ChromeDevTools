sendDocument();

chrome.runtime.onMessage = function(request, sender) {
    if (request.action == "documentRequest") {
        sendDocument();
    }
};

function sendDocument() {
    chrome.runtime.sendMessage(chrome.runtime.id, {action: "documentSource", html: new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML});
}