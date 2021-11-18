// Mutables e Inmutables

// Mutables
var numeroUno = 1;
let numeroDos = 2;
numeroUno = 5;
numeroDos = 8;

// Inmutables
const archivo = "PDF"
//archivo = "XML";// Da error

// Preferir CONST > LET > (Nunca) VAR

/* Tipos de variables */
const numero = 1;           // Number
const sueldo = 1.2;         // Number
const texto = "Mahatma";    // String
const booleano = false;     // Boolean
const perros = null;        // Object
const zapatos = undefined;  // Undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof booleano);
console.log(typeof perros);
console.log(typeof zapatos);
console.log(typeof Number("asd"));   // Number
console.log(Number("asd"));          // Nan (Not a Number)

// Truty & Falsy
if ("")
    console.log("String vacio es verdadero");
else
    console.log("String vacio es falsy");

if ("texto")
    console.log("String con datos es truty");
else
    console.log("String con datos es falso");

if (-1)
    console.log("Negativo es Truty");
else
    console.log("Negativo es Falsy");

if (0)
    console.log("Cero es Truty");
else
    console.log("Cero es Falsy");

if (1)
    console.log("Positivo es Truty");
else
    console.log("Positivo es Falsy");

if (null)
    console.log("Null es Truty");
else
    console.log("Null es Falsy");

if (undefined)
    console.log("Undefined es Truty");
else
    console.log("Undefined es Falsy");

// Objeto JSON
const mahatma = {
    nombre: "Mahatma",
    apellido: "Quijano",
    edad: 22,
    perros: null,
    zapatos: undefined,
    casado: false,
    ropa: {
        color: "Negro",
        talla: "69"
    },
    articulos: ["celular", "audifonos", "laptop"],
};

// Acceder a las propiedades del objeto
console.log(mahatma.nombre);
mahatma["nombre"] = "Israel";

mahatma["gastos"] = 0.8;
console.log(mahatma.gastos)

console.log(Object.keys(mahatma))
console.log(Object.values(mahatma))

// Eliminar una propiedad
delete mahatma.ropa;
console.log(Object.keys(mahatma));

/* Variables por valor o referencia */
// Variables por valor en JS son las primitivas (Number, String, Boolean)
let a = 5;
let b = a;  // Aqui se guarda una primitiva en otra variable
            // Por lo tanto, se guarda solo el valor
console.log("a =", a);
console.log("b =", b);
a = a + 1;
console.log("a =", a);
console.log("b =", b);

// Variables por referencia: object ({}, [])
let rafael = {
    nombre: "Rafael"
};
// let lenin = rafael;
// console.log(rafael);
// console.log(lenin);
// lenin.nombre = "Lenin";
// console.log(rafael);
// console.log(lenin);

// delete rafael.nombre;
// console.log(rafael)
// console.log(lenin);

// Clonar objetos
let lenin = Object.assign({}, rafael);
console.log(rafael);
console.log(lenin);
delete rafael.nombre;
console.log(rafael);
console.log(lenin);

let array1 = [1, 2, 3, 4, 5];
let array2 = Object.assign([], array1);
console.log(array1);
console.log(array2);
array1[0] = 100;
array2[0] = 200;
console.log(array1);
console.log(array2);