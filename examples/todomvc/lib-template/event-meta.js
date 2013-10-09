module.exports = eventMeta

function eventMeta(meta) {
    return { type: "event-meta", meta: meta }
}