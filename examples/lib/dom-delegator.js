var document = require("global/document")
var EventEmitter = require("events").EventEmitter
var emitterOn = EventEmitter.prototype.on

module.exports = Delegator

function Delegator(rootNode, opts) {
    if (rootNode && !rootNode.nodeName) {
        opts = rootNode
        rootNode = null
    }

    rootNode = rootNode || document
    opts = opts || {}

    var emitter = new EventEmitter()
    var eventsTable = {}

    emitter.on = emitter.addListener = on

    if (opts.walk !== false) {
        
    }

    return emitter

    function on() {

    }
}
