# jsonml-stringify

[![build status][1]][2] [![dependency status][3]][4] [![coverage report][9]][10] [![stability index][15]][16]

[![npm stats][13]][14]

[![browser support][5]][6]

Convert jsonml arrays to html strings

## Example

```js
var Stringify = require("jsonml-stringify/stringify")
var stringify = Stringify([
    require("jsonml-stringify/plugins/loose")
])
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
var Stringify = require("jsonml-stringify/stringify")
var stringify = Stringify([
    require("jsonml-stringify/plugins/loose"),
    require("jsonml-stringify/plugins/raw")
])
var assert = require("assert")

var html = stringify(["div", { raw: "foo&copy;" }])

assert.equal(html, "<div>\n    foo©\n</div>")
```

## stringify fragments

```js
var Stringify = require("jsonml-stringify/stringify")
var stringify = Stringify([
    require("jsonml-stringify/plugins/loose"),
    require("jsonml-stringify/plugins/fragment")
])
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

```ocaml
(* 
JsonML is both loosely and strictly defined.

A plugin is an object literal with either a single key / value
    pair or a key 'type' and some properties

Loose:
    - null
    - undefined
    - plugin
    - text content
    - [ tagName ]
    - [ tagName , properties ]
    - [ tagName , text content ]
    - [ tagName , children ]
    - [ tagName , plugin ]
    - [ tagName , properties , text content ]
    - [ tagName , properties , children ]
    - [ tagname , properties , plugin ]
    - [ '#text' , text content ]
    - [ '#text' , properties , text content ]

*)

type JsonMLPlugin := Object | Function
type JsonMLProperties := 
    Object<String, String | Boolean | JsonMLPlugin>

type LooseJsonML := 
    null |
    undefined |
    JsonMLPlugin |
    String |
    [ String ] |
    [ String , JsonMLProperties ] |
    [ String , String ] |
    [ String , Array<LooseJsonML> ] |
    [ String , JsonMLPlugin ] |
    [ "#text" , String ] |
    [ String , JsonMLProperties , String ] | 
    [ String , JsonMLProperties , Array<LooseJsonML> ] |
    [ String , JsonMLProperties , JsonMLPlugin ] |
    [ "#text" , JsonMLProperties , String ]
```

### Plugin definition

```ocaml
type Plugin := {
    stringify: (JsonML, JsonMLOptions) => String,
    dom: (JsonML, JsonMLOptions) => DOMElement,
    merge: (JsonML, JsonMLMergeOptions) => void,
    type: String,
    normalize: (JsonML, JsonMLOptions) => JsonML,
    renderProperty: (DOMElement, value: Any, key: String, JsonMLOptions),
    stringifyProperty: (value: Any, key: String, JsonMLOptions) => String,
    mergeProperty: (DOMElement, value: Any, key: String, JsonMLMergeOptions),
    setProperty: (value: Any, key: String),
    getProperty: (value: Any, key: String) => String
}
```

### Strict definition & functions

```ocaml
(*

Strict:
    - null
    - plugin
    - [ tagName , properties , children ]
    - [ '#text' , properties , text content ]
    - [ '#text' , properties , plugin ]

*)
type JsonMLPlugin := Object | Function
type JsonMLProperties := 
    Object<String, String | Boolean | JsonMLPlugin>

type JsonML :=
    null |
    JsonMLPlugin |
    [ String , JsonMLProperties , Array<JsonML> ] |
    [ "#text" , JsonMLProperties , String | JsonMLPlugin ]

type JsonMLOptions := {
    parent: JsonML,
    parents: Array<JsonML>,
    plugins: Array<Plugin>
}

type JsonMLMergeOptions := JsonMLOptions & {
    elements: Array<DOMElement | DOMTextNode>,
    root: DOMElement
}

stringify-recur := (JsonML, JsonMLOptions) => String

dom-recur := (JsonML, JsonMLOptions) => DOMElement

merge-recur := (JsonML, JsonMLMergeOptions)
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
  [9]: https://coveralls.io/repos/Raynos/jsonml-stringify/badge.png
  [10]: https://coveralls.io/r/Raynos/jsonml-stringify
  [13]: https://nodei.co/npm/jsonml-stringify.png?downloads=true&stars=true
  [14]: https://nodei.co/npm/jsonml-stringify
  [15]: http://hughsk.github.io/stability-badges/dist/unstable.svg
  [16]: http://github.com/hughsk/stability-badges

  [7]: https://badge.fury.io/js/jsonml-stringify.png
  [8]: https://badge.fury.io/js/jsonml-stringify
  [11]: https://gemnasium.com/Raynos/jsonml-stringify.png
  [12]: https://gemnasium.com/Raynos/jsonml-stringify
