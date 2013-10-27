var computed = require("observ/computed")
var either = require("./lib-template/either.js")
var list = require("./lib-template/list.js")
var event = require("./lib-template/event.js")
var changeEvent = require("./lib-template/change-event.js")
var submitEvent = require("./lib-template/submit-event.js")
var focus = require("./lib-template/focus.js")
var eventMeta = require("./lib-template/event-meta.js")

module.exports = template

function template(model) {
    return ["div.todomvc-wrapper", [
        ["section.todoapp", [
            header(model),
            mainSection(model),
            statsSection(model)
        ]],
        infoFooter()
    ]]
}

function mainSection(model) {
    return ["section.main", {
        hidden: either(model.todosLength, false, true)
    }, [
        ["input#toggle-all.toggle-all", {
            type: "checkbox",
            checked: model.allComplete,
            change: event(model.events.toggleAll)
        }],
        ["label", { htmlFor: "toggle-all" }, "Mark all as complete"],
        ["ul.todo-list", list(model.visibleTodos, function (item) {
            return todoItem(item, model)
        })]
    ]]
}

function todoItem(todo, model) {
    var className = computed([
        todo.completed, todo.editing
    ], function (completed, editing) {
        return (completed ? "completed " : "") +
            (editing ? "editing" : "")
    })

    return ["li", {
        className: className,
        // when events occur from jsonml-event
        // you can access the nearest bound model with
        // `ev.meta`
        meta: eventMeta(todo)
    }, [
        ["div.view", [
            ["input.toggle", {
                type: "checkbox",
                checked: todo.completed,
                change: event(model.events.toggle)
            }],
            ["label", {
                dblclick: event(model.events.editing)
            }, todo.title],
            ["button.destroy", {
                click: event(model.events.destroy)
            }]
        ]],
        ["input.edit", {
            value: todo.title,
            // focus primitive, when observable is triggered
            // it calls .focus() on this element
            focus: focus(todo.editing),
            submit: event(model.events.edit),
            blur: event(model.events.edit)
        }]
    ]]
}

function statsSection(model) {
    return ["footer.footer", {
        hidden: either(model.todosLength, false, true)
    }, [
        ["span.todo-count", [
            ["strong", model.todosLeft],
            computed([model.todosLength], function (len) {
                return len === 1 ? " item" : " items"
            }),
            " left"
        ]],
        ["ul.filters", [
            link(model, "#/", "All", "all"),
            link(model, "#/active", "Active", "active"),
            link(model, "#/completed", "Completed", "completed")
        ]]
    ]]
}

function link(model, uri, text, expected) {
    return ["li", [
        ["a", {
            className: computed([model.route], function (route) {
                return route === expected ? "selected" : ""
            }),
            href: uri
        }, text]
    ]]
}

function header(model) {
    return ["header.header", [
        ["h1", "todos"],
        ["input.new-todo", {
            placeholder: "What needs to be done?",
            autofocus: true,
            value: model.todoField,
            submit: event(model.events.add)
        }]
    ]]
}

function infoFooter() {
    return ["footer.info", [
        ["p", "Double-click to edit a todo"],
        ["p", [
            "Written by ",
            ["a", { href: "https://github.com/Raynos" }, "Raynos"]
        ]],
        ["p", [
            "Part of ",
            ["a", { href: "http://todomvc.com" }, "TodoMVC"]
        ]]
    ]]
}
