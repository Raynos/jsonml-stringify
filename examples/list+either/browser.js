var Observ = require("observ")
var JSONGlobals = require("json-globals/get")
var document = require("global/document")
var window = require("global/window")
var console = require("console")

var Dom = require("../../dom.js")
var ObservableArray = require("../lib/observ-array.js")
var template = require("./template.js")
var listenMutation = require("../lib/listen-mutation.js")

var dom = Dom([
    require("../../plugins/loose.js"),
    require("../../plugins/fragment.js"),
    require("../../plugins/observ.js"),
    require("../lib/plugin-either.js"),
    require("../lib/plugin-list.js"),
])

var state = JSONGlobals("model")
var model = window.model = Object.keys(state).reduce(function (acc, key) {
    var value = state[key]

    acc[key] = Array.isArray(value) ?
        ObservableArray(value) : Observ(value)
    return acc
}, {})

var elem = dom(template(model))
document.body.appendChild(elem)

listenMutation(document.body, function (delta) {
    console.log("op", delta)
})
