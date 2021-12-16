// DAO
const ConjuntoDAO = require("../DAO/ConjuntoDAO");
const CasaDAO = require("../DAO/CasaDAO");
// Entities
const Conjunto = require("../Entities/Conjunto");
const Casa = require("../Entities/Casa");
// Inquirer
const inquirer = require("inquirer");

const conjuntoDAO = new ConjuntoDAO();
const casaDAO = new CasaDAO();

console.log("---- Bienvenido ! -----------------")
async function executeMainMenu() {
    try {
        const option = await inquirer
            .prompt([{
                type: "list",
                name: "opcionConjunto",
                message: "¿Qué operación desea hacer? -----------------------",
                choices: [
                    { name: "Visualizar todos los conjuntos", value: 1 },
                    { name: "Visualizar las casas de un conjunto", value: 2 },
                    { name: "Registrar un nuevo conjunto", value: 3 },
                    { name: "Actualizar un conjunto", value: 4 },
                    { name: "Eliminar un conjunto", value: 5 },
                    { name: "Salir del sistema", value: 0 },
                ]
            }]);
        switch (option.opcionConjunto) {
            // Salir
            case 0:
                console.log("Hasta luego !");
                break;
            // Visualizar todos los conjuntos
            case 1:
                conjuntoDAO.leerConjuntos()
                    .then((conjuntos) => {
                        console.log(conjuntos.toString());
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                break;
            // Visualizar las casas de un conjunto
            case 2:
                const idConjunto = await inquirer
                    .prompt([{
                        type: "input", name: "id",
                        message: "Ingrese el ID del conjunto:"
                    }]);
                console.log("El conjunto cuenta con las siguientes casas:");
                casaDAO.leerCasas(idConjunto.id)
                    .then((casas) => {
                        console.log(casas.toString());
                        executeMenuCasa(idConjunto.id);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                break;
            // Registrar nuevo conjunto
            case 3:
                const data = await inquireConjunto();
                conjuntoDAO.crearConjunto(new Conjunto(
                    data.id, data.nombre, data.direccion, data.area, data.fechaApertura, data.estrellas
                ))
                    .catch((e) => console.log(e));
                break;
            // Actualizar un conjunto
            case 4:
                const idActualizarConjunto = await inquirer
                    .prompt([{
                        type: "input", name: "id",
                        message: "Ingrese el ID del conjunto que desea actualizar:"
                    }]);
                if (await conjuntoDAO.leerConjuntoPorID(idActualizarConjunto.id) != null) {
                    const data = await inquireConjunto();
                    conjuntoDAO.actualizarConjunto(new Conjunto(
                        data.id, data.nombre, data.direccion, data.area, data.fechaApertura, data.estrellas
                    ))
                        .catch((e) => console.log(e));
                } else {
                    console.log("Ese conjunto no existe.");
                }
                break;
            // Eliminar un conjunto
            case 5:
                const idEliminarConjunto = await inquirer
                    .prompt([{
                        type: "input", name: "id",
                        message: "Ingrese el ID del conjunto que desea eliminar:"
                    }]);
                if (await conjuntoDAO.leerConjuntoPorID(idEliminarConjunto.id) != null) {
                    conjuntoDAO.eliminarConjuntoPorID(idEliminarConjunto.id)
                        .catch((e) => console.log(e));
                } else {
                    console.log("Ese conjunto no existe.");
                }
                break;
        }
    } catch (e) {
        console.error(e);
    }
}

async function executeMenuCasa(idConjunto) {
    try {
        const option = await inquirer
            .prompt([{
                type: "list",
                name: "opcionCasa",
                message: "¿Qué operación desea hacer? -----------------------",
                choices: [
                    { name: `Visualizar todas las casas del conjunto ${idConjunto}`, value: 1 },
                    { name: "Registrar una nueva casa", value: 2 },
                    { name: "Actualizar una casa", value: 3 },
                    { name: "Eliminar una casa", value: 4 },
                    { name: "Salir", value: 0 },
                ]
            }]);
        switch (option.opcionCasa) {
            // Salir
            case 0:
                console.log("Hasta luego !");
                break;
            // Visualizar las casas del conjunto
            case 1:
                console.log("El conjunto cuenta con las siguientes casas:");
                casaDAO.leerCasas(idConjunto)
                    .then((casas) => {
                        console.log(casas.toString());
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                break;
            // Registrar nueva casa
            case 2:
                const data = await inquireCasa();
                casaDAO.crearCasa(idConjunto, new Casa(
                    data.id, idConjunto, data.nombre, data.ubicacion, data.area, data.fechaApertura, data.precio
                ))
                    .catch((e) => console.log(e));
                break;
            // Actualizar una casa
            case 3:
                const idActualizarCasa = await inquirer
                    .prompt([{
                        type: "input", name: "id",
                        message: "Ingrese el ID de la casa que desea actualizar:"
                    }]);
                if (await casaDAO.leerCasaPorID(idConjunto, idActualizarCasa.id) != null) {
                    const data = await inquireCasa();
                    casaDAO.actualizarCasa(idConjunto, new Casa(
                        data.id, idConjunto, data.nombre, data.ubicacion, data.area, data.fechaApertura, data.precio
                    ))
                        .catch((e) => console.log(e));
                } else {
                    console.log("Esa casa no existe.");
                }
                break;
            // Eliminar una casa
            case 4:
                const idEliminarCasa = await inquirer
                    .prompt([{
                        type: "input", name: "id",
                        message: "Ingrese el ID de la casa que desea eliminar:"
                    }]);
                if (await casaDAO.leerCasaPorID(idConjunto, idEliminarCasa.id) != null) {
                    casaDAO.eliminarCasaPorID(idConjunto, idEliminarCasa.id)
                        .catch((e) => console.log(e));
                } else {
                    console.log("Esa casa no existe.");
                }
                break;
        }
    } catch (e) {
        console.error(e);
    }
}

function inquireConjunto() {
    return new Promise(
        (resolve, reject) => {
            inquirer
                .prompt([
                    { type: "input", name: "id", message: "ID:" },
                    { type: "input", name: "nombre", message: "Nombre:" },
                    { type: "input", name: "direccion", message: "Dirección:" },
                    { type: "input", name: "area", message: "Área (m2):" },
                    { type: "input", name: "fechaApertura", message: "Fecha de Apertura:" },
                    { type: "input", name: "estrellas", message: "Estrellas:" },
                ])
                .then(data => {
                    resolve(data);
                })
                .catch(e => reject(e));
        }
    );
}

function inquireCasa() {
    return new Promise(
        (resolve, reject) => {
            inquirer
                .prompt([
                    { type: "input", name: "id", message: "ID:" },
                    { type: "input", name: "nombre", message: "Nombre:" },
                    { type: "input", name: "ubicacion", message: "Ubicación:" },
                    { type: "input", name: "area", message: "Área (m2):" },
                    { type: "input", name: "fechaApertura", message: "Fecha de Apertura:" },
                    { type: "input", name: "precio", message: "Precio:" },
                ])
                .then(data => {
                    resolve(data);
                })
                .catch(e => reject(e));
        }
    );
}

executeMainMenu();