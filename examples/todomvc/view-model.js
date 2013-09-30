var Observable = require("observ")
var computed = require("observ/computed")
var ObservableArray = require("observ-array")
var uuid = require("uuid")

var toggleAll = uuid()

module.exports = ViewModel

function ViewModel(initialState) {
    var todos = ObservableArray(initialState)
    var route = Observable("all")

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
        todos: todos,
        todosLength: todosLength,
        allComplete: computed([todos], function (todos) {
            return todos.every(function (todo) {
                return todo.completed
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
        visibleTodos: todos.computedFilter([route, ".computed"], 
            function (route, item) {
                return route === "completed" && todo.completed ||
                    route === "active" && !todo.completed ||
                    route === "all"
            }),
        events: {
            toggleAll: toggleAll 
        },
        route: route
    }    

    return viewModel
}