module.exports = either

function either(bool, left, right) {
    return {
        type: "either",
        bool: bool,
        left: left,
        right: right
    }
}