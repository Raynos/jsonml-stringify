var document = require("global/document")
var EventEmitter = require("events").EventEmitter

module.exports = Delegator

function Delegator(rootNode) {
    rootNode = rootNode || document

    var emitter = new EventEmitter()

    return emitter
}
