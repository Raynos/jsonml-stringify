var util = require("util")
var encode = require("ent").encode
var extend = require("xtend")

var normalize = require("./normalize.js")
var unpackSelector = require("./unpack-selector.js")
var stringifyProps = require("./stringify-props.js")

module.exports = Stringify

function Stringify(plugins) {
	return function stringify(tree, opts) {
		tree = normalize(tree, plugins)
		opts = opts || {}
		var parent = (opts.parent = opts.parent || null)
		var parents = (opts.parents = opts.parents || [])

		plugins.forEach(function (plugin) {
			if (typeof plugin.normalize === "function") {
				tree = plugin.normalize(tree, opts)
			}
		})

		return stringifyRecur(plugins, tree, opts)
	}
}

function stringifyRecur(plugins, tree, opts) {
	if (tree === null) {
		return ""
	} else if (isObject(tree) || typeof tree === "function") {
		var type = getType(tree)
		var plugin = findPlugin(plugins, type)

		if (!plugin) {
			throw new Error("Invalid JSONML data structure " +
				util.inspect(tree) + " Unknown plugin")
		}

		return plugin.stringify(tree, opts)
	}

	var selector = tree[0]
	var properties = tree[1]
	var children = tree[2]
	var strings = []

	if (selector === "#text") {
		return encode(String(children))
	}

	var tagName = unpackSelector(selector, properties)

	strings.push("<" + tagName + stringifyProps(properties) + ">")

	for (var i = 0; i < children.length; i++) {
		var childOpts = extend(opts, {
			parent: tree,
			parents: opts.parents.concat([tree])
		})

		strings.push(stringifyRecur(plugins, children[i], childOpts))
	}

	strings.push("</" + tagName + ">")

	return strings.join("")
}

function isObject(obj) {
	return typeof obj === "object" && obj !== null
}

function getType(plugin) {
	if (typeof hash === "function") {
		return "#function"
	}

	var type = hash.type

	if (!type) {
		var keys = Object.keys(hash)

		if (keys.length !== 1) {
			return false
		}

		type = keys[0]
	}

	return type
}

function findPlugin(plugins, type) {
	for (var i = 0; i < plugins.length; i++) {
		var plugin = plugins[i]

		if (plugin.type === type) {
			return plugin
		}
	}
}