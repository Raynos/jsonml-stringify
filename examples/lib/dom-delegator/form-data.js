var walk = require("dom-walk")

var containsArray = /\[\]$/

module.exports = FormData

/* like FormDataSet except takes an element and recurses
    it's descendants. The hash its build is based on the 
    name property of the input elements in the descendants

*/
function FormData(rootElem) {
    var data = {}

    walk([rootElem], function (elem) {
        var name = elem.name
        if (elem.tagName === "INPUT" && elem.type === "checkbox") {
            if (containsArray.test(name) && !data[name]) {
                data[name] = []
            }

            if (!elem.checked) {
                return
            }

            if (data[name]) {
                if (!Array.isArray(data[name])) {
                    data[name] = [data[name]]
                }

                data[name].push(elem.value)
                return
            }

            if (containsArray.test(name)) {
                data[name] = [elem.value]
            } else {
                data[name] = elem.value
            }
        } else if (elem.tagName === "INPUT" && elem.type === "text") {
            data[name] = elem.value
        }
    })

    return data
}