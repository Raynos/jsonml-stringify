var util = require("util")

var isArray = Array.isArray

module.exports = normalize

/*
    JsonML for our use case is very loosely defined. This
        enables expressiveness in using it for templates.

    Valid things are:
     - a text content string
     - a raw object containing a raw HTML string
     - a fragment object containing a list of children
     - a triplet containing just the selector
     - a triplet containing a selector and a raw object
     - a triplet containing a selector and a fragment object
     - a triplet containing a selector and hash of attributes
     - a triplet containing a selector and a text content string
     - a triplet containing a selector and an array of children
     - a triplet containing a selector, attributes hash
        and an array of children
     - a triplet containing a selector, attributes hash
        and a text content string
     - a triplet containing a selector, attributes hash
        and a fragment object
     - a triplet containing a selector, attributes hash
        and a raw object

    type MaybeJsonML :=
        String |
        { raw: String } |
        { fragment: Array<MaybeJsonML> } |
        [String] |
        [String, { raw: String }] |
        [String, { fragment: Array<MaybeJsonML> }] |
        [String, Object] |
        [String, String] |
        [String, Array<MaybeJsonML>] |
        [String, Object, Array<MaybeJsonML>] |
        [String, Object, String] |
        [String, Object, { fragment: Array<MaybeJsonML> }] |
        [String, Object, { raw: String }]

    normalize := (MaybeJsonML) => JsonML
*/
function normalize(maybeJsonML) {
    if (isSingleChild(maybeJsonML)) {
        return maybeJsonML
    }

    var selector = maybeJsonML[0]
    var hash = maybeJsonML[1]
    var children = maybeJsonML[2]

    if (!children && isChildren(hash)) {
        children = hash
        hash = {}
    }

    if (isSingleChild(children)) {
        children = [children]
    }

    var jsonml = [selector, hash || {}, children || []]

    if (typeof selector !== "string") {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml))
    }

    return jsonml
}

function isSingleChild(maybeChild) {
    return typeof maybeChild === "string" ||
        (!!maybeChild && typeof maybeChild.raw === "string") ||
        (!!maybeChild && Array.isArray(maybeChild.fragment))
}

function isChildren(maybeChildren) {
    return isArray(maybeChildren) ||
        typeof maybeChildren === "string" ||
        (!!maybeChildren && typeof maybeChildren.raw === "string") ||
        (!!maybeChildren && Array.isArray(maybeChildren.fragment))
}
