var template = function (model) {
	return ["div", [
		map(model.x, function (state) {
			return state ? ["div", [
				["li", ["x: ", state]],
				["li", ["y: ", model.y]]
			]] : null
		}),
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

function list(observvArray, generateTemplate) {
	return map(observvArray, function (record) {
		if (!record) {
			return null
		}

		var arr = record.value

		return { fragment: arr.map(generateTemplate) }
	})
}


function map(obs, lambda) {
	var state = lambda(obs())

	return function observ(listener) {
		if (!listener) {
			return state
		}

		obs(function (v) {
			state = lambda(v)
			listener(state)
		})
	}
}