// var either = require("jsonml-either")
var list = require("jsonml-list")
var event = require("jsonml-event")
var focus = require("jsonml-focus")
var boundModel = require("jsonml-event/model")
var computed = require("observ/computed")

module.exports = template

function mainSection(viewModel) {
    return ["section.main", {
        hidden: viewModel.todosLength
    }, [
        ["input#toggle-all.toggle-all", {
            type: "checkbox",
            checked: viewModel.allComplete,
            change: event(viewModel.events)
        }],
        ["label", { htmlFor: "toggle-all" }, "Mark all as complete"],
        ["ul.todo-list", list(viewModel.visibleTodos, todoItem)]
    ]]
}

function todoItem(todoItem) {
    var className = computed([
        todoItem.completed, todoItem.editing
    ], function (completed, editing) {
        return (completed ? "completed " : "") + 
            (editing ? "editing" : "")
    })

    return ["li", {
        className: className,
        // when events occur from jsonml-event
        // you can access the nearest bound model with
        // `ev.model`
        boundModel: boundModel(todoItem)
    }, [
        ["div.view", [
            ["input.toggle", {
                type: "checkbox",
                checked: todoItem.completed,
                change: event(todoItem.events.toggle)
            }],
            ["label", {
                dblclick: event(todoItem.events.editing)
            }, todoItem.title],
            ["button.destroy", {
                click: event(todoItem.events.destroy)
            }]
        ]],
        ["input.edit", {
            value: todo.title,
            // focus plugin, when observable is triggered
            // it calls .focus() on this element
            focus: focus(todo.editing),
            submit: event(todoItem.events.edit),
            blur: event(todoItem.events.edit)
        }]
    ]]
}