const fs = require('fs');   // Fyle system

// fs.readFile(
//     './06-ejemplo.txt',
//     'utf-8',
//     (error, contenido) => {
//         console.log("Primero ----");
//         if (error) {
//             console.error({mensaje: 'error leyendo contenido', error: error});
//         } else {
//             console.log(contenido);
//         }
//     }
// );

// console.log("Segundo ----");

fs.readFile(
    './06-ejemplo.txt',
    'utf-8',
    (error, contenido) => {
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