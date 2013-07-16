var decode = require("ent").decode
var util = require("util")

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")
var attrs = require("./attrs")
var escapeHTMLTextContent = require("./escape-text-content")
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

    if (typeof jsonml === "string") {
        return indentation + escapeHTMLTextContent(jsonml, parentTagName)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return indentation + decode(jsonml.raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        renderChildren(jsonml.fragment, "", true)
        return strings.join("")
    }


    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, attributes)

    strings.push(indentation + "<" + tagName + attrs(attributes) + ">")

    if (children.length > 0) {
        var useWhitespace = whitespaceSensitive.indexOf(tagName) === -1

        if (useWhitespace) {
            strings.push("\n")
        }

        renderChildren(children, "    ", useWhitespace)

        if (useWhitespace) {
            strings.push(indentation + "</" + tagName + ">")
        } else {
            strings.push("</" + tagName + ">")
        }

    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")

    function renderChildren(children, extraIndent, useWhitespace) {
        children.forEach(function (childML) {
            if (childML === null || childML === undefined) {
                throw new Error("Invalid JSONML data structure " +
                    util.inspect(jsonml))
            }

            strings.push(stringify(childML, {
                indentation: useWhitespace ? indentation + extraIndent : "",
                parentTagName: tagName
            }) + (useWhitespace ? "\n" : ""))
        })
    }
}
