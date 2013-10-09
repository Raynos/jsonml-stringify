module.exports = serialize

function serialize(obs) {
    var array = obs().value

    return array.map(function (item) {
        return Object.keys(item).reduce(function (acc, key) {
            var value = item[key]
            acc[key] = typeof value === "function" ? value() : value
        }, {})
    })
}