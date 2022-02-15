const mongoose = require("mongoose");

// Schema
const CasaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true
    },
    fechaApertura: {
        type: Date,
        default: Date.now,
    },
    precio: {
        type: Number,
        required: true,
    },
    // Conjunto
    conjuntoID: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Casa', CasaSchema)