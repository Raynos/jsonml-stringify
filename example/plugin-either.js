var stringifyRecur = require("./jsonml/stringify-recur.js")
var normalize = require("./jsonml/normalize.js")

module.exports = {
	type: "either",
	stringify: function (tree, opts) {
		return stringify(
			tree.bool ? tree.left : tree.right, opts)
	}
}

function stringify(tree, opts) {
	return stringifyRecur(normalize(tree, opts), opts)
}