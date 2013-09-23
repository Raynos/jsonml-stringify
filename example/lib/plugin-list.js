var before = require("insert/before")
var remove = require("insert/remove")
var document = require("global/document")

var stringifyRecur = require("../jsonml/stringify-recur.js")
var domRecur = require("../jsonml/dom-recur.js")
var normalize = require("../jsonml/normalize.js")

module.exports = {
    stringify: function (tree, opts) {
        return stringify({
            fragment: tree.array.map(tree.template)
        }, opts)
    },
    dom: function (tree, opts) {
        var listElem = dom({
            fragment: tree.array().value.map(tree.template)
        }, opts)
        var elems = [].slice.call(listElem.childNodes)
        var placeholderElem = placeholder()

        if (elems.length === 0) {
            listElem = placeholderElem
        }

        tree.array(function (tuple) {
            var diff = tuple.diff

            var index = diff[0]
            var origIndex = diff[0]
            var howMany = diff[1]

            if (howMany > 0) {
                var children = elems.splice(index, howMany)

                if (elems.length === 0 && children.length > 0) {
                    before(children[0], placeholderElem)
                }

                // console.log("children", children)
                children.forEach(function (elem) {
                    remove(elem)
                })
            }

            var newElems = diff.slice(2)
            if (newElems.length > 0) {
                var afterMode = false
                var elements = newElems
                    .map(tree.template)
                    .map(function (elem) {
                        return dom(elem, opts)
                    })

                var referenceElem = elems[index]
                if (!referenceElem) {
                    afterMode = true
                }

                while (!referenceElem && index >= 0) {
                    referenceElem = elems[--index]
                }

                if (!referenceElem) {
                    referenceElem = placeholderElem
                }

                var parent = referenceElem.parentNode

                elements.forEach(function (elem) {
                    if (afterMode) {
                        parent.insertBefore(elem, null)
                    } else {
                        parent.insertBefore(elem, referenceElem)
                    }
                })

                elems.splice.apply(elems, [origIndex, 0].concat(elements))
            }
        })

        return listElem
    },
    type: "list"
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
