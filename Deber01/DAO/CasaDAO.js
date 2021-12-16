const fs = require("fs");
const readline = require("readline");
const Casa = require("../Entities/Casa");
const path = "../Files/Casas.txt";

class CasaDAO {
    // CREATE
    async crearCasa(idConjunto, nuevaCasa) {
        try {
            // Get previous content
            const casas = await this.leerCasas(idConjunto, true);
            casas.push(nuevaCasa); // Append new content
            // Get formatted content
            const content = casas.reduce((total, casa) => {
                return total + casa.getRegisterString() + "\n";
            }, "");
            // Overwrite
            fs.writeFile(
                path, content, "utf-8",
                (error) => {
                    if (error)
                        console.log(error);
                    else{
                        console.log("Registro exitoso");
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    // READ
    async leerCasas(idConjunto, all = false) {
        const fileStream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        const casas = [];
        for await (const line of lines) {
            const data = line.split(",");
            if (data[1] === idConjunto.toString() || all) {
                const casa = new Casa(
                    data[0], data[1], data[2], data[3], data[4], data[5], data[6]
                );
                casas.push(casa);
            }
        }
        return casas;
    }

    async leerCasaPorID(idConjunto, idCasa) {
        const fileStream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of lines) {
            const data = line.split(",");
            if (data[0] === idCasa.toString() && data[1] === idConjunto.toString()) {
                return new Casa(
                    data[0], data[1], data[2], data[3], data[4], data[5], data[6]
                );
            }
        }
        return null;
    }

    // UPDATE
    async actualizarCasa(idConjunto, casaActualizada) {
        try {
            // Get previous content
            const casas = await this.leerCasas(idConjunto, true);
            // Replace old object
            const index = casas.findIndex((casa) => {
                return casa.id === casaActualizada.id;
            });
            casas[index] = casaActualizada;
            // Get formatted content
            const content = casas.reduce((total, casa) => {
                return total + casa.getRegisterString() + "\n";
            }, "");
            // Overwrite
            fs.writeFile(
                path, content, "utf-8",
                (error) => {
                    if (error)
                        console.log(error);
                    else{
                        console.log("Actualizacion exitosa");
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    // DELETE
    async eliminarCasaPorID(idConjunto, idCasa) {
        try {
            // Get previous content
            const casas = await this.leerCasas(idConjunto, true);
            // Delete object
            const index = casas.findIndex((casa) => {
                return casa.id === idCasa.toString();
            });
            casas.splice(index, 1);
            // Get formatted content
            const content = casas.reduce((total, casa) => {
                return total + casa.getRegisterString() + "\n";
            }, "");
            // Overwrite
            fs.writeFile(
                path, content, "utf-8",
                (error) => {
                    if (error)
                        console.log(error);
                    else{
                        console.log("Eliminacion exitosa");
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = CasaDAO;