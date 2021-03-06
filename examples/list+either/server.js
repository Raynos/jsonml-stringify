var http = require("http")
var ServeBrowserify = require("serve-browserify")
var JSONGlobals = require("json-globals")

var Stringify = require("../../stringify.js")
var template = require("./template")

var stringify = Stringify([
    require("../../plugins/loose.js"),
    require("../../plugins/fragment.js"),
    require("../lib/plugin-either.js"),
    require("../lib/plugin-list.js")
])

http.createServer(function (req, res) {
    if (req.url === "/browser") {
        ServeBrowserify({ root: __dirname })(req, res)
    } else {
        var model = {
            x: "x",
            y: "y",
            zs: ["1", "2", "3"]
        }

        res.setHeader("Content-Type", "text/html")
        res.end("<!DOCTYPE html>" + stringify(["html", [
            ["head", [
                ["title", "Observable demo"]
            ]],
            ["body", [
                ["div", "Server"],
                ["div", { id: "main" }, [
                    template(model)
                ]],
                ["div", "Client"],
                ["script", JSONGlobals({ model: model })],
                ["script", { src: "/browser" }]
            ]]
        ]]))
    }
}).listen(8000, function () {
    console.log("listening on port 8000")
})
