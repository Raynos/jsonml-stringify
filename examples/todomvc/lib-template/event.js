module.exports = event

function event(name) {
    return { type: "event", name: name }
}