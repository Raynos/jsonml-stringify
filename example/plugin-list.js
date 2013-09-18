var stringifyRecur = require("./jsonml/stringify-recur.js")
var domRecur = require("./jsonml/dom-recur.js")
var normalize = require("./jsonml/normalize.js")

module.exports = {
	stringify: function (tree, opts) {
		return stringify({
			fragment: tree.array.map(tree.template)
		}, opts)
	},
	dom: function (tree, opts) {
		var elem = dom({
			fragment: tree.array().value.map(tree.template)
		}, opts)

		console.log("elem", [].slice.call(elem.childNodes))

		return elem
	},
	type: "list"
}

function stringify(tree, opts) {
	return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
	return domRecur(normalize(tree, opts), opts)
}