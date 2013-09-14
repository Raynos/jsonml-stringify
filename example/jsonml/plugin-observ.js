var stringifyRecur = require("./stringify-recur.js")
var domRecur = require("./dom-recur.js")

module.exports = {
	stringify: function (tree, opts) {
		stringifyRecur(tree(), opts)
	},
	dom: function (tree, opts) {
		domRecur(tree(), opts)
	},
	type: "#function"
}