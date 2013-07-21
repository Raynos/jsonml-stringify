var test = require("tape")

var stringify = require("../../index.js")

test("timezone dropdown", function (assert) {
    var elem = stringify([".string-dropdown.form-elem", [
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
    ]])

    assert.equal(elem, "" +
        "<div class=\"string-dropdown form-elem\">\n" +
        "    <label for=\"b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone\"" +
                " class=\"label\">timezone</label>\n" +
        "    <select name=\"timezone\"" +
            " id=\"b499aad0-2711-4909-8936-fe6b27c1ccb6~timezone\"" +
            " data-marker=\"form.timezone\" class=\"input\">\n" +
        "        <option selected value=\"\">" +
            "Please enter your timezone</option>\n" +
        "        <option value=\"Africa/Abidjan\">Africa/Abidjan</option>\n" +
        "        <option value=\"Africa/Accra\">Africa/Accra</option>\n" +
        "        <option value=\"Africa/Addis_Ababa\">" +
            "Africa/Addis_Ababa</option>\n" +
        "        <option value=\"Africa/Algiers\">Africa/Algiers</option>\n" +
        "    </select>\n" +
        "    <div data-marker=\"errors.timezone\" class=\"error\"></div>\n" +
        "</div>")

    assert.end()
})
