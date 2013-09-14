var template = function (model) {
	return ["div", [
		either(model.x, ["div", [
			["li", ["x: ", model.x]],
			["li", ["y: ", model.y]]
		]], null),
		["p", model.y],
		["ol", [
			list(model.zs, function (value) {
				return ["li", [
					["span", "item"],
					["span", value]
				]]
			})
		]]
	]]
}

module.exports = template

function either(bool, left, right) {
	return {
		type: "either",
		bool: bool,
		left: left,
		right: right
	}
}

function list(array, generateTemplate) {
	return {
		type: "list",
		array: array, 
		template: generateTemplate
	}
}