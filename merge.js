var normalize = require("./normalize.js")
var mergeRecur = require("./merge-recur.js")

module.exports = Merge

function Merge(plugins) {
    return function merge(tree, opts) {
        opts = opts || {}
        opts.elements = opts.elements || [opts.root]

        return mergeRecur(normalize(tree, opts, plugins), opts)
    }
}
