module.exports = getNextElements

function getNextElements(elem, opts) {
    var elements = opts.elements
    var children = toArray(elem.childNodes)

    if (children.length !== 0) {
        return children
    } else if (elements.length !== 0) {
        return elements
    } else {
        var parent = elem.parentNode
        if (parent === opts.root) {
            return
        }

        var grandParent = parent.parentNode
        var siblings = toArray(grandParent.childNodes)
        children = siblings.slice(siblings.indexOf(parent))

        return children
    }
}

function toArray(list) {
    return [].slice.call(list)
}
