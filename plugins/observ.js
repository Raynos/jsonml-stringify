var DataSet = require("data-set")

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
    renderStyle: function (elem, styleValue, key) {
        var curr = styleValue()

        elem.style[key] = curr

        styleValue(function (value) {
            elem.style[key] = value
        })
    },
    renderProperty: function (elem, value, key) {
        var curr = value()

        setProperty(elem, key, curr)

        value(function (value) {
            setProperty(elem, key, value)
        })
    },
    getProperty: function (value, key) {
        return value()
    },
    setProperty: function (value, str, key) {
        value.set(str)
    },
    type: "#function"
}

function setProperty(elem, key, value) {
    if (key.substr(0, 5) === "data-") {
        DataSet(elem)[key.substr(5)] = value
    } else {
        elem[key] = value
    }
}

function stringify(tree, opts) {
    return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
    return domRecur(normalize(tree, opts), opts)
}
