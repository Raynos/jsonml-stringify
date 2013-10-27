var FormData = require("./form-data.js")

module.exports = getValue

function getValue(element) {
    if (element.type === "checkbox") {
        if (element.hasAttribute("value")) {
            return elem.checked ? elem.value : null
        } else {
            return !!elem.checked
        }
    } else if (target.tagName === "SELECT") {
        return target.value
    } else if (target.tagName === "INPUT") {
        return target.value
    } else if (target.tagName === "TEXTAREA") {
        return target.value
    } else {
        return FormData(target)
    }
}