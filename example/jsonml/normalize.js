var util = require("util")

module.exports = normalize

function normalize(tree, plugins) {
	if (tree === null || tree === undefined) {
		return tree
	}

	if (typeof tree === "object" || typeof tree === "function") {
		return tree
	}

	if (!Array.isArray(tree)) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(tree) + " Non array is not a valid elem")
	}

	if (tree.length === 0) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(tree) + " Empty array is not a valid elem")
	}

	var selector = tree[0]
	var properties = tree[1] || {}
	var children = tree[2] || []

	if (isChildren(properties, plugins)) {
		children = properties
		properties = {}
	}

	if (typeof children === "function" || isObject(children)) {
		children = [children]
	}

	if (typeof children === "string" && selector === "string") {
		children = [["#text", {}, children]]
	}

	var jsonml = [selector, properties, children.map(function (t) {
		return normalize(t, plugins)
	})]

	if (typeof selector !== "string") {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(jsonml) + " Selector is not a string")
	}

	if (!isObject(properties)) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(jsonml) + " Properties is not an object")
	}

	if (typeof selector === "#text" && typeof children !== "string") {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(jsonml) + " Text node needs to contain text")
	}

	return jsonml
}

function isChildren(maybeChildren, plugins) {
	return Array.isArray(maybeChildren) ||
		typeof maybeChildren === "string" ||
		isPlugin(maybeChildren, plugins)
}

function isObject(obj) {
	return typeof obj === "object" && obj !== null
}

function isPlugin(hash, plugins) {
	if (typeof hash === "function") {
		return true
	}

	if (!isObject(hash)) {
		return false
	}

	var type = getType(hash)

	for (var i = 0; i < plugins.length; i++) {
		if (plugins[i].type === type) {
			return true
		}
	}

	return false
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