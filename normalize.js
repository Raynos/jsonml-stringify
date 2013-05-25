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
        [String] |
        [String, Object] |
        [String, String] |
        [String, Array<MaybeJsonML>] |
        [String, Object, Array<MaybeJsonML>] |
        [String, Object, String]

    normalize := (MaybeJsonML) => JsonML
*/
function normalize(jsonml) {
    if (typeof jsonml === "string") {
        return jsonml
    }

    var selector = jsonml[0]
    var hashOrChildren = jsonml[1]
    var hash
    var children

    if (isArray(hashOrChildren) || typeof hashOrChildren === "string") {
        children = hashOrChildren
    } else if (typeof hashOrChildren === "object") {
        hash = hashOrChildren
    }

    if (jsonml[2]) {
        children = jsonml[2]
    }

    if (typeof children === "string") {
        children = [children]
    }

    return [selector, hash || {}, children || []]
}
