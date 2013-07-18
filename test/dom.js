var test = require("tape")
var document = require("global/document")

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

test("allow raw data", function (assert) {
    var elem = dom(["span", [{
        raw: "&nbsp;&nbsp;&nbsp;|"
    }]])

    assert.equal(elem.childNodes[0].data, "\u00A0\u00A0\u00A0|")

    assert.end()
})

test("allow raw html", function (assert) {
    if (!document.defaultView) {
        return assert.end()
    }

    var elem = dom(["div", [{
        raw: "<p>Foo</p>"
    }]])

    assert.equal(elem.childNodes[0].tagName, "P")
    assert.equal(elem.childNodes[0].childNodes[0].data, "Foo")

    assert.end()
})


test("allow raw multi html", function (assert) {
    if (!document.defaultView) {
        return assert.end()
    }

    var elem = dom(["div", [{
        raw: "<p>Foo</p><p>Bar</p>"
    }]])

    assert.equal(elem.childNodes[0].tagName, "P")
    assert.equal(elem.childNodes[0].childNodes[0].data, "Foo")
    assert.equal(elem.childNodes[1].tagName, "P")
    assert.equal(elem.childNodes[1].childNodes[0].data, "Bar")

    assert.end()
})

test("style properties", function (assert) {
    var elem = dom(["div", {
        style: { borderColor: "black" }
    }])

    assert.equal(elem.style.borderColor, "black")

    assert.end()
})
