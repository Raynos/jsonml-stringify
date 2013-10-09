var WeakMap = require("weakmap")

var map = WeakMap()

getMeta.renderProperty = renderProperty
getMeta.type = "event-meta"

module.exports = getMeta

function getMeta(elem) {
    return map.get(elem) || {}
}

function renderProperty(elem, value, key) {
    var meta = value.meta
    map.set(elem, meta)
}