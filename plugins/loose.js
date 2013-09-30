var util = require("util")
var extend = require("xtend")

var isPluginFast = require("../lib/is-plugin.js")
var getPluginSafe = require("../lib/get-plugin.js").getPluginSafe

module.exports = {
    normalize: normalizeTree
}

function normalizeTree(tree, opts) {
    if (tree === null || tree === undefined) {
        return tree
    }

    if (typeof tree === "string") {
        return ["#text", {}, tree]
    }

    if (isPluginFast(tree)) {
        return tree
    }

    if (!Array.isArray(tree)) {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(tree) + " Non array is not a valid elem")
    }

    if (tree.length === 0) {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(tree) + " Empty array is not a valid elem")
    }

    var selector = tree[0]
    var properties = tree[1] || {}
    var children = tree[2] || []



    if (!tree[2] && isChildren(properties, opts)) {
        children = properties
        properties = {}
    }

    if (isPluginFast(children)) {
        children = [children]
    }

    if (typeof children === "string" && selector !== "#text") {
        children = [["#text", {}, children]]
    }

    var jsonml = [selector, properties, children]

    if (opts.recur !== false && Array.isArray(children)) {
        jsonml[2] = children.map(function (child) {
            return normalizeTree(child, extend(opts, {
                parent: jsonml,
                parents: opts.parents.concat([jsonml])
            }))
        })
    }

    if (typeof selector !== "string") {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml) + " Selector is not a string")
    }

    if (!isObject(properties)) {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml) + " Properties is not an object")
    }

    if (typeof selector === "#text" && typeof children !== "string") {
        throw new Error("Invalid JSONML data structure " +
            util.inspect(jsonml) + " Text node needs to contain text")
    }

    return jsonml
}

function isChildren(maybeChildren, opts) {
    return Array.isArray(maybeChildren) ||
        typeof maybeChildren === "string" ||
        !!getPluginSafe(maybeChildren, opts)
}

function isObject(obj) {
    return typeof obj === "object" && obj !== null
}
