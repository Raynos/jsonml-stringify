module.exports = template

function template(model) {
    return ["div", [
        either(model.x, ["div", [
            ["li", [
                ["span", "x: "],
                ["span", model.x]
            ]],
            ["li", [
                ["span", "y: "],
                ["span", model.y]
            ]]
        ]], null),
        ["p", model.y],
        ["ol", [
            list(model.zs, function (value) {
                return ["li", [
                    ["span", "item"],
                    ["span", value]
                ]]
            })
        ]]
    ]]
}

function either(bool, left, right) {
    return {
        type: "either",
        bool: bool,
        left: left,
        right: right
    }
}

function list(array, generateTemplate) {
    return {
        type: "list",
        array: array,
        template: generateTemplate
    }
}
