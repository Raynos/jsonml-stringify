var isLessThan = /</g
var isRightThan = />/g
var endingScriptTag = /<\/script>/g

module.exports = escapeHTMLTextContent

function escapeHTMLTextContent(s, tagName) {
    var escaped = String(s)

    if (tagName !== "script" && tagName !== "style") {
        escaped = escaped
            .replace(isLessThan, "&lt;")
            .replace(isRightThan, "&gt;")
    } else if (tagName === "script") {
        escaped = escaped.replace(endingScriptTag, "<\\\/script>")
    }

    return escaped
}
