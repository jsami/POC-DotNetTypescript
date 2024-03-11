"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
function TSButton() {
    var name = "Fred";
    document.getElementById("ts-example").innerHTML = greeter(user);
}
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.firstName;
}
var user = new models_1.Student("Fred", "M.", "Smith");
//# sourceMappingURL=app.js.map