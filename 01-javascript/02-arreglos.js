let arreglo = [6, 7, 8, 9, 10];
arreglo = 1;
arreglo = true;
arreglo = undefined;
arreglo = null;
arreglo = {};
arreglo = [true, 1, 1.2, "Mahatma", undefined, null, {}, [1, 2]];

arreglo = [6, 7, 8, 9, 10];

// for of
for (let numero of arreglo) {
    console.log("numero", numero);
}

// for in
for (let indice in arreglo) {
    //arreglo[indice];
    console.log("indice", indice);
}

let objeto = {a: "1", b: "2", c: "3"};
for (let llave in objeto) {
    console.log("llave", llave);
}

// Agregar un elemento al final
arreglo.push(11);   // Se pueden agregar varios elementos a la vez

// Eliminar un elemento del final
arreglo.pop();

// Agregar un elemento al principio
arreglo.unshift(5);     // Se pueden agregar varios elementos a la vez

// Agregar en el indice 0
arreglo.splice(0, 0, 4);

// Eliminar elementos
const indice = arreglo.indexOf(9);
arreglo.splice(indice, 2);  // Elimina 2 elementos desde el 9

console.log(arreglo)
