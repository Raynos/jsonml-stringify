var localStorage = require("global/window").localStorage
var document = require("global/document")
var HashRouter = require("hash-router")
var Dom = require("../../dom")
var Delegator = require("../lib/dom-delegator.js")
var serialize = require("../lib/observ-array-serialize.js")
// var Delegator = require("dom-delegator")
// var serialize = require("observ-array/serialize")

var template = require("./template.js")
var App = require("./app.js")

// configure Dom rendered
var dom = Dom([
    require("../../plugins/loose"),
    require("../../plugins/fragment"),
    require("../../plugins/observ"),
    require("../lib/plugin-either.js"),
    require("../lib/plugin-list.js"),
    require("../lib/plugin-event.js"),
    require("../lib/plugin-focus.js"),
    require("../lib/plugin-event-meta.js")
])

// Read from db
var storedState = localStorage.getItem("todomvc-jsonml")
var initialState = storedState ? JSON.parse(storedState) : []

// Inputs
var delegator = Delegator()
var router = HashRouter()

// Get app to generate view model from inputs
var viewModel = App(initialState, {
    delegator: delegator,
    router: router
})

// Renderer
var tree = template(viewModel)
// Render the tree
var elem = dom(tree)
document.body.appendChild(elem)

// Store to db
viewModel.todos(function (todos) {
    localStorage.setItem("todomvc-jsonml",
        JSON.stringify(serialize(todos)))
})
