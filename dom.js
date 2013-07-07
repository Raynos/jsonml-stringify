var document = require("global/document")
var DataSet = require("data-set")
var decode = require("ent").decode

var normalize = require("./normalize")
var unpackSelector = require("./unpack-selector")

module.exports = dom

/*
    @require ./types

    dom := (jsonml: JsonML) => DOMElement
*/
function dom(jsonml) {
    jsonml = normalize(jsonml)

    if (typeof jsonml === "string") {
        return document.createTextNode(jsonml)
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        var raw = decode(jsonml.raw)
        var wrapper = document.createElement("div")
        wrapper.innerHTML = raw
        return wrapper.childNodes[0] ? wrapper.childNodes[0] :
            document.createTextNode(raw)
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        var frag = document.createDocumentFragment()
        jsonml.fragment.forEach(function (child) {
            frag.appendChild(dom(child))
        })
        return frag
    }

    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]

    var tagName = unpackSelector(selector, attributes)

    var elem = document.createElement(tagName.toUpperCase())
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
