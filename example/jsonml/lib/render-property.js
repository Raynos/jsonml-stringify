var DataSet = require("data-set")

var isPlugin = require("./is-plugin.js")
var getPlugin = require("./get-plugin.js")

module.exports = renderProperty

function renderProperty(elem, value, key, opts) {
    if (key === "class") {
        key = "className"
    }

    if (key === "style") {
        Object.keys(value).forEach(function (key) {
            var styleValue = value[key]

            if (isPlugin(styleValue)) {
                getPlugin(styleValue, opts)
                    .renderStyle(elem, styleValue, key, opts)
            } else {
                elem.style[key] = styleValue
            }
        })
    } else if (isPlugin(value)) {
        getPlugin(value, opts).renderProperty(elem, value, key, opts)
    } else if (key.substr(0, 5) === "data-") {
        DataSet(elem)[key.substr(5)] = value
    } else {
        elem[key] = value
    }
}
