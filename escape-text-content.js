var isLessThan = /</g
var isRightThan = />/g

module.exports = escapeHTMLTextContent

function escapeHTMLTextContent(s) {
    return String(s)
        .replace(isLessThan, "&lt;")
        .replace(isRightThan, "&gt;")
}
