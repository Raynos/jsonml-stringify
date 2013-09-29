var test = require("tape")
var document = require("global/document")

var Dom = require("../dom")
var dom = Dom([
    require("../plugins/loose.js"),
    require("../plugins/fragment.js"),
    require("../plugins/raw.js")
])

test("dom properly converts jsonml to element", function (assert) {
    var elem = dom(["html", [
        ["head", { className: "head" }, [
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
    assert.equal(elem.childNodes[0].className, "head")
    assert.equal(elem.childNodes[1].tagName, "BODY")
    assert.equal(elem.childNodes[1].className, "main")

    assert.end()
})

test("allow raw data", function (assert) {
    if (!document.defaultView) {
        return assert.end()
    }

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


test("null is a valid element", function (assert) {
    var elem = dom(null)

    assert.equal(elem, null)

    assert.end()
})
