var document = require("global/document")
var DataSet = require("data-set")
var element = require("element")

var normalize = require("../normalize")
var unpackSelector = require("../unpack-selector")

module.exports = renderObserv

function renderObserv(jsonml) {
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
            frag.appendChild(renderObserv(child))
        })
        return frag
    } else if (typeof jsonml === "function") {
    	var elem = renderObserv(jsonml())
    	var elems = []

    	if (elem === null) {
    		elem = placeholder()
    	}

    	getFragChildren(elems, elem)

    	jsonml(function (jsonml) {
    		var target = renderObserv(jsonml)

    		if (target === null) {
    			target = placeholder()
    		}

    		if (elems.length) {
    			elems[0].parentNode.replaceChild(target, elem)
    			elems.slice(1).forEach(function (elem) {
    				elem.parentNode.removeChild(elem)
    			})
    		} else {
    			elem.parentNode.replaceChild(target, elem)
    		}

    		getFragChildren(elems, target)
    		elem = target
    	})

    	return elem
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
        elem.appendChild(renderObserv(child))
    })

    return elem
}

function placeholder() {
	var span = document.createElement("span")
	span.dataset.placeholder = true
	return span
}

function getFragChildren(list, frag) {
	if (frag.nodeType !== "#document-fragment") {
		return
	}

	list.length = 0
	for (var i = 0; i < frag.childNodes; i++) {
		list[i] = frag.childNodes[i]
	}
}