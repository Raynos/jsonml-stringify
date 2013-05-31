var isDoubleQuote = /"/g
var isSingleQuote = /'/g

module.exports = escapeHTMLAttributes

function escapeHTMLAttributes(s) {
    return String(s)
        .replace(isDoubleQuote, "&quot;")
        .replace(isSingleQuote, "&#39;")
}
