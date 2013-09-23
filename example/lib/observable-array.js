var Observable = require("observ")

var slice = Array.prototype.slice

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

    var length = list.length
    obs.splice = function (index, amount) {
        var args = slice.call(arguments, 0)
        var currentList = obs().value.slice()

        var removed = currentList.splice.apply(currentList, args)
        length = currentList.length

        obs.set({ value: currentList, diff: args })
        return removed
    }
    obs.push = function () {
        var args = slice.call(arguments)
        args.unshift(length, 0)
        obs.splice.apply(null, args)

        return obs.length
    }
    obs.unshift = function () {
        var args = slice.call(arguments)
        args.unshift(0, 0)
        obs.splice.apply(null, args)

        return obs.length
    }
    obs.filter = function () {
        var list = obs().value
        return list.filter.apply(list, arguments)
    }
    obs.indexOf = function (item, fromIndex) {
        return obs().value.indexOf(item, fromIndex)
    }

    return obs
}
