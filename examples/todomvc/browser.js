var localStorage = require("global/window").localStorage
var document = require("global/document")
var Delegator = require("dom-delegator")
var HashRouter = require("hash-router")
var Dom = require("jsonml-stringify/dom")
var serialize = require("observ-array/serialize")

var template = require("./template.js")
var App = require("./app.js")

// configure Dom rendered
var dom = Dom([
    require("jsonml-stringify/plugins/loose"),
    require("jsonml-stringify/plugins/fragment"),
    require("jsonml-stringify/plugins/observ")
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
