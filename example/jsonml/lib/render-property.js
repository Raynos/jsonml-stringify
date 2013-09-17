var DataSet = require("data-set")

var isPlugin = require("./is-plugin.js")
var getPlugin = require("./get-plugin.js")

module.exports = renderProperty

function renderProperty(elem, value, key, opts) {
    if (key === "class") {
        elem.className = value
    } else if (key === "style") {
        Object.keys(value).forEach(function (key) {
            elem.style[key] = value[key]
        })
    } else if (key.substr(0, 5) === "data-") {
        DataSet(elem)[key.substr(5)] = value
    } else {
    	if (isPlugin(value)) {
    		getPlugin(value, opts)
    			.renderProperty(elem, value, key, opts)
    	} else {
    		elem[key] = value
    	}
    }
}