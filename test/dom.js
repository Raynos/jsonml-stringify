var test = require("tape")

var dom = require("../dom")

test("dom properly converts jsonml to element", function (assert) {
    var elem = dom(["html", [
        ["head", [
            ["meta", { charset: "utf-8" }],
            ["title", "Process dashboard"],
            ["link", { rel: "stylesheet", href: "/less/main"}]
        ]],
        ["body", { class: "main" }, [
            ["script", { src: "/browserify/main" }]
        ]]
    ]])

    assert.ok(elem)
    assert.equal(elem.tagName, "HTML")
    assert.equal(elem.childNodes.length, 2)

    assert.equal(elem.childNodes[0].tagName, "HEAD")
    assert.equal(elem.childNodes[1].tagName, "BODY")

    var body = elem.childNodes[1]

    assert.equal(body.className, "main")

    assert.end()
})
