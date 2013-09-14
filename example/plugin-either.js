var stringifyRecur = require("./stringify-recur.js")

module.exports = {
	type: "either",
	stringify: function (tree, opts) {
		return stringifyRecur(
			tree.bool ? tree.left : tree.right, opts)
	}
}