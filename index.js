var decode = require("ent").decode
var util = require("util")

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")
var props = require("./props")
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
    var firstChild, useWhitespace

    if (typeof jsonml === "string") {
        return escapeHTMLTextContent(jsonml, parentTagName)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return decode(jsonml.raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        firstChild = normalize(jsonml.fragment[0])
        useWhitespace = whitespaceSensitive.indexOf(tagName) === -1 &&
            typeof firstChild !== "string" && typeof firstChild.raw !== "string"

        renderChildren(jsonml.fragment, "", true, useWhitespace)
        return strings.join("")
    }


    var selector = jsonml[0]
    var properties = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, properties)

    strings.push(indentation + "<" + tagName + props(properties) + ">")

    if (children.length > 0) {
        firstChild = normalize(children[0])
        useWhitespace = whitespaceSensitive.indexOf(tagName) === -1 &&
            typeof firstChild !== "string" && typeof firstChild.raw !== "string"

        if (useWhitespace) {
            strings.push("\n")
        }

        renderChildren(children, "    ", useWhitespace, useWhitespace)

        if (useWhitespace) {
            strings.push(indentation + "</" + tagName + ">")
        } else {
            strings.push("</" + tagName + ">")
        }

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
                indentation: whitespace ? indentation + indent : "",
                parentTagName: tagName
            })

            newLine = newLine && text !== "" &&
                (!(childML.fragment && text.slice(-1) === "\n"))

            strings.push(text + (newLine ? "\n" : ""))
        })
    }
}
