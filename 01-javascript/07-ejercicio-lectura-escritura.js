const fs = require('fs');

/*
Hacer una funcion que acepte como parametro una variable con el path del archivo y el contenido a agregar al contenido
del archivo. La funcion debe tomar estos dos parametros y leer el archivo y agregar el texto al final del archivo.
*/

function agregarTexto(path, content) {
    fs.readFile(
        path, "utf-8",
        (errorLectura, contenido) => {
            if (errorLectura)
                console.log(errorLectura);
            else {
                fs.writeFile(
                    path,
                    contenido +"\n"+ content,
                    "utf-8",
                    (errorEscritura) => {
                        if (errorEscritura)
                            console.log(errorEscritura);
                    }
                );
            }
        }
    );
}

agregarTexto("./06-ejemplo.txt", "Nuevo texto");