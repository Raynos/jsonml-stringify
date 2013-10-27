var document = require("global/document")
var walk = require("dom-walk")
var EventEmitter = require("events").EventEmitter

var defaultGetEvents = require("../plugin-event.js")
var FormData = require("./form-data.js")
var defaultPlugin = require("./default-plugin.js")

var emitterOn = EventEmitter.prototype.on
var allEvents = [
    "blur", "focus", "focusin", "focusout", "load", "resize", 
    "scroll", "unload", "click", "dblclick", "mousedown", 
    "mouseup", "change", "select", "submit", "keydown", 
    "keypress", "keyup", "error", "contextmenu"
]

/*  
    type DelegatorPlugin := {
        eventHandler: (eventName: String) => 
            null | eventHandler: (DOMEvent) => Boolean,
        registerEvent: 
            (eventsTable: Object, pluginValue: Object, key: String) => void
        type: String
    }

    Delegator := (Element?, options?: {
        plugins?: Array<DelegatorPlugin>,
        events?: Object<eventName: String, Boolean>,
        allEvents?: Boolean
        walk?: Boolean
    }) => EventEmitter

    allEvents is opt in.
    walk is opt out.

    A plugin must return either an event handler or null for
        each event name (keypress, click, etc).

    The delegator will then dispatch that event (keypress, etc)
        to the plugin before it handles the general dispatch.

    This means a `submit` plugin could intercept keypress ENTER
        and dispatch it to it's own handlers and suppress the
        normal handlers.

    The handler returned by getListener must return `true` if 
        it has handled the event, otherwise the default handler
        will fire as well!!
*/
module.exports = Delegator

function Delegator(rootNode, opts) {
    if (rootNode && !rootNode.nodeName) {
        opts = rootNode
        rootNode = null
    }

    rootNode = rootNode || document
    opts = opts || {}

    var emitter = new EventEmitter()
    var plugins = opts.plugins || []
    var registerEvent = opts.registerEvent || defaultPlugin.registerEvent
    var eventHandler = opts.eventHandler || defaultPlugin.eventHandler
    var eventsTable = opts.eventsTable || {}
    var getEvents = opts.getEvents || defaultGetEvents

    var pluginsHash = plugins.reduce(function (acc, plugin) {
        acc[plugin.type] = plugin
        return acc
    })

    // MONKEY PATCH on
    emitter.on = emitter.addListener = on

    // IF WALK (opt out) then walk root node
    // for each element find all events bound to it through
    // weakmap (or attributes, who cares)
    // for each event on the element find the plugin for that
    // event and register a dom event name `click`, etc on the
    // eventsHash
    if (opts.walk !== false) {
        walk(rootNode, function (elem) {
            var events = getEvents(elem)
            // events is Object<EventName, { name: uuid }>

            Object.keys(events).forEach(function (domEvent) {
                var value = events[domEvent]
                var plugin = pluginsHash[domEvent]

                if (plugin) {
                    plugin.registerEvent(eventsTable, value, domEvent)
                } else {
                    registerEvent(eventsTable, value, domEvent)
                }
            })
        })
    }

    // if allEvents just enable common events on the eventsTable
    if (opts.allEvents) {
        allEvents.forEach(function (domEvent) {
            eventsTable[domEvent] = true
        })
    }

    // for each dom event name `click`, `keypress`, etc 
    // register it as a global delegated listener
    Object.keys(eventsTable).forEach(listen)

    return emitter

    // when we listen to an event like `click` , `keypress` etc
    // we ask all plugins for a handler for that event name
    // and we ask the default eventHandler creator for a handler.
    // if there are no handlers then we dont add a root listener
    // if there is a handler then we add a global handler and
    // call each handler for the event until one returns true
    function listen(eventName) {
        var handlers = plugins.map(function (plugin) {
            return plugin.eventHandler(eventName)
        }).filter(Boolean)
        var handler = eventHandler(eventName)
        if (handler) {
            handlers.push(handler)
        }

        if (handlers.length === 0) {
            return
        }

        rootNode.addListener(eventName, function (ev) {
            handlers.some(function (fn) {
                return fn(ev)
            })
        }, true)
    }

    // like normal on EXCEPT you can pass a `domEvent` as an
    // argument in case you want to do like 
    // `delegator.on('foo', 'mousemove', function () {})`
    // then you can opt in to expensive delegating events 
    // at run time instead of at delegator create time
    function on(name, domEvent, listener) {
        if (typeof domEvent === "function") {
            listener = domEvent
            domEvent = null
        }

        if (!Array.isArray(domEvent)) {
            domEvent = [domEvent]
        }

        domEvent.forEach(function (eventName) {
            if (eventsTable[eventName]) {
                return
            }

            listen(eventName)
            eventsTable[eventName] = true
        })

        emitterOn.call(this, name, listener)
    }
}
