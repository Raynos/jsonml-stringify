var normalize = require("./normalize.js")
var domRecur = require("./dom-recur.js")

module.exports = Dom

function Dom(plugins) {
	return function dom(tree, opts) {
		return domRecur(normalize(tree, opts, plugins), opts)
	}
}