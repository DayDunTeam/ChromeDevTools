var XMLSerialize = new XMLSerializer();
var DOMParse = new DOMParser();

var printElementIndex = [];

var tabId;
var source;

window.onerror = function(message, source, line) {
    alert("Error: " + message + "\nLine: " + line + "\nSource: " + source);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.type == "tabId") {
        tabId = request.tabId;
        chrome.debugger.attach({tabId:tabId}, "1.1", function() {
            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message);
            } else {
                alert("wew");
                chrome.debugger.sendCommand({tabId:tabId}, "getDocument", {}, function(result) {
                    alert(result.root);
                });
            }
        });
    } else if (request.type == "document") {
        console.log(sender);
        tab = sender.tab.id;
        source = DOMParse.parseFromString(request.html, "text/html");
        printPageElements();
    }
});

function printElement(element, inElement) {
    elementElement = document.createElement("li");
    elementTag = document.createElement("span");
    elementTag.className = "html-tag";
    elementTag.innerHTML = "<";
    elementName = document.createElement("span");
    elementName.className = "html-tag-name";
    elementName.innerHTML = element.nodeName.toLowerCase();
    elementTag.appendChild(elementName);
    for (i=0; i<element.attributes.length; i++) {
        elementTag.innerHTML += " ";
        var attribute = document.createElement("span");
        attribute.className = "html-attribute";
        var attributeName = document.createElement("span");
        attributeName.className = "html-attribute-name";
        attributeName.innerHTML = element.attributes[i].name;
        attribute.appendChild(attributeName);
        attribute.innerHTML += "=\"";
        var attributeValue = document.createElement("span");
        attributeValue.className = "html-attribute-value";
        attributeValue.innerHTML = element.attributes[i].value;
        attribute.appendChild(attributeValue);
        attribute.innerHTML += "\"";
        elementTag.appendChild(attribute);
    }
    elementTag.innerHTML += ">";
    elementElement.appendChild(elementTag);
    var elementContent = document.createElement("ol");
    elementElement.onclick = function() {
        if (elementContent.className == "content one-line") {
            elementContent.className = "content one-line expanded";
        } else {
            elementContent.className = "content expanded";
        }
    };
    elementElement.appendChild(elementContent);
    var closingTag = document.createElement("span");
    closingTag.className = "html-tag html-close";
    closingTag.innerHTML = "<";
    var closingName = document.createElement("span");
    closingName.className = "html-close-tag-name";
    closingName.innerHTML = "/" + element.nodeName.toLowerCase();
    closingTag.appendChild(closingName);
    closingTag.innerHTML += ">";
    elementElement.appendChild(closingTag);
    inElement.appendChild(elementElement);
    if (element.children.length) {
        elementContent.className = "content";
        for (var i=0, count=element.children.length; i<count; i++) {
            printElement(element.children[i], elementContent);
        }
    } else {
        if (element.innerText) {
            if (element.innerText.length >= 80) {
                elementContent.className = "content";
                elementContent.innerHTML = "\"" + element.innerText + "\"";
            } else {
                elementContent.className = "content one-line";
                elementContent.innerHTML = element.innerText;
            }
        }
    }
}

function printPageElements() {
    document.getElementById("elements-list").innerHTML = "";
    var doctype = document.createElement("li");
    var doctypeSpan = document.createElement("span");
    doctypeSpan.className = "html-doctype";
    doctypeSpan.innerHTML = "&lt;!DOCTYPE "
    + source.doctype.name
    + (source.doctype.publicId ? " PUBLIC \"" + source.doctype.publicId + "\"" : "")
    + (!source.doctype.publicId && source.doctype.systemId ? " SYSTEM" : "")
    + (source.doctype.systemId ? " \"" + source.doctype.systemId + "\"" : "")
    + "&gt;";
    doctype.appendChild(doctypeSpan);
    document.getElementById("elements-list").appendChild(doctype);
    printElement(source.documentElement, document.getElementById("elements-list"));
}

function requestDocument() {
    if (tab) {
        chrome.tabs.sendMessage(tab, {action: "documentRequest"});
    }
}

window.onload = function() {
    
};