const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    }
];

// Find
// Devuelve el primero que cumpla la condicion dada
const respuestaFind = arreglo
    .find(
        function(valorActual, indiceActual, arregloCompleto) {
            // console.log("Valor actual", valorActual);
            // console.log("Indice actual", indiceActual);
            // console.log("Arreglo completo", arregloCompleto);
            return valorActual.nombre === "Cristian";    // Expresion
        }
    );

console.log("Find:", respuestaFind);

// Find Index
// Devuelve el primero que cumpla la condicion dada
const respuestaFindIndex = arreglo
    .findIndex(
        function(valorActual, indiceActual, arregloCompleto) {
            return valorActual.nombre === "Cristian";
        }
    );
// Si no encuentra, devuelve -1

console.log("Find Index:", respuestaFindIndex)

// ForEach
const respuestaForEach = arreglo
    .forEach(
        function(valorActual, indiceActual, arregloCompleto) {
            console.log("Valor actual", valorActual);
        }
    );

console.log(respuestaForEach); // Undefined

// Map
const respuestaMap = arreglo
    .map(
        (valorActual, indiceActual, arregloCompleto) => {
            const nuevoElemento = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: valorActual.nota + 1
            };
            return nuevoElemento;
        }
    );
console.log(respuestaMap);

// Filer
const respuestaFilter = arreglo
    .filter(
        (valorActual, indiceActual, arregloCompleto) => {
            return valorActual.nota >= 14;
        }
    );

console.log(respuestaFilter);

// Some
const respuestaSome = arreglo
    .some(
        (valorActual, indiceActual, arregloCompleto) => {
            return valorActual.nota < 9;
        }
    );

console.log("Some:", respuestaSome);

// Every
const respuestaEvery = arreglo
    .every(
        (valorActual, indiceActual, arregloCompleto) => {
            return valorActual.nota > 14;
        }
    );

console.log("Every:", respuestaEvery);

const respuestaReduce = arreglo
    .reduce(
        function(valorAcumulado, valorActual, arreglo) {
            return (valorAcumulado + valorActual.nota);
        },
        100 // Acumulador
    );

console.log(respuestaReduce);