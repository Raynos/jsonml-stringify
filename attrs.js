var escapeHTMLAttributes = require("./escape-attributes")

module.exports = attrs

function attrs(attributes) {
    var attrString = Object.keys(attributes).map(function (key) {
        var value = attributes[key]

        if (key === "style") {
            value = stylify(value)
        }

        if (value === true) {
            return key
        } else if (value === false) {
            return ""
        }

        return key + "=\"" + escapeHTMLAttributes(value) + "\""
    }).join(" ")

    return attrString === "" ? "" : " " + attrString
}

function stylify(styles) {
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        attr += key + ":" + value + ";"
    })
    return attr
}
