var http = require("http")
var ServeBrowserify = require("serve-browserify")
var JSONGlobals = require("json-globals")

var stringify = require("./stringify-observ.js")
var template = require("./template")

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
				["div", { id: "main" }, [
					template(model)
				]],
				["script", JSONGlobals({ model: model })],
				["script", { src: "/browser" }]
			]]
		]]))
	}
}).listen(8000, function () {
	console.log("listening on port 8000")
})
