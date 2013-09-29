var isPlugin = require("./is-plugin.js")
var getPlugin = require("./get-plugin.js")

var splitSelectorRegex = /([\.#]?[a-zA-Z0-9_-]+)/

module.exports = unpackSelector

function unpackSelector(selector, properties, opts) {
    var selectorMatches = selector.split(splitSelectorRegex)
    var tagName = "div"

    selectorMatches.forEach(function (match) {
        var value = match.substring(1, match.length)

        if (match[0] === ".") {
            setClassName(properties, function (curr) {
                return curr + value + " "
            }, opts)
        } else if (match[0] === "#") {
            properties.id = value
        } else if (match.length > 0) {
            tagName = match
        }
    })

    if (properties.className) {
        setClassName(properties, function (curr) {
            return curr.trim()
        }, opts)
    }

    return tagName
}

function setClassName(properties, lambda, opts) {
    if (isPlugin(properties.className)) {
        var plugin = getPlugin(properties.className, opts)
        var currValue = plugin.getProperty(properties.className, "className")
        var newValue = lambda(currValue)
        plugin.setProperty(properties.className, newValue, "className")
    } else {
        properties.className = lambda(properties.className || "")
    }
}