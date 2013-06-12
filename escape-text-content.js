var encode = require("ent").encode
var endingScriptTag = /<\/script>/g

module.exports = escapeHTMLTextContent

function escapeHTMLTextContent(s, tagName) {
    var escaped = String(s)

    if (tagName !== "script" && tagName !== "style") {
        escaped = encode(escaped)
    } else if (tagName === "script") {
        escaped = escaped.replace(endingScriptTag, "<\\\/script>")
    }

    return escaped
}
