const promesaLeerArchivo = () => {
    return new Promise(
        (res, ej) => {
            res("CONTENDO LEER ARCHIVO");
        }
    );
}

const promesaEscribirArchivo = () => {
    return new Promise(
        (res, rej) => {
            res("CONTENIDO ESCRIBIR ARCHIVO");
        }
    );
}

// Async Await
// 1) Metodos de clases
// 2) Funcion

// const respuesta = await promesaEscribirArchivo;
// Esto no es posible porque no esta dentro de una funcion

// Al momento de usar la palabra ASYNC, esa funcion se convierte en PROMESA

const ejemplo1 = async function() {}
const ejemplo2 = async () => {}

async function ejercicio() {
    console.log("1");
    let nuevoContenido = "";
    try {
        console.log("2");
        const contenidoActual = await promesaLeerArchivo();
        console.log(contenidoActual);
        console.log("3");
        await promesaEscribirArchivo();
        console.log("4");
        nuevoContenido = await promesaLeerArchivo();
        console.log(nuevoContenido);
        console.log("5");
    } catch (error) {
        console.error(error);
    }
    console.log("6");
    console.log("7");
    return nuevoContenido;
}

ejercicio().then(
    (data) => {
        console.log("Esta es la respuesta del ASYNC AWAIT", data);
    }
).catch().finally();