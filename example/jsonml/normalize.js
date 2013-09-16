var util = require("util")
var extend = require("xtend")

var isPluginFast = require("./is-plugin.js")

module.exports = normalize

function normalize(tree, opts, plugins) {
	opts = opts || {}
	opts.plugins = (opts.plugins || []).concat(plugins || [])
	var parent = (opts.parent = opts.parent || null)
	var parents = (opts.parents = opts.parents || [])
	// tree = normalizeTree(tree, opts)

	opts.plugins.forEach(function (plugin) {
		if (typeof plugin.normalize === "function") {
			tree = plugin.normalize(tree, opts)
		}
	})

	return tree
}