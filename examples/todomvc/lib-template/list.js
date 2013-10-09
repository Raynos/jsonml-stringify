module.exports = list

function list(array, generateTemplate) {
    return {
        type: "list",
        array: array,
        template: generateTemplate
    }
}
