var WeakMap = require("weakmap")

var map = WeakMap()

getEvents.renderProperty = renderProperty
getEvents.type = "event"

module.exports = getEvents

function getEvents(elem) {
    return map.get(elem) || {}
}

function renderProperty(elem, value, key) {
    var name = value.name
    var state = getEvents(elem)
    state[name] = key
    map.set(elem, state)
}