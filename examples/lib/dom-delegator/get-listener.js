var getEvents = require("../plugin-event.js")

module.exports = getListener

function getListener(target, type) {
    if (target === null) {
        return
    }

    var events = getEvents(target)
    var value = events[type]

    if (!value) {
        return getListener(target.parentNode, type)
    }

    return {
        name: value.name,
        currentTarget: target
    }
}