# jsonml-stringify

[![build status][1]][2] [![dependency status][3]][4]

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
