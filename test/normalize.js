var test = require("tape")

var stringify = require("../index")

var children = [
    "foo",
    { raw: "foo&copy;" },
    ["span"],
    ["span", { raw: "foo&copy;"} ],
    ["span", "foo"],
    ["span", { class: "foo" }]
]

var childrenString =
    "    foo\n" +
    "    foo©\n" +
    "    <span></span>\n" +
    "    <span>\n" +
    "        foo©\n" +
    "    </span>\n" +
    "    <span>\n" +
    "        foo\n" +
    "    </span>\n" +
    "    <span class=\"foo\"></span>\n"

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

test("[String] is valid", function (assert) {
    var html = stringify(["span"])

    assert.equal(html, "<span></span>")

    assert.end()
})

test("[String, { raw: String }] is valid", function (assert) {
    var html = stringify(["span", { raw: "foo&copy;" }])

    assert.equal(html, "<span>\n    foo©\n</span>")

    assert.end()
})

test("[String, Object<String, String>] is valid", function (assert) {
    var html = stringify(["span", { class: "foobar" }])

    assert.equal(html, "<span class=\"foobar\"></span>")

    assert.end()
})

test("[String, String] is valid", function (assert) {
    var html = stringify(["span", "foo"])

    assert.equal(html, "<span>\n    foo\n</span>")

    assert.end()
})

test("[String, Array<MaybeJsonML>] is valid", function (assert) {
    var html = stringify(["div", children])

    assert.equal(html, "<div>\n" + childrenString + "</div>")

    assert.end()
})

test("[String, Object, Array<MaybeJsonML>] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, children])

    assert.equal(html, "<div class=\"bar\">\n" + childrenString + "</div>")

    assert.end()
})

test("[String, Object, String] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, "foo"])

    assert.equal(html, "<div class=\"bar\">\n    foo\n</div>")

    assert.end()
})

test("[String, Object, { raw: String }] is valid", function (assert) {
    var html = stringify(["div", { class: "bar" }, { raw: "foo©" }])

    assert.equal(html, "<div class=\"bar\">\n    foo©\n</div>")

    assert.end()
})
