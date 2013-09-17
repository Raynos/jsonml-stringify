var util = require("util")
var encode = require("ent").encode
var extend = require("xtend")

var unpackSelector = require("./lib/unpack-selector.js")
var stringifyProperty = require("./lib/stringify-property.js")
var isPlugin = require("./lib/is-plugin.js")
var getPlugin = require("./lib/get-plugin.js")

var endingScriptTag = /<\/script>/g

module.exports = stringifyRecur

function stringifyRecur(tree, opts) {
	if (tree === null) {
		return ""
	} else if (isPlugin(tree)) {
		return getPlugin(tree, opts).stringify(tree, opts)
	}

	var selector = tree[0]
	var properties = tree[1]
	var children = tree[2]
	var strings = []

	if (selector === "#text") {
		return escapeHTMLTextContent(children, opts)
	}

	var tagName = unpackSelector(selector, properties)
	var attrString = Object.keys(properties).map(function (key) {
		var value = properties[key]

		return stringifyProperty(value, key, opts)
	}).join(" ").trim()
	attrString = attrString === "" ? "" : " " + attrString

	strings.push("<" + tagName + attrString + ">")

	if (!children) {
		throw new Error("Invalid JSONML data structure " + 
			util.inspect(tree) + " No children")
	}

	for (var i = 0; i < children.length; i++) {
		var childOpts = extend(opts, {
			parent: tree,
			parents: opts.parents.concat([tree])
		})

		strings.push(stringifyRecur(children[i], childOpts))
	}

	strings.push("</" + tagName + ">")

	return strings.join("")
}

function escapeHTMLTextContent(string, opts) {
	var selector = opts.parent ? opts.parent[0] : ""
	var tagName = unpackSelector(selector, {})

	var escaped = String(string)

    if (tagName !== "script" && tagName !== "style") {
        escaped = encode(escaped)
    } else if (tagName === "script") {
        escaped = escaped.replace(endingScriptTag, "<\\\/script>")
    }

    return escaped
}