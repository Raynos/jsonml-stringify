var test = require("tape")

var Stringify = require("../../stringify")
var stringify = Stringify([
    require("../../plugins/loose.js"),
    require("../../plugins/fragment.js"),
    require("../../plugins/raw.js")
])
var Dom = require("../../dom")
var dom = Dom([
    require("../../plugins/loose.js"),
    require("../../plugins/fragment.js"),
    require("../../plugins/raw.js")
])

var dropdown = [".string-dropdown.form-elem", [
    ["label.label", {
        for: "b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone"
    }, "timezone"],
    ["select.input", {
        name: "timezone",
        id: "b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone",
        "data-marker": "form.timezone"
    }, [
        ["option", {
            selected: true,
            value: "",
        }, "Please enter your timezone"],
        { fragment: [
            ["option", {
                value: "Africa/Abidjan",
                selected: false
            }, "Africa/Abidjan"],
            ["option", {
                value: "Africa/Accra",
                selected: false
            }, "Africa/Accra"],
            ["option", {
                value: "Africa/Addis_Ababa",
                selected: false
            }, "Africa/Addis_Ababa"],
            ["option", {
                value: "Africa/Algiers",
                selected: false
            }, "Africa/Algiers"]
        ] }
    ]],
    [".error", {
        "data-marker": "errors.timezone"
    }]
]]

test("timezone dropdown", function (assert) {
    var elem = stringify(dropdown)

    assert.equal(elem, "" +
        "<div class=\"string-dropdown form-elem\">" +
        "<label for=\"b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone\"" +
            " class=\"label\">timezone</label>" +
        "<select name=\"timezone\"" +
            " id=\"b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone\"" +
            " data-marker=\"form.timezone\" class=\"input\">" +
        "<option selected value=\"\">" +
            "Please enter your timezone</option>" +
        "<option value=\"Africa/Abidjan\">Africa/Abidjan</option>" +
        "<option value=\"Africa/Accra\">Africa/Accra</option>" +
        "<option value=\"Africa/Addis_Ababa\">" +
            "Africa/Addis_Ababa</option>" +
        "<option value=\"Africa/Algiers\">Africa/Algiers</option>" +
        "</select>" +
        "<div data-marker=\"errors.timezone\" class=\"error\"></div>" +
        "</div>")

    assert.end()
})

// test("timezone dropdown (dom)", function (assert) {
//     var elem = dom(dropdown)

//     assert.equal(dom.tagName, "div")

//     assert.end()
// })