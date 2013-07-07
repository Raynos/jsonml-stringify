var util = require("util")

var isArray = Array.isArray

module.exports = normalize

/*
    @require ./types

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
