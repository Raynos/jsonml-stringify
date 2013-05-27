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
    assert.equal(elem.tagName, "html")
    assert.equal(elem.childNodes.length, 2)

    assert.equal(elem.childNodes[0].tagName, "head")
    assert.equal(elem.childNodes[1].tagName, "body")

    var body = elem.childNodes[1]

    assert.equal(body.className, "main")

    assert.end()
})
