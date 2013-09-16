var getPlugin = require("./get-plugin.js")

var isDoubleQuote = /"/g
var isSingleQuote = /'/g
var camelCase = /([a-z][A-Z])/g

module.exports = stringifyProperty

function stringifyProperty(value, key, opts) {
    if (key === "style") {
        value = stylify(value)
    } else if (key === "className") {
        key = "class"
    }

    if (value === true) {
        return key
    } else if (value === false) {
        return ""
    }

    if (isPlugin(value)) {
        getPlugin(value, opts)
            .stringifyProperty(value, key, opts)
    }

    return key + "=\"" + escapeHTMLAttributes(value) + "\""    
}

function isPlugin(obj) {
    return !Array.isArray(obj) && (isObject(tree) || typeof obj === "function")
}

function isObject(obj) {
    return typeof obj === "object" && obj !== null
}

function stylify(styles) {
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        attr += hyphenate(key) + ": " + value + ";"
    })
    return attr
}

function hyphenate(key) {
    return key.replace(camelCase, function (group) {
        return group[0] + "-" + group[1].toLowerCase()
    })
}

function escapeHTMLAttributes(s) {
    return String(s)
        .replace(isDoubleQuote, "&quot;")
        .replace(isSingleQuote, "&#39;")
}
