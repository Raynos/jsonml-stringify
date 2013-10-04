var Observable = require("observ")
var uuid = require("uuid")

module.exports = TodoModel

function TodoModel(todo) {
    todo = todo || {}

    return {
        title: Observable(String(todo.title)),
        id: uuid(),
        completed: Observable(Boolean(todo.completed)),
        editing: Observable(false)
    }
}
