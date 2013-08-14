# jsonml-stringify

[![build status][1]][2] [![dependency status][3]][4] [![coverage report][9]][10]

[![stability index][15]][16]

[![npm stats][13]][14]

[![browser support][5]][6]

Convert jsonml arrays to html strings

## Example

```js
var stringify = require("jsonml-stringify")
var assert = require("assert")

var html = stringify(["html", [
    ["head", [
        ["meta", { charset: "utf-8" }],
        ["title", "Process dashboard"],
        ["link", { rel: "stylesheet", href: "/less/main"}]
    ]],
    ["body", { class: "main" }, [
        ["script", { src: "/browserify/main" }]
    ]]
]])

assert.equal(html,
    "<html>\n" +
    "    <head>\n" +
    "        <meta charset=\"utf-8\"></meta>\n" +
    "        <title>\n" +
    "            Process dashboard\n" +
    "        </title>\n" +
    "        <link rel=\"stylesheet\" href=\"/less/main\"></link>\n" +
    "    </head>\n" +
    "    <body class=\"main\">\n" +
    "        <script src=\"/browserify/main\"></script>\n" +
    "    </body>\n" +
    "</html>")
```

## stringify raw html entities

```js
var stringify = require("jsonml-stringify")
var assert = require("assert")

var html = stringify(["div", { raw: "foo&copy;" }])

assert.equal(html, "<div>\n    foo©\n</div>")
```

## stringify fragments

```js
var stringify = require("jsonml-stringify")
var assert = require("assert")

var html = stringify(["div", [
    { fragment: [
        ["div", "one"],
        ["div", "two"]
    ] },
    ["div", "three"]
]])

assert.equal(html, "<div>\n" +
    "    <div>\n" +
    "        one\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        two\n" +
    "    </div>\n\n" +
    "    <div>\n" +
    "       three\n" +
    "</div>\n" +
    "</div>")
```

## Loose JSONML definition

JsonML for our use case is very loosely defined. This
    enables expressiveness in using it for templates.

Valid things are:
 - a text content string
 - a raw object containing a raw HTML string
 - a fragment object containing a list of children
 - a triplet containing just the selector
 - a triplet containing a selector and a raw object
 - a triplet containing a selector and a fragment object
 - a triplet containing a selector and hash of attributes
 - a triplet containing a selector and a text content string
 - a triplet containing a selector and an array of children
 - a triplet containing a selector, attributes hash
    and an array of children
 - a triplet containing a selector, attributes hash
    and a text content string
 - a triplet containing a selector, attributes hash
    and a fragment object
 - a triplet containing a selector, attributes hash
    and a raw object

```ocaml
type JsonMLSelector := String
type JsonMLTextContent := String
type JsonMLRawContent := {
    raw: String
}
type JsonMLFragment := {
    fragment: Array<JsonML>
}
type JsonMLAttributeKey := String
type JsonMLAttributeValue := String | Number | Boolean
type JsonMLAttrs := Object<JsonMLAttributeKey, JsonMLAttributeValue>

type MaybeJsonML :=
    JsonMLTextContent |
    JsonMLRawContent |
    { fragment: Array<MaybeJsonML> } |
    [JsonMLSelector] |
    [JsonMLSelector, JsonMLRawContent] |
    [JsonMLSelector, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, Object] |
    [JsonMLSelector, JsonMLTextContent] |
    [JsonMLSelector, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, JsonMLTextContent] |
    [JsonMLSelector, JsonMLAttrs, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, JsonMLAttrs, JsonMLRawContent]
```

### Strict definition & functions

```ocaml
type JsonML :=
    JsonMLTextContent |
    JsonMLFragment |
    JsonMLRawContent |
    [
        JsonMLSelector,
        JsonMLAttrs,
        Array<JsonML>
    ]

jsonml-stringify := (jsonml: JsonML, opts: Object?) => String

jsonml-stringify/normalize := (MaybeJsonML) => JsonML

jsonml-stringify/dom := (jsonml: JsonML) => DOMElement

jsonml-stringify/attrs := (attributes: Object) => String

jsonml-stringify/unpack-selector :=
    (selector: String, attributes!: Object) => tagName: String
```

## Installation

`npm install jsonml-stringify`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/jsonml-stringify.png
  [2]: https://travis-ci.org/Raynos/jsonml-stringify
  [3]: https://david-dm.org/Raynos/jsonml-stringify.png
  [4]: https://david-dm.org/Raynos/jsonml-stringify
  [5]: https://ci.testling.com/Raynos/jsonml-stringify.png
  [6]: https://ci.testling.com/Raynos/jsonml-stringify

  [7]: https://badge.fury.io/js/jsonml-stringify.png
  [8]: https://badge.fury.io/js/jsonml-stringify
  [9]: https://coveralls.io/repos/Raynos/jsonml-stringify/badge.png
  [10]: https://coveralls.io/r/Raynos/jsonml-stringify
  [11]: https://gemnasium.com/Raynos/jsonml-stringify.png
  [12]: https://gemnasium.com/Raynos/jsonml-stringify
  [13]: https://nodei.co/npm/jsonml-stringify.png?downloads=true&stars=true
  [14]: https://nodei.co/npm/jsonml-stringify
  [15]: http://hughsk.github.io/stability-badges/dist/unstable.svg
  [16]: http://github.com/hughsk/stability-badges

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->
