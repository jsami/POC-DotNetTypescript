import { Student } from "./models";


export function greeter(person: Student) {
    return "Hello, " + person.fullName;
}

export function Feature() {
    $("#theButton").on('click', function () {
        let user = new Student("Sami", "M.", "Jeanny");
        document.getElementById("ts-example").innerHTML = greeter(user);
    })
}
