var normalize = require("./normalize.js")
var stringifyRecur = require("./stringify-recur.js")

module.exports = Stringify

function Stringify(plugins) {
	return function stringify(tree, opts) {
		return stringifyRecur(normalize(tree, opts, plugins), opts)
	}
}

