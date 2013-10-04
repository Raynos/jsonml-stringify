var ViewModel = require("./view-model.js")
var TodoModel = require("./todo-model.js")

module.exports = App

function App(initialState, inputs) {
    var router = inputs.router
    var delegator = inputs.delegator

    // Model
    var model = ViewModel(initialState)
    var events = model.events

    // store route in model
    router.on("route", function (ev) {
        model.route.set(ev.hash)
    })

    delegator.on(events.toggleAll, function (ev) {
        model.todos().array.forEach(function (todo) {
            todo.completed.set(!todo.completed())
        })
    })

    TodoItem(model, delegator)

    delegator.on(events.add, function (ev) {
        model.todos.push(TodoModel({
            title: ev.currentValue
        }))
        model.todoField.set("")
    })

    return model
}

function TodoItem(model, delegator) {
    var events = model.events

    delegator.on(events.toggle, function (ev) {
        ev.model.completed.set(!ev.model.completed())
    })

    delegator.on(events.editing, function (ev) {
        ev.model.editing.set(true)
    })

    delegator.on(events.destroy, function (ev) {
        var index = model.todos.indexOf(ev.model)
        model.todos.splice(index, 1)
    })

    delegator.on(events.edit, function (ev) {
        ev.model.title.set(ev.currentValue)
        ev.model.editing.set(false)
    })
}
