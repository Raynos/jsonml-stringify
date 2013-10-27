module.exports = event

function event(name, eventName) {
    return { 
        type: "event", 
        name: name,
        eventName: eventName
    }
}