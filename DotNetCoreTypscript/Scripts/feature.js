"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = exports.greeter = void 0;
var models_1 = require("./models");
function greeter(person) {
    return "Hello, " + person.fullName;
}
exports.greeter = greeter;
function Feature() {
    $("#theButton").on('click', function () {
        var user = new models_1.Student("Sami", "M.", "Jeanny");
        document.getElementById("ts-example").innerHTML = greeter(user);
    });
}
exports.Feature = Feature;
//# sourceMappingURL=feature.js.map