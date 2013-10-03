var ViewModel = require("./view-model.js")

module.exports = App

function App(initialState, inputs) {
    var router = inputs.router
    var delegator = inputs.delegator

    // Model
    var model = ViewModel(initialState)

    // store route in model
    router.on("route", function (ev) {
        model.route.set(ev.hash)
    })

    delegator.change()

    return model
}
