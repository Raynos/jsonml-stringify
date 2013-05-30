var escapeHTML = require("escape-html")

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")
var attrs = require("./attrs")

module.exports = stringify

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

    stringify := (jsonml: JsonML, indentation?: String) => String
*/
function stringify(jsonml, indentation) {
    jsonml = normalize(jsonml)
    indentation = indentation || ""

    if (typeof jsonml === "string") {
        return indentation + escapeHTML(jsonml)
    }

    var strings = []
    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]
    var tagName = unpackSelector(selector, attributes)

    strings.push(indentation + "<" + tagName + attrs(attributes) + ">")

    if (children.length > 0) {
        strings.push("\n")

        children.forEach(function (jsonml) {
            strings.push(stringify(jsonml, indentation + "    ") + "\n")
        })

        strings.push(indentation + "</" + tagName + ">")
    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")
}
