var splitSelectorRegex = /([\.#]?[a-zA-Z0-9_-]+)/

module.exports = unpackSelector

function unpackSelector(selector, properties) {
    var selectorMatches = selector.split(splitSelectorRegex)
    var tagName = "div"

    selectorMatches.forEach(function (match) {
        var value = match.substring(1, match.length)

        if (match[0] === ".") {
            properties.className = properties.className || ""
            properties.className += value + " "
        } else if (match[0] === "#") {
            properties.id = value
        } else if (match.length > 0) {
            tagName = match
        }
    })

    if (properties.className) {
        properties.className = properties.className.trim()
    }

    return tagName
}
