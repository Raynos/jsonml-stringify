var Observ = require("observ")
var JSONGlobals = require("json-globals/get")

var Dom = require("./jsonml/dom.js")
var ObservableArray = require("./observable-array.js")
var template = require("./template")

var dom = Dom([
	require("./jsonml/plugins/loose.js"),
	require("./jsonml/plugins/fragment.js"),
	require("./jsonml/plugins/observ.js"),
	require("./plugin-either.js"),
	require("./plugin-list.js"),
])

var state = JSONGlobals("model")
var model = window.model = Object.keys(state).reduce(function (acc, key) {
	var value = state[key]

	acc[key] = Array.isArray(value) ?
		ObservableArray(value) : Observ(value)
	return acc
}, {})

console.log("RENDER")
var elem = dom(template(model))
document.body.appendChild(elem)
