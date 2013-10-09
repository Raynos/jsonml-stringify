var Observable = require("observ")

var slice = Array.prototype.slice
var methods = [
    "concat", "every", "filter", "forEach", "indexOf",
    "join", "lastIndexOf", "map", "reduce", "reduceRight",
    "some", "sort", "toString", "toLocaleString"
]

module.exports = ObservableArray

/*  ObservableArray := (Array<T>) => Observable<{
        value: Array<T>,
        diff: Array
    }> & {
        splice: (index: Number, amount: Number, rest...: T) =>
            Array<T>,
        push: (values...: T) => Number,
        filter: (lambda: Function, thisValue: Any) => Array<T>,
        indexOf: (item: T, fromIndex: Number) => Number
    }
*/
function ObservableArray(list) {
    var obs = Observable({ value: list, diff: [] })

    obs.length = list.length
    obs.splice = function (index, amount) {
        var args = slice.call(arguments, 0)
        var currentList = obs().value.slwice()

        var removed = currentList.splice.apply(currentList, args)
        obs.length = currentList.length

        obs.set({ value: currentList, diff: args })
        return removed
    }
    obs.push = function () {
        var args = slice.call(arguments)
        args.unshift(obs.length, 0)
        obs.splice.apply(null, args)

        return obs.length
    }
    obs.pop = function () {
        return obs.splice(obs.length - 1, 1)[0]
    }
    obs.shift = function () {
        return obs.splice(0, 1)[0]
    }
    obs.unshift = function () {
        var args = slice.call(arguments)
        args.unshift(0, 0)
        obs.splice.apply(null, args)

        return obs.length
    }
    obs.reverse = function () {
        throw new Error("Pull request welcome")
    }

    obs.concat = method(obs, "concat")
    obs.every = method(obs, "every")
    obs.filter = method(obs, "filter")
    obs.forEach = method(obs, "forEach")
    obs.indexOf = method(obs, "indexOf")
    obs.join = method(obs, "join")
    obs.lastIndexOf = method(obs, "lastIndexOf")
    obs.map = method(obs, "map")
    obs.reduce = method(obs, "reduce")
    obs.reduceRight = method(obs, "reduceRight")
    obs.some = method(obs, "some")
    obs.sort = method(obs, "sort")
    obs.toString = method(obs, "toString")
    obs.toLocaleString = method(obs, "toLocaleString")

    return obs
}

function method(obs, name) {
    return function () {
        var list = obs().value
        return list[name].apply(list, arguments)
    }
}
