var Observable = require("observ")
var computed = require("observ/computed")
var ObservableArray = require("observ-array")
var uuid = require("uuid")

var TodoModel = require("./todo-model.js")

var toggleAll = uuid()
var toggle = uuid()
var editing = uuid()
var destroy = uuid()
var edit = uuid()
var add = uuid()

module.exports = ViewModel

function ViewModel(initialState) {
    var todos = ObservableArray(initialState.map(TodoModel))
    var route = Observable("all")
    var todoField = Observable("")

    var openTodos = todos.computedFilter(function (item) {
        return item.completed === false
    })
    var todosLength = computed([todos], function (todos) {
        return todos.array.length
    })
    var todosLeft = computed([openTodos], function (todos) {
        return todos.array.length
    })

    var viewModel = {
        // RAW
        todos: todos,
        todoField: todoField,
        route: route,

        // COMPUTED
        todosLength: todosLength,
        allComplete: computed([todos], function (todos) {
            return todos.every(function (todo) {
                return todo.completed()
            })
        }),
        openTodos: openTodos,
        todosLeft: todosLeft,
        todosCompleted: computed([todosLength, todosLeft],
            function (len, left) {
                return len - left
            }),
        // refilters entire array when route changes
        // only refilters single item in list when list operation
        // listens to '.computed' property on list item
        // doesn't refilter entire array each time anything changes!
        // sends minimal diffs to DOM renderer :)
        visibleTodos: todos.computedFilter([route, ".completed"],
            function (route, todo) {
                return route === "completed" && todo.completed() ||
                    route === "active" && !todo.completed() ||
                    route === "all"
            }),
        events: {
            toggleAll: toggleAll,
            toggle: toggle,
            editing: editing,
            destroy: destroy,
            edit: edit,
            add: add
        }
    }

    return viewModel
}

