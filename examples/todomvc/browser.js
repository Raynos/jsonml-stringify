var localStorage = require("global/window").localStorage

var ViewModel = require("./view-model.js")
var template = require("./template.js")

// Read from db
var storedState = localStorage.getItem("todomvc-jsonml")
var initialState = storedState ? JSON.parse(storedState) : []

// Model
var viewModel = ViewModel(initialState)
// Renderer
var tree = template(viewModel)
// Inputs


// Store to db
viewModel.todos(function (tuple) {
    localStorage.setItem("todomvc-jsonml", JSON.stringify(tuple.array))
})