"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeter = exports.TSButton = void 0;
var models_1 = require("./models");
__exportStar(require("./models"), exports);
var user = new models_1.Student("Sami", "M.", "Jeanny");
function TSButton() {
    var name = "Jeanny Sami Updated tf";
    document.getElementById("ts-example").innerHTML = greeter(user);
}
exports.TSButton = TSButton;
function greeter(person) {
    return "Hello, " + person.fullName;
}
exports.greeter = greeter;
//# sourceMappingURL=app.js.map