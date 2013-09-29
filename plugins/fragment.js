var document = require("global/document")

var stringifyRecur = require("../stringify-recur.js")
var domRecur = require("../dom-recur.js")
var normalize = require("../normalize.js")

module.exports = {
    stringify: function (tree, opts) {
        var strings = []
        
        for (var i = 0; i < tree.fragment.length; i++) {
            strings.push(stringify(tree.fragment[i], opts))
        }

        return strings.join("")
    },
    dom: function (tree, opts) {
        var frag = document.createDocumentFragment()
        tree.fragment.forEach(function (child) {
            var elem = dom(child, opts)

            if (elem !== null) {
                frag.appendChild(elem)
            }
        })
        return frag
    },
    type: "fragment"
}

function stringify(tree, opts) {
    return stringifyRecur(normalize(tree, opts), opts)
}

function dom(tree, opts) {
    return domRecur(normalize(tree, opts), opts)
}
