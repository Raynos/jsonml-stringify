var document = require("global/document")

var stringifyRecur = require("../jsonml/stringify-recur.js")
var domRecur = require("../jsonml/dom-recur.js")
var normalize = require("../jsonml/normalize.js")

module.exports = {
    type: "either",
    stringify: function (tree, opts) {
        return stringify(
            tree.bool ? tree.left : tree.right, opts)
    },
    dom: function (tree, opts) {
        tree.bool(function (bool) {
            var newElem = bool ? leftElem : rightElem

            currElem.parentNode.replaceChild(newElem, currElem)

            currElem = newElem
        })

        var leftElem = dom(tree.left, opts) || placeholder()
        var rightElem = dom(tree.right, opts) || placeholder()

        var currElem = tree.bool() ? leftElem : rightElem

        return currElem
    },
    merge: function (tree, opts) {
        
    }
}

function stringify(tree, opts) {
    return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
    return domRecur(normalize(tree, opts), opts)
}

function placeholder() {
    return document.createTextNode("")
}
