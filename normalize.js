var isArray = Array.isArray

module.exports = normalize

/*
    JsonML for our use case is very loosely defined. This
        enables expressiveness in using it for templates.

    Valid things are:
     - a text content string
     - a triplet containing just the selector
     - a triplet containing a selector and hash of attributes
     - a triplet containing a selector and a text content string
     - a triplet containing a selector and an array of children
     - a triplet containing a selector, attributes hash
        and an array of children
     - a triplet containing a selector, attributes hash
        and a text content string

    type MaybeJsonML :=
        String |
        { raw: String } |
        [String] |
        [String, { raw: String }] |
        [String, Object] |
        [String, String] |
        [String, Array<MaybeJsonML>] |
        [String, Object, Array<MaybeJsonML>] |
        [String, Object, String] |
        [String, Object, { raw: String }]

    normalize := (MaybeJsonML) => JsonML
*/
function normalize(jsonml) {
    if (isSingleChild(jsonml)) {
        return jsonml
    }

    var hash = jsonml[1]
    var children = jsonml[2]

    if (!children && isChildren(hash)) {
        children = hash
        hash = {}
    }

    if (isSingleChild(children)) {
        children = [children]
    }

    return [ jsonml[0], hash || {}, children || [] ]
}

function isSingleChild(maybeChild) {
    return typeof maybeChild === "string" ||
        !!maybeChild && typeof maybeChild.raw === "string"
}

function isChildren(maybeChildren) {
    return isArray(maybeChildren) ||
        typeof maybeChildren === "string" ||
        !!maybeChildren && typeof maybeChildren.raw === "string"
}
