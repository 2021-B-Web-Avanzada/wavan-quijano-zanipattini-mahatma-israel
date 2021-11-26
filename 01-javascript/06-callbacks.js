const fs = require('fs');   // Fyle system
console.log('Primero');

fs.readFile(
    //'./06-ejemplo.txt',
    '01-javascript/06-ejemplo.txt',
    //'01-javascript/05-destructuracion.js',
    'utf-8',
    (error, contenido) => {
        //console.log("SEGUNDO");
        if (error) {
            console.error({mensaje: 'error leyendo contenido', error: error});
        } else {
            console.log(contenido);
        }
    }
);

console.log('TERCERO');