var document = require("global/document")
var DataSet = require("data-set")
var element = require("element")

var renderObserv = require("./render-observ.js")
var normalize = require("../normalize")
var unpackSelector = require("../unpack-selector")

module.exports = applyObserv

// FRAGMENT NOT IMPLEMENTED
function applyObserv(surface, jsonml) {
	jsonml = normalize(jsonml)

	if (jsonml === null) {
        return
    } else if (typeof jsonml === "string") {
        return
    } else if (!!jsonml && typeof jsonml.raw === "string") {
        return
    } else if (!!jsonml && Array.isArray(jsonml.fragment)) {
        return
    } else if (typeof jsonml === "function") {
    	var elem = surface

    	jsonml(function (jsonml) {
    		jsonml = normalize(jsonml)

		    elem = replaceNode(elem, jsonml)
    	})

    	return
    }

    var children = jsonml[2]
    var childNodes = [].slice.call(surface.childNodes)

    children.forEach(function (child, index) {
    	var elem = childNodes[index]

    	if (child && Array.isArray(child.fragment)) {
    		var count = child.fragment.length
    		elem = [elem].concat(childNodes.splice(index + 1, count - 1))
    	} else if (child && typeof child === "function" &&
            child() && Array.isArray(child().fragment)
        ) {
            var count = child().fragment.length
            elem = [elem].concat(childNodes.splice(index + 1, count - 1))
        }

        applyObserv(elem, child)
    })
}

// replaceNode(Element | Array<Element>, JsonML)
function replaceNode(elem, jsonml) {
	var target = renderObserv(jsonml)
    var targetElem = target

	if (target === null) {
		target = targetElem = placeholder()
	} else if (target.nodeName === "#document-fragment") {
        targetElem = [].slice.call(target.childNodes)
    }

    if (Array.isArray(elem)) {
        elem[0].parentNode.replaceChild(target, elem[0])
        elem.slice(1).forEach(function (elem) {
            elem.parentNode.removeChild(elem)
        })
    } else {
        elem.parentNode.replaceChild(target, elem)    
    }

	return targetElem
}

function placeholder() {
	var span = document.createElement("span")
	span.dataset.placeholder = true
	return span
}

function getFragChildren(list, frag) {
	if (frag.nodeName !== "#document-fragment") {
		return
	}

	list.length = 0
	for (var i = 0; i < frag.childNodes; i++) {
		list[i] = frag.childNodes[i]
	}
}