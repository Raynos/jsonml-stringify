module.exports = change

function change(name) {
    return {
        type: "event",
        name: name,
        eventName: "~change"
    }
}