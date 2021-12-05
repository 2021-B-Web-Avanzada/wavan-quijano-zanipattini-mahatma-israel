const fs = require("fs");

function promesaEsPar(numero) {
    const miPrimeraPromesa = new Promise(
        (resolve, reject) => {
            if (numero % 2 == 0) {
                resolve(numero);    // return numero
            } else {
                reject("No es par");    // Throw "No es par"
            }
        }
    );
    return miPrimeraPromesa;
}

function promesaElevarAlCuadrado(numero) {
    const miPrimeraPromesa = new Promise(
        (resolve, reject) => {
            const numeroElevadoAlCuadrado = Math.pow(numero, 2);
            resolve(numeroElevadoAlCuadrado);
        }
    );
    return miPrimeraPromesa;
}

promesaEsPar(6)
    // Try
    .then(
        (datosPromesa) => {
            console.log(datosPromesa);
        }
    )
    // Catch
    .catch(
        (error) => {
            console.log(error);
        }
    )
    // Finally
    .finally()

// Primera Promesa
promesaEsPar(4)
    .then(
        (datosPromesa) => {
            console.log(datosPromesa);
            // Se concatena la siguiente promesa
            return promesaElevarAlCuadrado(datosPromesa);
        }
    )
    // Segunda promesa
    .then(
        (datosElevarAlCuadrado) => {
            console.log(datosElevarAlCuadrado);
        }
    );


function readText(path) {
    const promise = new Promise(
        (resolve, reject) => {
            fs.readFile(
                path, "utf-8",
                (errorLectura, contenido) => {
                    if (errorLectura)
                        reject(errorLectura);
                    else {
                        resolve(contenido);
                    }
                }
            );
        }
    );
    return promise;
}

function addText(path, content, newContent) {
    const promise = new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
                content +"\n"+ newContent,
                "utf-8",
                (errorEscritura) => {
                    if (errorEscritura)
                        reject(errorEscritura);
                    else
                        resolve(content +"\n"+ newContent);
                }
            );
        }
    );
    return promise;
}


function addTextPromises(path, newContent) {
    readText(path)
        .then(
            (datosPromesa) => {
                return addText(path, datosPromesa, newContent);
            }
        )
        // addText
        .then(
            (datosPromesa) => {
                console.log("Contenido:\n" + datosPromesa);
            }
        );
}

addTextPromises("./06-ejemplo.txt", "Nuevo contenido");