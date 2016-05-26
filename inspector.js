var XMLSerialize = new XMLSerializer();
var DOMParse = new DOMParser();

var tab;
var source;

window.onerror = function(message, source, line) {
    alert("Error: " + message + "\nLine: " + line + "\nSource: " + source);
};

chrome.runtime.onMessage = function(request, sender) {
    /*if (rquiest.action == "tabId") {
        tab = request.source;
    }*/
    if (request.action == "documentSource") {
        tab = sender.tab.id;
        source = DOMParse.parseFromString(request.html, "text/xml");
        printPageElements();
    }
};

function printElement(element, inElement) {
    var elementElement = document.createElement("li");
    var elementTag = document.createElement("span");
    elementTag.className = "html-tag";
    elementTag.innerHTML = "&td;";
    var elementName = document.createElement("span");
    elementName.className = "html-tag-name";
    elementName.innerHTML = element.nodeName.toLowerCase();
    for (i=0; i<element.attributes.length; i++) {
        elementTag.innerHTML += " ";
        var attribute = document.createElement("span");
        attribute.className = "html-attribute";
        var attributeName = document.createElement("spane");
        attributeName.className = "html-attribute-name";
        attributeName.innerHTML = element.attributes[i].name;
        attribute.appendChild(attributeName);
        attribute.innerHTML += "=\"";
        var attributeValue = document.createElement("spane");
        attributeValue.className = "html-attribute-value";
        attributeValue.innerHTML = element.attributes[i].value;
        attribute.appendChild(attributeValue);
        attribute.innerHTML += "\"";
    }
    elementTag.innerHTML += "&gt;";
    elementElement.appendChild(elementTag);
    var elementChildren = document.createElement("ol");
    elementChildren.className = "children";
    for (i=0; i<element.children.length; i++) {
        printElement(element.children[i], elementChildren);
    }
    inElement.appendChild(elementElement);
    inElement.appendChild(elementChildren);
}

function printPageElements() {
    document.getElementById("elements-list").innerHTML = "";
    var doctype = document.createElement("li");
    var doctypeSpan = document.createElement("span");
    doctypeSpan.className = "html-doctype";
    doctypeSpan.innerHTML = XMLSerialize.serializeToString(source.doctype);
    doctype.appendChild(doctypeSpan);
    var doctypeChildren = document.createElement("ol");
    doctypeChildren.className = "children";
    document.getElementById("elements-list").appendChild(doctype);
    document.getElementById("elements-list").appendChild(doctypeChildren);
    printElement(source.documentElement, document.getElementById("elements-list"));
}

function requestDocument() {
    if (tab) {
        chrome.tabs.sendMessage(tab, {action: "documentRequest"});
    }
}