var document = require("global/document")

var stringifyRecur = require("./stringify-recur.js")
var domRecur = require("./dom-recur.js")

module.exports = {
	stringify: function (tree, opts) {
		var strings = []

		for (var i = 0; i < tree.fragment.length; i++) {
			strings.push(stringifyRecur(tree.fragment[i], opts))
		}

		return strings.join("")
	},
	dom: function (tree, opts) {
		var frag = document.createDocumentFragment()
		tree.fragment.forEach/(function (child) {
			var elem = domRecur(child, opts)

			if (elem !== null) {
				frag.appendChild(elem)	
			}
		})
		return frag
	},
	type: "fragment"
}