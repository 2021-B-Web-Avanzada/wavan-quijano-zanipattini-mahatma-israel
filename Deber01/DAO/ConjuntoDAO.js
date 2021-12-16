const fs = require("fs");
const readline = require("readline");
const Conjunto = require("../Entities/Conjunto");
const path = "../Files/Conjuntos.txt";

class ConjuntoDAO {
    // CREATE
    async crearConjunto(nuevoConjunto) {
        try {
            // Get previous content
            const conjuntos = await this.leerConjuntos();
            conjuntos.push(nuevoConjunto); // Append new content
            // Get formatted content
            const content = conjuntos.reduce((total, conjunto) => {
                return total + conjunto.getRegisterString() + "\n";
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
    async leerConjuntos() {
        const fileStream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        const conjuntos = [];
        for await (const line of lines) {
            const data = line.split(",");
            const conjunto = new Conjunto(
                data[0], data[1], data[2], data[3], data[4], data[5]
            );
            conjuntos.push(conjunto);
        }
        return conjuntos;
    }

    async leerConjuntoPorID(id) {
        const fileStream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of lines) {
            const data = line.split(",");
            if (data[0] === id.toString()) {
                return new Conjunto(
                    data[0], data[1], data[2], data[3], data[4], data[5]
                );
            }
        }
        return null;
    }

    // UPDATE
    async actualizarConjunto(conjuntoActualizado) {
        try {
            // Get previous content
            const conjuntos = await this.leerConjuntos();
            // Replace old object
            const index = conjuntos.findIndex((conjunto) => {
                return conjunto.id === conjuntoActualizado.id;
            });
            conjuntos[index] = conjuntoActualizado;
            // Get formatted content
            const content = conjuntos.reduce((total, conjunto) => {
                return total + conjunto.getRegisterString() + "\n";
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
    async eliminarConjuntoPorID(id) {
        try {
            // Get previous content
            const conjuntos = await this.leerConjuntos();
            // Delete object
            const index = conjuntos.findIndex((conjunto) => {
                return conjunto.id === id.toString();
            });
            conjuntos.splice(index, 1);
            // Get formatted content
            const content = conjuntos.reduce((total, conjunto) => {
                return total + conjunto.getRegisterString() + "\n";
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

module.exports = ConjuntoDAO;