var normalize = require("./normalize")

var splitSelectorRegex = /([\.#]?[a-zA-Z0-9_-]+)/

module.exports = stringify

/*
    type JsonMLSelector := String
    type JsonMLTextContent := String
    type JsonMLAttributeKey := String
    type JsonMLAttributeValue := String | Number | Boolean

    type JsonML := JsonMLTextContent | [
        JsonMLSelector,
        Object<JsonMLAttributeKey, JsonMLAttributeValue>,
        Array<JsonML>
    ]

    stringify := (jsonml: JsonML, indentation?: String) => String
*/
function stringify(jsonml, indentation) {
    jsonml = normalize(jsonml)
    indentation = indentation || ""

    if (typeof jsonml === "string") {
        return indentation + jsonml
    }

    var strings = []
    var selector = jsonml[0]
    var attributes = jsonml[1]
    var children = jsonml[2]
    var tagName = unpackSelector(selector, attributes)

    strings.push(indentation + "<" + tagName + attrs(attributes) + ">")

    if (children.length > 0) {
        strings.push("\n")

        children.forEach(function (jsonml) {
            strings.push(stringify(jsonml, indentation + "    ") + "\n")
        })

        strings.push(indentation + "</" + tagName + ">")
    } else {
        strings.push("</" + tagName + ">")
    }

    return strings.join("")
}

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

function attrs(attributes) {
    var strings = Object.keys(attributes).map(function (key) {
        var value = attributes[key]

        if (key === "style") {
            value = stylify(value)
        }

        if (value === true) {
            return key
        }

        return key + "=\"" + value + "\""
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
