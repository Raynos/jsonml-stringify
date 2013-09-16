var document = require("global/document")
var DataSet = require("data-set")
var extend = require("xtend")

var isPlugin = require("./is-plugin.js")
var getPlugin = require("./get-plugin.js")
var unpackSelector = require("./unpack-selector.js")

module.exports = domRecur

function domRecur(tree, opts) {
	if (tree === null) {
		return null
	} else if (isPlugin(tree)) {
		return getPlugin(tree, opts).dom(tree, opts)
	}

	var selector = tree[0]
	var properties = tree[1]
	var children = tree[2]

	if (typeof selector === "#text") {
		return document.createTextNode(children)
	}

	var tagName = unpackSelector(selector, properties)

	var elem = document.createElement(tagName.toUppserCase())
	Object.keys(properties).forEach(function (key) {
		var value = properties[key]

		renderProperty(elem, value, key, opts)
	})

	for (var i = 0; i < children.length; i++) {
		var childOpts = extend(opts, {
			parent: tree,
			parents: opts.parents.concat([tree])
		})

		var child = domRecur(children[i], childOpts)

		if (child !== null) {
			elem.appendChild(child)
		}
	}

	return elem
}

function renderProperty(elem, value, key, opts) {
    if (key === "class") {
        elem.className = value
    } else if (key === "style") {
        Object.keys(value).forEach(function (key) {
            elem.style[key] = value[key]
        })
    } else if (key.substr(0, 5) === "data-") {
        DataSet(elem)[key.substr(5)] = value
    } else {
    	if (isPlugin(value)) {
    		getPlugin(value, opts)
    			.renderProperty(elem, value, key, opts)
    	} else {
    		elem[key] = value
    	}
    }
}
