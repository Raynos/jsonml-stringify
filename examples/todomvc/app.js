var ViewModel = require("./view-model.js")
var TodoModel = require("./todo-model.js")

module.exports = App

function App(initialState, inputs) {
    var router = inputs.router
    var events = inputs.events

    // Model
    var model = ViewModel(initialState)
    var events = model.events

    // store route in model
    router.on("route", function (ev) {
        model.route.set(ev.hash)
    })

    events.on(events.toggleAll, function (ev) {
        model.todos().array.forEach(function (todo) {
            todo.completed.set(!todo.completed())
        })
    })

    TodoItem(model, events)

    events.on(events.add, function (ev) {
        model.todos.push(TodoModel({
            title: ev.currentValue
        }))
        model.todoField.set("")
    })

    return model
}

function TodoItem(model, events) {
    var events = model.events

    events.on(events.toggle, function (ev) {
        ev.meta.completed.set(!ev.meta.completed())
    })

    events.on(events.editing, function (ev) {
        ev.meta.editing.set(true)
    })

    events.on(events.destroy, function (ev) {
        var index = model.todos.indexOf(ev.meta)
        model.todos.splice(index, 1)
    })

    events.on(events.edit, function (ev) {
        ev.meta.title.set(ev.currentValue)
        ev.meta.editing.set(false)
    })
}
