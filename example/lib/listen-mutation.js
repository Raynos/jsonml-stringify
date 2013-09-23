var MutationObserver = require("global/window").MutationObserver

module.exports = listenMutation

function listenMutation(elem, listener) {
    var observer = new MutationObserver(function (records) {
        records.forEach(function (record) {
            listener(printChange(record))
        })
    })

    observer.observe(elem, {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        characterDataOldValue: true
    })
}

function printChange(record) {
    var addLen = record.addedNodes && record.addedNodes.length
    var remLen = record.removedNodes && record.removedNodes.length
    var recordType = record.type
    var target = record.target

    var type =
        addLen > 0 && remLen > 0 ? "replace" :
        addLen > 0 ? "add" :
        remLen > 0 ? "remove" :
        recordType === "characterData" ? "text" :
        "unknown"

    var elems =
        type === "replace" ? {
            added: [].slice.call(record.addedNodes),
            removed: [].slice.call(record.removedNodes)
        } :
        type === "add" ? [].slice.call(record.addedNodes) :
        type === "remove" ? [].slice.call(record.removedNodes) :
        []

    var value = type === "text" ? target.data :
        null

    return {
        type: type,
        elems: elems,
        value: value,
        oldValue: record.oldValue,
        operation: recordType,
        target: target
    }
}
