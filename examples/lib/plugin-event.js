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
    var eventName = value.eventName || key
    var state = getEvents(elem)
    state[eventName] = { name: name }
    map.set(elem, state)
}