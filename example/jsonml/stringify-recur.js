var util = require("util")
var encode = require("ent").encode
var extend = require("xtend")

var unpackSelector = require("./unpack-selector.js")
var stringifyProperty = require("./stringify-property.js")
var getPlugin = require("./get-plugin.js")

module.exports = stringifyRecur

function stringifyRecur(tree, opts) {
	if (tree === null) {
		return ""
	} else if (isPlugin(tree)) {
		return getPlugin(tree, opts).stringify(tree, opts)
	}

	var selector = tree[0]
	var properties = tree[1]
	var children = tree[2]
	var strings = []

	if (selector === "#text") {
		return encode(children)
	}

	var tagName = unpackSelector(selector, properties)
	var attrString = Object.keys(properties).map(function (key) {
		var value = properties[key]

		return stringifyProperty(value, key, opts)
	}).join(" ").trim()
	attrString = attrString === "" ? "" : " " + attrString

	strings.push("<" + tagName + attrString + ">")

	for (var i = 0; i < children.length; i++) {
		var childOpts = extend(opts, {
			parent: tree,
			parents: opts.parents.concat([tree])
		})

		strings.push(stringifyRecur(children[i], childOpts))
	}

	strings.push("</" + tagName + ">")

	return strings.join("")
}

function isPlugin(obj) {
	return !Array.isArray(obj) && (isObject(obj) || typeof obj === "function")
}

function isObject(obj) {
	return typeof obj === "object" && obj !== null
}