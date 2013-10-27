var document = require("global/document")
var extend = require("xtend")

var FormData = require("./form-data.js")

module.exports = Delegator

function Delegator(root) {
    root = root || document.body

    var events = {}
    var changeHandled = false
    var submitHandled = false
    var listeners = {}

    return {
        on: on,
        change: change,
        submit: submit
    }

    function on(type, filter, listener) {
        if (!events[type]) {
            events[type] = true

            listen(type)
        }

        return setListener(type, filter, listener)
    }

    function change(filter, listener) {
        if (!changeHandled) {
            changeHandled = true

            listenChange()
        }

        return setListener("change", filter, listener)
    }

    function submit(filter, listener) {
        if (!submitHandled) {
            submitHandled = true

            listenSubmit()
        }

        return setListener("submit", filter, listener)
    }

    function listenChange() {
        root.addEventListener("keypress", function (ev) {
            var target = ev.target
            var listener = getListeners(target, "change")
            if (!listener || target.type !== "text") {
                return
            }

            listener.fn(extend(ev, {
                currentTarget: listener.target
            }), listener.value)
        }, true)

        root.addEventListener("change", function (ev) {
            var target = ev.target
            var listener = getListeners(ev.target, "change")

            if (!listener || (
                target.type !== "checkbox" &&
                target.tagName !== "SELECT"
            )) {
                return
            }

            listener.fn(extend(ev, {
                currentTarget: listener.target,
                currentValue: getValue(listener.target)
            }), listener.value)
        }, true)
    }

    function listenSubmit() {
        document.addEventListener("click", function (ev) {
            var target = ev.target
            var listener = getListeners(ev.target, "submit")
            if (!listener || target.tagName !== "BUTTON") {
                return
            }

            listener.fn(extend(ev, {
                currentTarget: listener.target,
                formData: FormData(listener.target)
            }), listener.value)
        })
    }

    function listen(type) {
        root.addEventListener(type, function (ev) {
            var listener = getListeners(ev.target, type)
            if (!listener) {
                return
            }

            listener.fn(extend(ev, {
                currentTarget: listener.target,
                currentValue: getValue(listener.target)
            }), listener.value)
        }, true)
    }

    function setListener(type, filter, listener) {
        if (!listeners[type]) {
            listeners[type] = {}
        }

        if (!listeners[type][filter]) {
            listeners[type][filter] = []
        }

        listeners[type][filter].push(listener)

        return function remove() {
            listener.splice(listeners.indexOf(listener), 1)
        }
    }

    function getListeners(target, type) {
        if (target === null) {
            return
        }

        var ds = target.dataset
        var value = ds && ds["event:" + type]

        if (!value) {
            return getListeners(target.parentNode, type)
        }

        var parts = value.split("~")
        var fns = listeners[type][parts[0]]

        if (!fns) {
            return getListeners(target.parentNode, type)
        }

        return {
            fn: function () {
                var args = [].slice.call(arguments)
                var self = this
                fns.forEach(function (fn) {
                    fn.apply(self, args)
                })
            },
            target: target,
            value: JSON.parse(parts[1])
        }
    }
}

function getValue(target) {
    if (target.type === "checkbox") {
        return !!target.checked
    } else if (target.tagName === "SELECT") {
        return target.value
    } else if (target.type === "text") {
        return target.value
    } else {
        return target.value
    }
}