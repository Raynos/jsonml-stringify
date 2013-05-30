var isAttribute = /"/g

module.exports = escapeHTMLAttributes

function escapeHTMLAttributes(s) {
    return String(s)
        .replace(isAttribute, "&quot;")
}
