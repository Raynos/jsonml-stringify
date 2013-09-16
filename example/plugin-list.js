module.exports = {
	stringify: function (tree, opts) {
		return { fragment: tree.array.map(tree.template) }
	},
	type: "list"
}