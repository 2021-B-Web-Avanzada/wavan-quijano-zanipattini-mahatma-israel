class Casa {
    constructor(id, idConjunto, nombre, ubicacion, area, fechaApertura, precio) {
        this.id = id;
        this.idConjunto = idConjunto;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.area = area;
        this.fechaApertura = fechaApertura;
        this.precio = precio;
    }

    getRegisterString() {
        return `${this.id},${this.idConjunto},${this.nombre},${this.ubicacion},${this.area},${this.fechaApertura},${this.precio}`;
    }

}

Casa.prototype.toString = function() {
    return `Casa: ${this.nombre}\n` +
        `\tUbicacion: ${this.ubicacion}\n` +
        `\tArea: ${this.area}\n` +
        `\tFecha de apertura: ${this.fechaApertura}\n` +
        `\tPrecio: $${this.precio}\n`;
}

module.exports = Casa;