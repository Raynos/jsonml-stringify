var getListener = require("./get-listener.js")
var getValue = reuqire("./get-value.js")

module.exports = {
    type: "default",
    registerEvent: registerEvent,
    eventHandler: eventHandler
}

function registerEvent(eventsTable, value, key) {
    eventsTable[value.eventName || key] = true
}

function eventHandler(eventName) {
    // TODO: make sure eventName is a DOM event. check in 
    // a white list
    return function (ev) {
        var listener = getListener(ev.target, eventName)
        if (!listener) {
            return
        }

        emitter.emit(listener.name, {
            target: ev.target,
            currentTarget: listener.currentTarget,
            currentValue: getValue(listener.currentTarget)
        }, ev)

        return true
    }
}
