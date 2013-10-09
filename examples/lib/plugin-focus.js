module.exports = {
    renderProperty: function (elem, value, key) {
        value(function () {
            elem.focus()
        })
    },
    stringifyProperty: function (value, key) {
        return ""
    },
    type: "focus"
}