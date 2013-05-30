var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")
var attrs = require("./attrs")
var escapeHTMLTextContent = require("./escape-text-content")

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

    stringify := (jsonml: JsonML, opts?: Object) => String
*/
function stringify(jsonml, opts) {
    jsonml = normalize(jsonml)
    opts = opts || {}
    var indentation = opts.indentation || ""
    var parentTagName = opts.parentTagName || "<div>"

    if (typeof jsonml === "string") {
        return indentation + escapeHTMLTextContent(jsonml, parentTagName)
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
            strings.push(stringify(jsonml, {
                indentation: indentation + "    ",
                parentTagName: tagName
            }) + "\n")
        })

        strings.push(indentation + "</" + tagName + ">")
    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")
}
