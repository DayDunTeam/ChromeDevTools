var XMLSerialize = new XMLSerializer();

function printElement(element, inElement) {
    var elementElement = document.createElement("li");
    var elementSpan = document.createElement("span");
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
    doctype.appendChild(doctypeSpan);
    var doctypeChildren = document.createElement("ol");
    doctypeChildren.className = "children";
    document.getElementById("elements-list").appendChild(doctype);
    document.getElementById("elements-list").appendChild(doctypeChildren);
}

function printPageElements() {
    document.getElementById("elements-list").innerHTML = "";
    var doctype = document.createElement("li");
    var doctypeSpan = document.createElement("span");
    doctypeSpan.className = "html-doctype";
    doctypeSpan.innerHTML = XMLSerialize.serializeToString(document.doctype);
    doctype.appendChild(doctypeSpan);
    var doctypeChildren = document.createElement("ol");
    doctypeChildren.className = "children";
    document.getElementById("elements-list").appendChild(doctype);
    document.getElementById("elements-list").appendChild(doctypeChildren);
    printElement(document.documentElement, document.getElementById("elements-list"));
}