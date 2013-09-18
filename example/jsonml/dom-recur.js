var document = require("global/document")
var extend = require("xtend")

var isPlugin = require("./lib/is-plugin.js")
var getPlugin = require("./lib/get-plugin.js")
var renderProperty = require("./lib/render-property.js")
var unpackSelector = require("./lib/unpack-selector.js")

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

	if (selector === "#text") {
		console.log("children", children)
		return document.createTextNode(children)
	}

	var tagName = unpackSelector(selector, properties)

	var elem = document.createElement(tagName.toUpperCase())
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
