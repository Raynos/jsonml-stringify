var template = function (model) {
	return ["div", [
		map(model.x, function (state) {
			return state ? ["div", [
				["li", ["x: ", state]],
				["li", ["y: ", model.y]]
			]] : null
		}),
		["p", model.y]
	]]
}

module.exports = template


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