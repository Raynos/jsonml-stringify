var test = require("tape")

var Stringify = require("../stringify")
var stringify = Stringify([
    require("../plugins/loose.js"),
    require("../plugins/fragment.js"),
    require("../plugins/raw.js")
])

test("jsonml-stringify is a function", function (assert) {
    assert.equal(typeof stringify, "function")
    assert.end()
})

test("produces strings", function (assert) {
    var html = stringify(["html"])

    assert.equal(html, "<html></html>")
    assert.end()
})

test("encodes attributes", function (assert) {
    var html = stringify(["meta", { charset: "utf-8" }])

    assert.equal(html, "<meta charset=\"utf-8\"></meta>")
    assert.end()
})

test("encodes text content", function (assert) {
    var html = stringify(["title", "Process dashboard"])

    assert.equal(html, "<title>Process dashboard</title>")
    assert.end()
})

test("encodes text content as children", function (assert) {
    var html = stringify(["title", ["Process dashboard"]])

    assert.equal(html, "<title>Process dashboard</title>")
    assert.end()
})

test("encodes string as text content", function (assert) {
    var html = stringify("some text")

    assert.equal(html, "some text")
    assert.end()
})

test("encodes scripts properly as text content", function (assert) {
    var html = stringify("<script>alert('no u')</script>")

    assert.equal(html, "&#x3C;script&#x3E;alert(&#x27;no u&#x27;)&#x3C;/script&#x3E;")
    assert.end()
})

test("unpacks selector into class & id", function (assert) {
    var html = stringify(["span.foo#baz.bar"])

    assert.equal(html, "<span class=\"foo bar\" id=\"baz\"></span>")
    assert.end()
})

test("selector without tagname defaults to div", function (assert) {
    var html = stringify([".foo"])

    assert.equal(html, "<div class=\"foo\"></div>")
    assert.end()
})

test("encodes children", function (assert) {
    var html = stringify(["head", [
        ["meta", { charset: "utf-8" }],
        ["title", "Process dashboard"]
    ]])

    assert.equal(html, "<head>" +
        "<meta charset=\"utf-8\"></meta>" +
        "<title>Process dashboard</title>" +
        "</head>")
    assert.end()
})

test("can set value-less attributes", function (assert) {
    var html = stringify(["input", { autofocus: true }])

    assert.equal(html, "<input autofocus></input>")
    assert.end()
})

test("can handle boolean attributes", function (assert) {
    var html = stringify(["option", { selected: false }])

    assert.equal(html, "<option></option>")
    assert.end()
})

test("integration test", function (assert) {
    var html = stringify(["html", [
        ["head", [
            ["meta", { charset: "utf-8" }],
            ["title", "Process dashboard"],
            ["link", { rel: "stylesheet", href: "/less/main"}]
        ]],
        ["body", { "class": "main" }, [
            ["script", { src: "/browserify/main" }]
        ]]
    ]])

    assert.equal(html,
        "<html>" +
        "<head>" +
        "<meta charset=\"utf-8\"></meta>" +
        "<title>Process dashboard</title>" +
        "<link rel=\"stylesheet\" href=\"/less/main\"></link>" +
        "</head>" +
        "<body class=\"main\">" +
        "<script src=\"/browserify/main\"></script>" +
        "</body>" +
        "</html>")
    assert.end()
})

test("script tag with javascript is not html encoded", function (assert) {
    var html = stringify(["script", {
        type: "text/javascript"
    }, "var foo = \"bar\""])

    assert.equal(html,
        "<script type=\"text/javascript\">var foo = \"bar\"</script>")

    assert.end()
})

test("attributes are properly escaped", function (assert) {
    var html = stringify(["div", {
        "data-marker": "\"foo\""
    }])

    assert.equal(html, "<div data-marker=\"&quot;foo&quot;\"></div>")

    assert.end()
})

test("script tags in script tags get encoded properly", function (assert) {
    var html = stringify(["script", "var foo = \"bar </script>\""])

    assert.equal(html,
        "<script>var foo = \"bar <\\\/script>\"</script>")

    assert.end()
})

test("allow raw data", function (assert) {
    var html = stringify(["span", [{
        raw: "&nbsp;&nbsp;&nbsp;|"
    }]])

    assert.equal(html, "<span>\u00A0\u00A0\u00A0|</span>")

    assert.end()
})

test("style properties", function (assert) {
    var html = stringify(["div", {
        style: { borderColor: "black" }
    }])

    assert.equal(html, "<div style=\"border-color: black;\"></div>")

    assert.end()
})

test("null is a valid element", function (assert) {
    var html = stringify(null)

    assert.equal(html, "")

    assert.end()
})
