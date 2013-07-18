var test = require("tape")

var stringify = require("../index")

var children = [
    "foo",
    { raw: "foo&copy;" },
    null,
    undefined,
    ["span"],
    ["span", { raw: "foo&copy;"} ],
    ["span", "foo"],
    ["span", { class: "foo" }]
]

var childrenString =
    "foo" +
    "foo©" +
    "<span></span>" +
    "<span>foo©</span>" +
    "<span>foo</span>" +
    "<span class=\"foo\"></span>"

var whiteChildrenString =
    "foo" +
    "foo©" +
    "    <span></span>" +
    "    <span>foo©</span>" +
    "    <span>foo</span>" +
    "    <span class=\"foo\"></span>"

test("String is valid", function (assert) {
    var html = stringify("foobar")

    assert.equal(html, "foobar")

    assert.end()
})

test("{ raw: String } is valid", function (assert) {
    var html = stringify({ raw: "foo&copy;"})

    assert.equal(html, "foo©")

    assert.end()
})

test("{ fragment: Array<MaybeJsonML> } is valid", function (assert) {
    var html = stringify({ fragment: children })

    assert.equal(html, childrenString)

    assert.end()
})

test("[String] is valid", function (assert) {
    var html = stringify(["span"])

    assert.equal(html, "<span></span>")

    assert.end()
})

test("[String, { raw: String }] is valid", function (assert) {
    var html = stringify(["span", { raw: "foo&copy;" }])

    assert.equal(html, "<span>foo©</span>")

    assert.end()
})

test("[String, { fragment: Array<MaybeJsonML> }] is valid", function (assert) {
    var html = stringify(["span", { fragment: children }])

    assert.equal(html, "<span>\n" + whiteChildrenString + "\n</span>")

    assert.end()
})

test("[String, Object<String, String>] is valid", function (assert) {
    var html = stringify(["span", { class: "foobar" }])

    assert.equal(html, "<span class=\"foobar\"></span>")

    assert.end()
})

test("[String, String] is valid", function (assert) {
    var html = stringify(["span", "foo"])

    assert.equal(html, "<span>foo</span>")

    assert.end()
})

test("[String, Array<MaybeJsonML>] is valid", function (assert) {
    var html = stringify(["div", children])

    assert.equal(html, "<div>" + childrenString + "</div>")

    assert.end()
})

test("[String, Object, Array<MaybeJsonML>] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, children])

    assert.equal(html, "<div class=\"bar\">" + childrenString + "</div>")

    assert.end()
})

test("[String, Object, String] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, "foo"])

    assert.equal(html, "<div class=\"bar\">foo</div>")

    assert.end()
})
test("[String, Object, { fragment: Array<MaybeJsonML> }]", function (assert) {
    var html = stringify(["div", { class: "bar" }, { fragment: children }])

    assert.equal(html, "<div class=\"bar\">\n" +
        whiteChildrenString + "\n</div>")

    assert.end()
})

test("[String, Object, { raw: String }] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, { raw: "foo©" }])

    assert.equal(html, "<div class=\"bar\">foo©</div>")

    assert.end()
})

test("[[String, Object]] throws an exception", function (assert) {
    assert.throws(function () {
        stringify([["div", {}]])
    }, /Selector is not a string/)

    assert.end()
})

test("[String, String, Array] throws an exception", function (assert) {
    assert.throws(function () {
        stringify(["div", "some text", ["some more text"]])
    }, /Properties is not an object/)

    assert.end()
})
