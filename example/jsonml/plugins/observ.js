var stringifyRecur = require("../stringify-recur.js")
var domRecur = require("../dom-recur.js")
var normalize = require("../normalize.js")

module.exports = {
	stringify: function (tree, opts) {
		stringify(tree(), opts)
	},
	dom: function (tree, opts) {
		dom(tree(), opts)
	},
	type: "#function"
}

function stringify(tree, opts) {
	return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
	return domRecur(normalize(tree, opts), opts)
}