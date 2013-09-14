module.exports = getPlugin

function getPlugin(tree, opts) {
	var type = getType(tree)
	var plugin = findPlugin(opts.plugins, type)

	if (!plugin) {
		throw new Error("Invalid JSONML data structure " +
			util.inspect(tree) + " Unknown plugin")
	}

	return plugin
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