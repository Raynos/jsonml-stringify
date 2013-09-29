module.exports = normalize

function normalize(tree, opts, plugins) {
    opts = opts || {}
    opts.plugins = (opts.plugins || []).concat(plugins || [])
    opts.parent = opts.parent || null
    opts.parents = opts.parents || []

    opts.plugins.forEach(function (plugin) {
        if (typeof plugin.normalize === "function") {
            tree = plugin.normalize(tree, opts)
        }
    })

    return tree
}
