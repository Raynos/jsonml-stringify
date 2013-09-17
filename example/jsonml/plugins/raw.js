var decode = require("ent").decode
var element = require("element")

module.exports = {
	stringify: function (tree) {
		return decode(tree.raw)
	},
	dom: function (tree) {
		return element(tree.raw)
	},
	type: "raw"
}