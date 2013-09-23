var stringifyRecur = require("../stringify-recur.js")
var domRecur = require("../dom-recur.js")
var normalize = require("../normalize.js")

module.exports = {
    stringify: function (tree, opts) {
        return stringify(tree(), opts)
    },
    dom: function (tree, opts) {
        var elem = dom(tree(), opts)

        tree(function (value) {
            elem.data = value
        })

        return elem
    },
    type: "#function"
}

function stringify(tree, opts) {
    return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
    return domRecur(normalize(tree, opts), opts)
}
