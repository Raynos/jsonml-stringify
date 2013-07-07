var decode = require("ent").decode

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")
var attrs = require("./attrs")
var escapeHTMLTextContent = require("./escape-text-content")

module.exports = stringify

/*
    @require ./types

    stringify := (jsonml: JsonML, opts?: Object) => String
*/
function stringify(jsonml, opts) {
    jsonml = normalize(jsonml)
    opts = opts || {}
    var indentation = opts.indentation || ""
    var parentTagName = opts.parentTagName || "<div>"
    var strings = []

    if (typeof jsonml === "string") {
        return indentation + escapeHTMLTextContent(jsonml, parentTagName)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return indentation + decode(jsonml.raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        renderChildren(jsonml.fragment, "")
        return strings.join("")
    }


    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, attributes)

    strings.push(indentation + "<" + tagName + attrs(attributes) + ">")

    if (children.length > 0) {
        strings.push("\n")

        renderChildren(children, "    ")

        strings.push(indentation + "</" + tagName + ">")
    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")

    function renderChildren(children, extraIndent) {
        children.forEach(function (jsonml) {
            strings.push(stringify(jsonml, {
                indentation: indentation + extraIndent,
                parentTagName: tagName
            }) + "\n")
        })
    }
}
