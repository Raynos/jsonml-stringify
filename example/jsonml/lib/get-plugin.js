var util = require("util")

getPlugin.getPluginSafe = getPluginSafe

module.exports = getPlugin

function getPlugin(tree, opts) {
	if (Array.isArray(tree)) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(tree) + " Array is not a plugin")
	}

	var type = getType(tree)
	var plugin = findPlugin(opts.plugins, type)

	if (!plugin) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(tree) + " Unknown plugin " + type)
	}

	return plugin
}

function getPluginSafe(tree, opts) {
	return !!findPlugin(opts.plugins, getType(tree))
}

function getType(plugin) {
	if (typeof plugin === "function") {
		return "#function"
	}

	var type = plugin.type

	if (!type) {
		var keys = Object.keys(plugin)

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