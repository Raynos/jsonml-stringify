var isDoubleQuote = /"/g
var isSingleQuote = /'/g
var camelCase = /([a-z][A-Z])/g

module.exports = stringifyProps

function stringifyProps(properties) {
    var attrString = Object.keys(properties).map(function (key) {
        var value = properties[key]

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

        return key + "=\"" + escapeHTMLAttributes(value) + "\""
    }).join(" ").trim()

    return attrString === "" ? "" : " " + attrString
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
