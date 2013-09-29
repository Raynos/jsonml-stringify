module.exports = isPlugin

function isPlugin(obj) {
    return !Array.isArray(obj) && (isObject(obj) || typeof obj === "function")
}

function isObject(obj) {
    return typeof obj === "object" && obj !== null
}
