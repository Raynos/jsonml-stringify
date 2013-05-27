var splitSelectorRegex = /([\.#]?[a-zA-Z0-9_-]+)/

module.exports = unpackSelector

function unpackSelector(selector, attributes) {
    var selectorMatches = selector.split(splitSelectorRegex)
    var tagName = "div"

    selectorMatches.forEach(function (match) {
        var value = match.substring(1, match.length)

        if (match[0] === ".") {
            attributes.class = attributes.class || ""
            attributes.class += value + " "
        } else if (match[0] === "#") {
            attributes.id = value
        } else if (match.length > 0) {
            tagName = match
        }
    })

    if (attributes.class) {
        attributes.class = attributes.class.trim()
    }

    return tagName
}
