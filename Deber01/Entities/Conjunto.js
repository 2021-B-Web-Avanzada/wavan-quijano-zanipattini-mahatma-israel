class Conjunto {
    constructor(id, nombre, direccion, area, fechaApertura, estrellas) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.area = area;
        this.fechaApertura = fechaApertura;
        this.estrellas = estrellas;
    }

    getRegisterString() {
        return `${this.id},${this.nombre},${this.direccion},${this.area},${this.fechaApertura},${this.estrellas}`;
    }

}

Conjunto.prototype.toString = function() {
    return `Conjunto: ${this.nombre}\n` +
           `\tDir: ${this.direccion}\n` +
           `\tArea: ${this.area}\n` +
           `\tFecha de apertura: ${this.fechaApertura}\n` +
           `\tEstrellas: ${this.estrellas}\n`;
}

module.exports = Conjunto;