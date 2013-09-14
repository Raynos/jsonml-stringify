var Observ = require("observ")
var renderObserv = require("./render-observ")
var applyObserv = require("./apply-observ")
var JSONGlobals = require("json-globals/get")

var ObservableArray = require("./observable-array.js")
var template = require("./template")

var state = JSONGlobals("state")
var model = window.model = Object.keys(state).reduce(function (acc, key) {
	var value = state[key]

	if (Array.isArray(value.value) && Array.isArray(value.diff)) {
		acc[key] = ObservableArray(value.value)
	} else {
		acc[key] = Observ(value)
	}
	return acc
}, {})
var mainElem = document.getElementById("main").firstChild

if (mainElem) {
	console.log("APPLY")
	applyObserv(mainElem, template(model))
} else {
	console.log("RENDER")
	var elem = renderObserv(template(model))
	document.body.appendChild(elem)
}