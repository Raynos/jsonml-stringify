var isLessThan = /</g
var isRightThan = />/g
var endingScriptTag = /<\/script>/g
var isAmpersand = /&/g

module.exports = escapeHTMLTextContent

function escapeHTMLTextContent(s, tagName) {
    var escaped = String(s)

    if (tagName !== "script" && tagName !== "style") {
        escaped = escaped
            .replace(isLessThan, "&lt;")
            .replace(isRightThan, "&gt;")
            .replace(isAmpersand, "&amp;")

    } else if (tagName === "script") {
        escaped = escaped.replace(endingScriptTag, "<\\\/script>")
    }

    return escaped
}
