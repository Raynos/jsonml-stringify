var stringifyRecur = require("./jsonml/stringify-recur.js")
var normalize = require("./jsonml/normalize.js")

module.exports = {
	stringify: function (tree, opts) {
		return stringify({ fragment: tree.array.map(tree.template) })
	},
	type: "list"
}

function stringify(tree, opts) {
	return stringifyRecur(normalize(tree, opts), opts)
}