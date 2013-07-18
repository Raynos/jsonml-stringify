var util = require("util")

var isArray = Array.isArray

module.exports = normalize

/*
    @require ./jsonml.types

    normalize := (MaybeJsonML) => JsonML
*/
function normalize(maybeJsonML) {
    if (isSingleChild(maybeJsonML)) {
        if (maybeJsonML.fragment) {
            maybeJsonML.fragment = maybeJsonML.fragment.filter(purgeEmpty)
        }

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

    children = (children || []).filter(purgeEmpty)
    hash = hash || {}

    var jsonml = [selector, hash, children]

    if (typeof selector !== "string") {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml) + " Selector is not a string")
    }
    if (typeof hash !== "object" || hash === null) {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml) + " Properties is not an object")
    }

    return jsonml
}

function purgeEmpty(child) {
    return child !== null && child !== undefined
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
