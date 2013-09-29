var extend = require("xtend")

var isPlugin = require("./lib/is-plugin.js")
var getPlugin = require("./lib/get-plugin.js")
var getNextElements = require("./lib/get-next-elements.js")
var unpackSelector = require("./lib/unpack-selector.js")

module.exports = mergeRecur

function mergeRecur(tree, opts) {
    if (tree === null) {
        return
    } else if (isPlugin(tree)) {
        return getPlugin(tree, opts).merge(tree, opts)
    }

    var selector = tree[0]
    var textContent = tree[2]

    if (selector === "#text") {
        return mergeText(textContent, opts)
    }

    return mergeElement(tree, opts)
}

function mergeElement(tree, opts) {
    var selector = tree[0]
    var properties = tree[1]
    var children = tree[2]

    var tagName = unpackSelector(selector, properties)
    var elem = opts.elements.shift()

    if (elem.nodeType === 1 &&
        elem.tagName.toLowerCase() === tagName.toLowerCase() &&
        (!properties.id || properties.id === elem.id) &&
        (!properties.className || properties.className === elem.className)
    ) {
        //TODO do something with properties?

        for (var i = 0; i < children.length; i++) {
            var childOpts = extend(opts, {
                parent: tree,
                parents: opts.parents.concat([tree])
            })

            mergeRecur(children[i], childOpts)
        }

        return
    }

    var nextElements = getNextElements(elem, opts)

    return nextElements ? mergeElement(tree, extend(opts, {
        elements: nextElements
    })) : null
}

function mergeText(textContent, opts) {
    var elem = opts.elements.shift()

    if (elem.nodeType === 3) {
        if (elem.data !== textContent) {
            elem.data = textContent
            return
        }
        return
    }

    var nextElements = getNextElements(elem, opts)

    return nextElements ? mergeText(textContent, extend(opts, {
        elements: nextElements
    })) : null
}



