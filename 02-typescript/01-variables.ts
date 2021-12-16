let nombre: string = "Mahatma"; // Primitivo
let nombre2: String = "Asd";    // Clase String

let edad: number = 32;
let casado: boolean = false;
let fecha: Date = new Date();
let sueldo: number;
sueldo = 12.4;

// Duck Typing
let apellido = "Quijano";   // string ->
apellido.toUpperCase(); // Metodo de String

let variable: any = 2;
variable = "A";
variable = true;
variable = () => {"Asd"};

let edadMultiple: number | string | Date = 2;
edadMultiple = "ASD";
edadMultiple = new Date();
// edadMultiple = true;    // ERROR