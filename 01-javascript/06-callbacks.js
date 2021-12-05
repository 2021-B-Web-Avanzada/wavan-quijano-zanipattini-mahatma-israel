const fs = require('fs');   // Fyle system

// fs.readFile(
//     //'./06-ejemplo.txt',
//     './06-ejemplo.txt',
//     //'01-javascript/05-destructuracion.js',
//     'utf-8',
//     (error, contenido) => {
//         //console.log("SEGUNDO");
//         if (error) {
//             console.error({mensaje: 'error leyendo contenido', error: error});
//         } else {
//             console.log(contenido);
//         }
//     }
// );

fs.readFile(
    //'./06-ejemplo.txt',
    './06-ejemplo.txt',
    //'01-javascript/05-destructuracion.js',
    'utf-8',
    (error, contenido) => {
        //console.log("SEGUNDO");
        if (error) {
            console.error({mensaje: 'error leyendo contenido', error: error});
        } else {
            fs.readFile(
                "./01-variables.js",
                "utf-8",
                (errorVariable, contenidoVariable) => {
                    if (errorVariable) {
                        console.error({mensaje: 'error leyendo contenido 2', error: error});
                    } else {
                        console.log(contenido, contenidoVariable);
                    }
                }
            );
        }
    }
);

console.log('TERCERO');