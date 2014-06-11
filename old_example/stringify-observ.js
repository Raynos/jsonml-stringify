var decode = require("he").decode
var util = require("util")

var normalize = require("../normalize")
var unpackSelector = require("../unpack-selector")
var props = require("../props")
var escapeHTMLTextContent = require("../escape-text-content")
var whitespaceSensitive = ["pre", "textarea"]

module.exports = stringify

/*
    @require ./jsonml.types

    stringify := (jsonml: JsonML, opts?: Object) => String
*/
function stringify(jsonml, opts) {
    opts = opts || {}
    jsonml = normalize(jsonml)
    var indentation = opts.indentation || ""
    var parentTagName = opts.parentTagName || "<div>"
    var strings = []
    var firstChild, useWhitespace

    if (jsonml === null) {
        return "<span data-placeholder='true'></span>"
    } else if (typeof jsonml === "string") {
        return escapeHTMLTextContent(jsonml, parentTagName)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return decode(jsonml.raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        if (jsonml.fragment.length === 0) {
            return ""
        }

        renderChildren(jsonml.fragment)
        return strings.join("")
    } else if (typeof jsonml === "function") {
    	return stringify(jsonml())
    }

    var selector = jsonml[0]
    var properties = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, properties)

    strings.push("<" + tagName + props(properties) + ">")

    if (children.length > 0) {
        renderChildren(children)

        strings.push("</" + tagName + ">")
    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")

    function renderChildren(children, indent, whitespace, newLine) {
        children.forEach(function (childML) {
            if (childML === null || childML === undefined) {
                throw new Error("Invalid JSONML data structure " +
                    util.inspect(jsonml))
            }

            var text = stringify(childML, {
                parentTagName: tagName
            })

            strings.push(text)
        })
    }
}
