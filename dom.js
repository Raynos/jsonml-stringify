var document = require("global/document")
var DataSet = require("data-set")

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")

module.exports = dom

/*
    type JsonMLSelector := String
    type JsonMLTextContent := String
    type JsonMLAttributeKey := String
    type JsonMLAttributeValue := String | Number | Boolean

    type JsonML := JsonMLTextContent | [
        JsonMLSelector,
        Object<JsonMLAttributeKey, JsonMLAttributeValue>,
        Array<JsonML>
    ]

    dom := (jsonml: JsonML) => DOMElement
*/
function dom(jsonml) {
    jsonml = normalize(jsonml)

    if (typeof jsonml === "string") {
        return document.createTextNode(jsonml)
    }

    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, attributes)

    var elem = document.createElement(tagName)
    Object.keys(attributes).forEach(function (k) {
        if (k === "class") {
            elem.className = attributes[k]
        } else if (k === "style") {
            var style = attributes.style

            Object.keys(style).forEach(function (key) {
                elem.style.setProperty(key, style[key])
            })
        } else if (k.substr(0, 5) === "data-") {
            DataSet(elem)[k.substr(5)] = attributes[k]
        } else {
            elem[k] = attributes[k]
        }
    })

    children.forEach(function (child) {
        elem.appendChild(dom(child))
    })

    return elem
}