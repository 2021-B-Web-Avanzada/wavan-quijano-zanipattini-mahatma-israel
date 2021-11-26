const adrian = {
    nombre: "Adrian"
};
const carolina = {
    nombre: "Carolina",
    apellido: "Eguez"
};

// Creando una nueva referencia
const adrianCarolina = {
    ...carolina,      // Se copian las propiedades
    ...adrian
}

console.log(adrianCarolina);

const arreglo1 = [1, 2, 3, 4, 5];
const arreglo2 = [6, 7, 8, 9, 10];

const superArreglo = [
    ...arreglo2,
    ...arreglo1
];

console.log(superArreglo);

console.log(...superArreglo);