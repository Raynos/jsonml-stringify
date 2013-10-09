var ObservArray = require("./observ-array.js")

var Empty = {}

// computedFilter allows you to run a filter lambda
// over an observable array with a list of dependencies
//
// dependencies can be either string keypaths where 
// the value of get(obs().value[0], keypath) is an observable
// or its an observable
//
// the keypath allows you to say this observable array contains
// a items which have observable values on a key path
//
// when anything in the list of dependencies changes we re-run
// the filter on the entire array which is O(N)
//
// However when an item gets added or removed to the array
// i.e. the raw array changed we only run the filtering lambda
// on the item that was added. (removed items just get removed)
// this means that array additions & removals are O(1) and we
// do not recompute the filter for the entire array when it
// changes
//
// This is purely an optimization strategy. It's also a reactive
// filter. You could implement a less efficient naive reactive
// filter.
module.exports = computedFilter

function computedFilter(obs, deps, lambda) {
    var filteredArray = ObservArray(obs.filter(function (item) {
        return callLambda(item)
    }))
    var keypathDeps = deps.filter(isString)
    var observDeps = deps.filter(isNotString)

    observDeps.forEach(applyObservFilter)
    keypathDeps.forEach(applyDepsFilter)

    obs(function (opts) {
        var diff = opts.diff

        var items = diff.slice(2)

        items.forEach(function (item) {
            applyItemFilter(item)
            keypathDeps.forEach(function (keypath) {
                applyKeypathFilter(keypath, item)
            })
        })
        // apply filter to diff
    })

    return filteredArray

    function applyObservFilter(dep) {
        // otherwise its an observable, for which we refilter
        // the entire array in a mutative fashion
        dep(function () {
            obs.forEach(applyItemFilter)
        })
    }

    function applyDepsFilter(keypath) {
        // if its a keypath then for each item filter it
        // by the keypath
        return obs.forEach(function (item) {
            applyKeypathFilter(dep, item)
        })
    }

    function callLambda(item) {
        var args = observDeps.map(function (obs) {
            return obs()
        })

        args.push(item)

        return lambda.apply(null, args)
    }

    // dep has changed for each item
    // run filter lambda again to get new true / false
    // then mutate filteredArray minimally to apply this
    // filter function
    function applyItemFilter(item) {
        var rawIndex = obs.indexOf(item)

        if (rawIndex === -1) {
            return
        }

        var index = filteredArray.indexOf(item)
        var keep = callLambda(item)

        if (keep) {
            if (index !== -1) {
                return
            }

            while (rawIndex--) {
                var rawItem = obs().value[rawIndex]
                var filteredIndex = filteredArray.indexOf(rawItem)

                if (filteredIndex !== -1) {
                    filteredArray.splice(filteredIndex + 1. 0, item)
                    return
                }
            }

            filteredArray.unshift(item)
        } else {
            if (index === -1) {
                return
            }

            filteredArray.splice(index, 1)
        }
    }

    function applyKeypathFilter(keypath, item) {
        var obs = item[keypath.substr(1)]

        obs(function () {
            applyItemFilter(item)
        })
    }
}

function isNotString(x) { return typeof x !== "string" }
function isString(x) { return typeof x === "string" }

function notEmpty(x) { return x !== Empty }