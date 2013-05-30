var escapeHTMLAttributes = require("./escape-attributes")

module.exports = attrs

function attrs(attributes) {
    var strings = Object.keys(attributes).map(function (key) {
        var value = attributes[key]

        if (key === "style") {
            value = stylify(value)
        }

        if (value === true) {
            return key
        }

        return key + "=\"" + escapeHTMLAttributes(value) + "\""
    })

    return strings.length ? " " + strings.join(" ") : ""
}

function stylify(styles) {
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        attr += key + ":" + value + ";"
    })
    return attr
}
