var document = require("global/document")
var DataSet = require("data-set")
var element = require("element")

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")

module.exports = dom

/*
    @require ./jsonml.types

    dom := (jsonml: JsonML) => DOMElement
*/
function dom(jsonml) {
    jsonml = normalize(jsonml)

    if (jsonml === null) {
        return null
    } else if (typeof jsonml === "string") {
        return document.createTextNode(jsonml)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return element(jsonml.raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        var frag = document.createDocumentFragment()
        jsonml.fragment.forEach(function (child) {
            frag.appendChild(dom(child))
        })
        return frag
    }

    var selector = jsonml[0]
    var properties = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, properties)

    var elem = document.createElement(tagName.toUpperCase())
    Object.keys(properties).forEach(function (k) {
        if (k === "class") {
            elem.className = properties[k]
        } else if (k === "style") {
            var style = properties.style

            if (!elem.style) {
                elem.style = {}
            }

            Object.keys(style).forEach(function (key) {
                elem.style[key] = style[key]
            })
        } else if (k.substr(0, 5) === "data-") {
            DataSet(elem)[k.substr(5)] = properties[k]
        } else {
            elem[k] = properties[k]
        }
    })

    children.forEach(function (child) {
        elem.appendChild(dom(child))
    })

    return elem
}
