import { Person, Student } from "./models";

export * from './models';

let user = new Student("Sami", "M.", "Jeanny");
export function TSButton() {
    let name: string = "Jeanny Sami Updated"; 
    document.getElementById("ts-example").innerHTML = greeter(user);
}

export function greeter(person: Student) { 
    return "Hello, " + person.fullName;
}